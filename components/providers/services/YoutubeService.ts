import * as AppAuth from 'expo-app-auth';
import Store from '../utils/Store';

const CONFIG = {
  issuer: 'https://accounts.google.com',
  scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
  clientId: '665670953347-1hq6a9o53duqgdr1re8kscm9oqqduo8f.apps.googleusercontent.com'
};

const STORAGE_GOOGLE_KEY = 'GoogleOAuthKey';

async function SignIn () {
  const authState = await AppAuth.authAsync(CONFIG);
  Store.setItem(STORAGE_GOOGLE_KEY, authState);
  return authState;
}

async function getOauth () {
  const oauth = await Store.getItem(STORAGE_GOOGLE_KEY);
  return oauth;
}

async function Disconnect () {
  return Store.removeItem(STORAGE_GOOGLE_KEY);
}

export { SignIn, getOauth, Disconnect };