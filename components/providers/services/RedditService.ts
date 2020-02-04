import { AuthSession } from 'expo';
import { AsyncStorage, Platform } from 'react-native';
import credentials from './credentials';
import { Buffer } from 'buffer';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import appInfo from '../../../app.json';

class RedditService {

  CLIENT_ID = credentials.clientId;
  REDIRECT_URL = AuthSession.getRedirectUrl();
  BEARER_TOKEN = new Buffer(`${this.CLIENT_ID}:`).toString('base64');
  STORAGE_REDDIT_KEY = '@Bookmarks:RedditOAuthKey';
  STORAGE_REDDIT_USERNAME = '@Bookmarks:RedditUsername';
  STORAGE_REDDIT_BOOKMARKS = '@Bookmarks:RedditBookmarks';
  USER_AGENT = `${Platform.OS}:${appInfo.expo.android.package}:${appInfo.expo.version} (by /u/${credentials.creatorUsername})`;

  token = null

  /**
   * Open a browser to initiate the OAuth 2 process
   * After a successful login it will save the token in AsyncStorage
   */
  SignIn = async (): Promise<RedditToken> => {
    try {
      const state = new Date().valueOf().toString();
      const authUrl = this._getAuthUrl(state);
      const result = await AuthSession.startAsync({ authUrl });
      
      if (result.type === 'dismiss') return
      if (result.type !== 'success') return
      
      const { params } = result;
      
      if (params.state !== state) return
      if (params.error === 'access_denied') {
        alert('Reddit OAuth access denied.')
        return
      }
      
      const token = await this._createToken(params.code);

      await this._setToken(token);
      await this._fetchUserInfo();
      
      return token
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Revoke the token
   */
  Disconnect = async (): Promise<any> => {
    const token = await this._getToken()

    const url = 'https://www.reddit.com/api/v1/revoke_token'
  
    await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${this.BEARER_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `token_type_hint=access_token` + 
            `&token=${token.access_token}`
    })
    
    this.token = null;
  }

  /**
   * Bootstrap the app in the AuthProvider
   * It will log the user in if a token is present and valid
   * otherwise it will refresh it
   */
  bootstrapAuthData = async () => {
    const token = await this._getToken();
    const now = Date.now();

    // If the user is not present, the user is logged out
    if (!token) {
      return {
        isLoggedIn: false,
        username: null
      }
    }
  
    console.log(`Token age: (${(now - token.token_date) / 1000 / 60} minutes)`)
  
    // Token expired 1 hour
    if (now - token.token_date >= 3600 * 1000) {
      console.log(`Token refreshing 🔄 (${(now - token.token_date) / 1000 / 60 / 60} hours)`);
      await this._refreshToken()
    }
  
    // If token is present and valid, log the user in
    const username = await AsyncStorage.getItem(this.STORAGE_REDDIT_USERNAME);

    return {
      isLoggedIn: true,
      username
    }
  }


  /**
   * Bootstrap the Bookmarks data in the BookmarksProvider
   * Display bookmarks if they are found
   * Otherwise display the "NoBookmark" component
   */
  bootstrapBookmarksData = async () => {
    const localBookmarks = await AsyncStorage.getItem(this.STORAGE_REDDIT_BOOKMARKS);

    if (!localBookmarks) {
      throw 'No bookmarks';
    }
    
    return JSON.parse(localBookmarks);
  }

  /**
   * It will fetch saved posts from Reddit
   * and store them
   */
  fetchSavedPosts = async () => {
    const token = await this._getToken();
    const username = await AsyncStorage.getItem(this.STORAGE_REDDIT_USERNAME);

    const url = `https://oauth.reddit.com/user/${username}/saved?raw_json=1`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${token.access_token}`,
        'User-Agent': this.USER_AGENT
      }
    })

    const result: RedditResponse = await response.json();

    if (result.error) {
      console.error(result.message);
      return
    }

    const savedPosts: BookmarkInterface[] = [];

    for (const post of result.data.children) {
      const data = post.data;

      let newPost: BookmarkInterface;

      const date = formatDistanceToNow(data.created_utc * 1000);
      const thumbnail = this.getPostThumbnail(post);

      // kind = Link
      if (post.kind === 't3') {
        newPost= {
          kind: 'Link',
          id: `${data.subreddit}:${data.name}`,
          title: data.title,
          date,
          description: data.selftext,
          subreddit: data.subreddit_name_prefixed,
          permalink: data.link_permalink,
          thumbnail,
          url: data.url,
        }
      }

      // kind = Comment
      if (post.kind === 't1') {
        newPost = {
          kind: 'Comment',
          id: `${data.subreddit}:${data.name}`,
          title: data.link_title,
          date,
          description: data.selftext,
          subreddit: data.subreddit_name_prefixed,
          permalink: data.link_permalink,
          thumbnail,
          url: data.link_url,
        }
      }

      savedPosts.push(newPost);
    }

    await AsyncStorage.setItem(
      this.STORAGE_REDDIT_BOOKMARKS,
      JSON.stringify(savedPosts)
    );

    return savedPosts;
  }

  getPostThumbnail = (post: RedditPost): string | void => {
    const data = post.data;
    const preview = post.data.preview;

    let thumbnail: string;

    if (post.kind === 't3') {
      if (
        preview &&
        preview.images.length > 0 &&
        preview.images[0].resolutions.length > 0
      ) {
        // The resolution index is the middle level of compression
        const resolutionIndex = Math.round(preview.images[0].resolutions.length / 2);
        const previewUrl = preview.images[0].resolutions[resolutionIndex].url;
        thumbnail = previewUrl;
      } else {
        thumbnail = preview?.images[0].source.url || data.link_url;
      }
    }

    if (post.kind === 't1') {
      if (data.link_url?.endsWith('.jpg') || data.link_url?.endsWith('.png')) {
        thumbnail = data.link_url;
      }
    }

    return thumbnail;
  }


  /**
   * Remove all the keys related to RedditService
   * from AsyncStorage
   */
  clearStorage = async () => {
    await AsyncStorage.multiRemove([
      this.STORAGE_REDDIT_KEY,
      this.STORAGE_REDDIT_USERNAME,
      this.STORAGE_REDDIT_BOOKMARKS
    ])
  }
  

  /**
   * Construct the OAuth URL
   * Used variables :
   * CLIENT_ID - The Reddit client id (not secret)
   * REDIRECT_URL - Should match the Redirect URI field of the Reddit app
   * state - The date string, to get a somewhat unique value
   */
  _getAuthUrl = (state: string) => {
    return (
      'https://www.reddit.com/api/v1/authorize.compact' +
      `?client_id=${this.CLIENT_ID}` +
      `&response_type=code` +
      `&state=${state}` +
      `&redirect_uri=${encodeURIComponent(this.REDIRECT_URL)}` +
      `&duration=permanent` +
      `&scope=${encodeURIComponent(`history identity`)}`
    )
  }


  /**
   * Fetch the username from Reddit
   * Store the username
   */
  _fetchUserInfo = async (): Promise<string> => {
    const token = await this._getToken();

    const url = `https://oauth.reddit.com/api/v1/me/`

    const response = await fetch(url, {
      headers: {
        'Authorization': `bearer ${token.access_token}`,
        'User-Agent': this.USER_AGENT
      }
    })

    const data = await response.json();

    await AsyncStorage.setItem(this.STORAGE_REDDIT_USERNAME, data.name);

    await AsyncStorage.getItem(this.STORAGE_REDDIT_USERNAME)

    return data.name;
  }


  /**
   * Called by SignIn()
   * It will fetch the `access_token` endpoint
   * to get the token
   */
  _createToken = async (code: string): Promise<RedditToken> => {
    const url = (
      `https://www.reddit.com/api/v1/access_token` +
      `?grant_type=authorization_code` +
      `&code=${code}` +
      `&client_id=${this.CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(this.REDIRECT_URL)}`
    );

    const token: RedditToken = await (await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${this.BEARER_TOKEN}`,
        'User-Agent': this.USER_AGENT
      },
    })).json();

    return {
      ...token,
      token_date: Date.now()
    }
  }

  /**
   * Get the token object from AsyncStorage
   */
  _getToken = async (): Promise<RedditToken> => {
    if (this.token) return this.token;

    const localToken = await AsyncStorage.getItem(this.STORAGE_REDDIT_KEY);

    if (!localToken) return null;
    
    const token = JSON.parse(localToken);
    return token;
  }


  /**
   * Set the property token
   * Set the token in the AsyncStorage
   */
  _setToken = async (token) => {
    this.token = token;
    await AsyncStorage.setItem(this.STORAGE_REDDIT_KEY, JSON.stringify(token));
  }


  /**
   * It will refresh the token
   * A token expires every hour
   */
  _refreshToken = async () => {
    const token = await this._getToken()

    const url = 'https://www.reddit.com/api/v1/access_token'

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${this.BEARER_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=refresh_token` + 
            `&refresh_token=${token.refresh_token}`
    })

    const data = await response.json();

    const newToken = {
      ...data,
      token_date: Date.now()
    }

    if (newToken.error) return console.error(newToken);

    this._setToken(newToken);

    return newToken;
  }

}

export default new RedditService();
