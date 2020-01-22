import { AuthSession } from 'expo';
import { AsyncStorage } from 'react-native';
import credentials from './credentials';
import { Buffer } from 'buffer';

const CLIENT_ID = credentials.reddit.clientId;
const REDIRECT_URL = AuthSession.getRedirectUrl();
const STORAGE_REDDIT_KEY = '@Bookmarks:RedditOAuthKey';

/**
 * Open a browser to initiate the OAuth 2 process
 * After a successful login it will save the token in AsyncStorage
 *
 * @returns {boolean}
 */
async function SignIn(): Promise<RedditToken> {
  const state = new Date().valueOf().toString();
  const authUrl = getAuthUrl(state);
  const result = await AuthSession.startAsync({ authUrl: authUrl });
  
  if (result.type === 'dismiss') throw new Error('Dismiss');
  if (result.type !== 'success') throw new Error('Error');
  
  const { params } = result;

  if (params.state !== state) throw new Error('State does not match');
  if (params.error === 'access_denied') {
    alert('Reddit OAuth access denied.')
    throw new Error('Reddit OAuth access denied.');
  }

  const token = await createToken(params.code);

  await AsyncStorage.setItem(STORAGE_REDDIT_KEY, JSON.stringify(token));
  return token
}


/**
 * Construct the OAuth URL
 * Used variables :
 * CLIENT_ID - The Reddit client id (not secret)
 * REDIRECT_URL - Should match the Redirect URI field of the Reddit app
 * state - The date string, to get a somewhat unique value
 *
 * @param {string} state
 * @returns {string}
 */
function getAuthUrl(state: string) {
  return (
    'https://www.reddit.com/api/v1/authorize.compact' +
    `?client_id=${CLIENT_ID}` +
    `&response_type=code` +
    `&state=${state}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}` +
    `&duration=permanent` +
    `&scope=history`
  )
}


/**
 * Called by SignIn()
 * It will fetch the `access_token` endpoint
 * to get the token
 *
 * @param {*} code
 * @returns
 */
async function createToken(code): Promise<RedditToken> {
  const url = (
    `https://www.reddit.com/api/v1/access_token` +
    `?grant_type=authorization_code` +
    `&code=${code}` +
    `&client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}`
  );

  const bearer_token = new Buffer(`${CLIENT_ID}:`).toString('base64');

  const token: RedditToken = await (await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${bearer_token}`,
    },
  })).json();

  return {
    ...token,
    bearer_token
  }
}


/**
 * It will refresh the token
 * A token expires every hour
 * TODO
 */
async function refreshToken() {
  const token = await getToken()

  fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${token.bearer_token}`,
    },
  }).then(res => res.json());
}


/**
 * Get the token object from AsyncStorage
 *
 * @returns {object}
 */
async function getToken(): Promise<RedditToken> {
  const token = await AsyncStorage.getItem(STORAGE_REDDIT_KEY);
  return JSON.parse(token);
}


/**
 * Revoke the token
 * TODO
 * @returns {boolean}
 */
async function Disconnect(): Promise<any> {
  await AsyncStorage.removeItem(STORAGE_REDDIT_KEY);
}

export { SignIn, getToken, Disconnect };