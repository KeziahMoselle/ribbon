import { AuthSession } from 'expo';
import { AsyncStorage, Platform } from 'react-native';
import { encode as btoa } from 'base-64';
import credentials from './credentials';
import { formatDistanceToNow } from 'date-fns';
import appInfo from '../../../../app.json';

class RedditService {

  CLIENT_ID = credentials.clientId;
  REDIRECT_URL = AuthSession.getRedirectUrl();
  BEARER_TOKEN = btoa(`${this.CLIENT_ID}:`);
  STORAGE_REDDIT_TOKEN = '@Bookmarks:RedditOAuthToken';
  STORAGE_REDDIT_REFRESH_TOKEN = '@Bookmarks:RedditOAuthRefresh';
  STORAGE_REDDIT_USERNAME = '@Bookmarks:RedditUsername';
  STORAGE_REDDIT_BOOKMARKS = '@Bookmarks:RedditBookmarks';
  STORAGE_REDDIT_PINNED_BOOKMARKS = '@Bookmarks:RedditPinnedBookmarks';
  USER_AGENT = `${Platform.OS}:${appInfo.expo.android.package}:${appInfo.expo.version} (by /u/${credentials.creatorUsername})`;

  token = null;
  username = null;

  /**
   * Open a browser to initiate the OAuth 2 process
   * After a successful login it will save the token in AsyncStorage
   */
  SignIn = async (): Promise<RedditToken> => {
    try {
      const state = new Date().valueOf().toString();
      const authUrl = this._getAuthUrl(state);
      const result = await AuthSession.startAsync({ authUrl, returnUrl: this.REDIRECT_URL });
      
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
      console.log('SignIn:', error);
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
    
    await this.clearStorage();
  }

  /**
   * Bootstrap the app in the AuthProvider
   * It will log the user in if a token is present and valid
   * otherwise it will refresh it
   */
  bootstrapAuthData = async () => {
    const token = await this._getToken();

    // If the user is not present, the user is logged out
    if (!token) {
      return {
        isLoggedIn: false,
        username: null
      }
    }
    
    const now = Date.now();
    const AN_HOUR_MS = 3600 * 1000;
    
    // Token expired 1 hour
    if (now - token.token_date >= AN_HOUR_MS) {
      try {
        await this._refreshToken();
      } catch (error) {
        console.log('refreshToken', error);
      }
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
  bootstrapBookmarksData = async (): Promise<BookmarkInterface[]> => {
    const localBookmarks = await AsyncStorage.getItem(this.STORAGE_REDDIT_BOOKMARKS);

    if (!localBookmarks) {
      throw 'No bookmarks';
    }
    
    return JSON.parse(localBookmarks);
  }

  /**
   * Bootstrap the pinnedBookmarks data in the BookmarksProvider
   * Display pinned bookmarks if they are found
   * Otherwise display the "NoPinned" component
   */
  bootstrapPinnedBookmarksData = async (): Promise<BookmarkInterface[]> => {
    const localPinnedBookmarks = await AsyncStorage.getItem(this.STORAGE_REDDIT_PINNED_BOOKMARKS);

    if (!localPinnedBookmarks) {
      throw 'No pinned bookmarks';
    }

    return JSON.parse(localPinnedBookmarks);
  }

  /**
   * Save pinnedBookmarks in storage
   */
  savePinnedBookmarks = async (pinnedBookmarks: BookmarkInterface[]) => {
    try {
      await AsyncStorage.setItem(
        this.STORAGE_REDDIT_PINNED_BOOKMARKS,
        JSON.stringify(pinnedBookmarks)
      );
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Save bookmarks in storage
   */
  saveBookmarks = async (bookmarks: BookmarkInterface[]) => {
    try {
      await AsyncStorage.setItem(
        this.STORAGE_REDDIT_BOOKMARKS,
        JSON.stringify(bookmarks)
      );
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * It will fetch saved posts from Reddit
   * and store them
   */
  fetchAllSavedPosts = async () => {
    let after = '';
    let count = 0;
    const allSavedPosts = [];
    
    do {
      const result = await this.fetchSavedPosts(after, count);

      if (result.error || !result) throw result;

      if (result.data.after) {
        result.data.children.forEach(child => allSavedPosts.push(child));
        count += result.data.children.length;
        after = result.data.after;
      } else {
        // Finished
        after = null;
      }
    } while (after);

    const savedPosts = this.filterSavedPosts(allSavedPosts);

    await AsyncStorage.setItem(
      this.STORAGE_REDDIT_BOOKMARKS,
      JSON.stringify(savedPosts)
    );

    return savedPosts;
  }

  fetchSavedPosts = async (after = null, count = null): Promise<RedditResponse> => {
    const token = await this._getToken();
    const username = await this._getUsername();

    const baseUrl = `https://oauth.reddit.com/user/${username}/saved?raw_json=1&limit=100`;
    const query = `&after=${after}&count=${count}`
    // First query : baseUrl without query
    // Subsequent queries with query `after` and `count`
    const url = after ? `${baseUrl}${query}` : baseUrl;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${token.access_token}`,
        'User-Agent': this.USER_AGENT
      }
    })

    const result: RedditResponse = await response.json();
    return result;
  }

  filterSavedPosts = (result: RedditPost[]) => {
    const savedPosts: BookmarkInterface[] = [];

    for (const post of result) {
      const data = post.data;

      let newPost: BookmarkInterface;

      const date = formatDistanceToNow(data.created_utc * 1000);
      const thumbnail = this.getPostThumbnail(post);
      const excerpt = this.getExcerpt(data.selftext);
      const permalink = (
        data.link_permalink
        || `https://reddit.com${data.permalink}`
        || data.url
      );

      // kind = Link
      if (post.kind === 't3') {
        newPost= {
          kind: 'Link',
          id: data.name,
          title: data.title,
          date,
          description: data.selftext,
          excerpt,
          subreddit: data.subreddit_name_prefixed,
          permalink,
          thumbnail,
          url: data.url,
        }
      }

      // kind = Comment
      if (post.kind === 't1') {
        newPost = {
          kind: 'Comment',
          id: data.name,
          title: data.link_title,
          date,
          description: data.selftext,
          excerpt,
          subreddit: data.subreddit_name_prefixed,
          permalink,
          thumbnail,
          url: data.link_url,
        }
      }

      savedPosts.push(newPost);
    }

    return savedPosts;
  }

  /**
   * Find a good thumbnail for a bookmark
   */
  getPostThumbnail = (post: RedditPost): string => {
    const data = post.data;
    const preview = post.data.preview;

    let thumbnail: string;

    if (post.kind === 't3') {
      if (
        preview &&
        preview.images.length > 0 &&
        preview.images[0].resolutions.length > 2
      ) {
        // The resolution index is the middle level of compression
        const resolutionIndex = Math.round(preview.images[0].resolutions.length / 2);
        thumbnail = preview.images[0].resolutions[resolutionIndex].url;
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

  getExcerpt = (description: string): string => {
    if (!description) return;
    const limit = 140;
    const lastWordIndex = description.lastIndexOf(' ', limit);
    return `${description.substr(0, lastWordIndex)}...`;
  }

  /**
   * Unsave a bookmark from Reddit
   */
  unsavePost = async (id: string) => {
    const token = await this._getToken();

    const url = `https://oauth.reddit.com/api/unsave`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token.access_token}`,
        'User-Agent': this.USER_AGENT,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `id=${id}`
    })

    const result = await response.json();

    if (result.error) throw result;
    return true;
  }

  /**
   * Remove all the keys related to RedditService
   * from AsyncStorage
   */
  clearStorage = async () => {
    await AsyncStorage.multiRemove([
      this.STORAGE_REDDIT_TOKEN,
      this.STORAGE_REDDIT_REFRESH_TOKEN,
      this.STORAGE_REDDIT_USERNAME,
      this.STORAGE_REDDIT_BOOKMARKS,
      this.STORAGE_REDDIT_PINNED_BOOKMARKS
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
      `&scope=${encodeURIComponent(`history identity save`)}`
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
   * and store the `refresh_token` key
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

    await AsyncStorage.setItem(
      this.STORAGE_REDDIT_REFRESH_TOKEN,
      token.refresh_token
    );

    return {
      access_token: token.access_token,
      expires_in: token.expires_in,
      scope: token.scope,
      token_type: token.token_type,
      token_date: Date.now()
    }
  }

  /**
   * Get the token object from AsyncStorage
   */
  _getToken = async (): Promise<RedditToken> => {
    if (this.token) return this.token;

    const localToken = await AsyncStorage.getItem(this.STORAGE_REDDIT_TOKEN);

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
    await AsyncStorage.setItem(this.STORAGE_REDDIT_TOKEN, JSON.stringify(token));
  }

  /**
   * It will refresh the token
   * A token expires every hour
   */
  _refreshToken = async () => {
    const refresh_token = await AsyncStorage.getItem(this.STORAGE_REDDIT_REFRESH_TOKEN);
    
    const url = 'https://www.reddit.com/api/v1/access_token';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${this.BEARER_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=refresh_token` + 
            `&refresh_token=${refresh_token}`
    })

    const data = await response.json();
    
    if (data.error || !data) throw data;

    const newToken = {
      ...data,
      token_date: Date.now()
    }

    this._setToken(newToken);

    return newToken;
  }

  _getUsername = async () => {
    if (this.username) return this.username;
    const username = await AsyncStorage.getItem(this.STORAGE_REDDIT_USERNAME);
    this.username = username;
    return username;
  }

}

export default new RedditService();
