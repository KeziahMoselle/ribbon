import { AuthSession } from 'expo';
import { AsyncStorage, Platform } from 'react-native';
import credentials from './credentials';
import { Buffer } from 'buffer';
import appInfo from '../../../app.json';

class RedditService {

  CLIENT_ID = credentials.clientId;
  REDIRECT_URL = AuthSession.getRedirectUrl();
  BEARER_TOKEN = new Buffer(`${this.CLIENT_ID}:`).toString('base64');
  STORAGE_REDDIT_KEY = '@Bookmarks:RedditOAuthKey';
  STORAGE_REDDIT_USERNAME = '@Bookmarks:RedditUsername'
  USER_AGENT = `${Platform.OS}:${appInfo.expo.android.package}:${appInfo.expo.version} (by /u/${credentials.creatorUsername})`

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

    await AsyncStorage.removeItem(this.STORAGE_REDDIT_KEY);
    await AsyncStorage.removeItem(this.STORAGE_REDDIT_USERNAME);
    this.token = null;
  }

    /**
   * Bootstrap the app in the AuthProvider
   * It will log the user in if a token is present and valid
   * otherwise it will refresh it
   */
  bootstrapAppData = async () => {
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
   * It will fetch saved posts from Reddit
   * and store them
   */
  getSavedPosts = async () => {
    const token = await this._getToken();
    const username = await AsyncStorage.getItem(this.STORAGE_REDDIT_USERNAME);

    const url = `https://oauth.reddit.com/user/${username}/saved`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${token.access_token}`,
        'User-Agent': this.USER_AGENT
      }
    })

    const result = await response.json();

    if (result.error) {
      console.error(result.message);
      return
    }

    const savedPosts: BookmarkInterface[] = [];

    for (const post of result.data.children) {
      const { data } = post;

      savedPosts.push({
        id: `${data.subreddit}:${data.name}`,
        title: data.title,
        description: data.selftext,
        subreddit: data.subreddit_name_prefixed,
        permalink: `https://reddit.com${data.permalink}`,
        preview: data.preview?.images[0].source.url,
        url: data.url,
      })
    }

    return savedPosts;
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

  _setToken = async (token) => {
    this.token = token;
    await AsyncStorage.setItem(this.STORAGE_REDDIT_KEY, JSON.stringify(token));
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
