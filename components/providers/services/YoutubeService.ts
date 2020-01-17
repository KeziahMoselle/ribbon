import * as AppAuth from 'expo-app-auth';
import { AsyncStorage } from 'react-native';

const CONFIG = {
  issuer: 'https://accounts.google.com',
  scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
  clientId: '665670953347-1hq6a9o53duqgdr1re8kscm9oqqduo8f.apps.googleusercontent.com'
};

const STORAGE_GOOGLE_KEY = '@Bookmarks:GoogleOAuthKey';

async function SignIn () {
  // Login with OAuth
  const authState = await AppAuth.authAsync(CONFIG);
  // Store the authState for future use
  await AsyncStorage.setItem(STORAGE_GOOGLE_KEY, JSON.stringify(authState));
}

async function getOauth () {
  const oauth = await AsyncStorage.getItem(STORAGE_GOOGLE_KEY);
  return JSON.parse(oauth);
}

async function Disconnect () {
  await AsyncStorage.removeItem(STORAGE_GOOGLE_KEY);
}

export { SignIn, getOauth, Disconnect };