import * as AppAuth from 'expo-app-auth';
import Store from '../utils/Store';

const CONFIG = {
  issuer: 'https://accounts.google.com',
  scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
  clientId: '665670953347-1hq6a9o53duqgdr1re8kscm9oqqduo8f.apps.googleusercontent.com'
};

const STORAGE_GOOGLE_KEY = 'GoogleOAuthKey';

async function SignIn () {
  try {
    const authState = await AppAuth.authAsync(CONFIG);
    console.log('signInAsync', authState);
    Store.setItem(STORAGE_GOOGLE_KEY, authState);
    return authState;
  } catch (error) {
    alert(error)
  }
}

export default SignIn;