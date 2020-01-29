import Constants from 'expo-constants';

const releaseChannel = Constants.manifest.releaseChannel

const channels = {
  development: {
    clientId: process.env.DEV_REDDIT_CLIENT_ID,
    creatorUsername: process.env.DEV_REDDIT_USERNAME
  },
  production: {
    clientId: process.env.REDDIT_CLIENT_ID,
    creatorUsername: process.env.REDDIT_USERNAME
  }
}

function getEnvVar() {
  if (releaseChannel === undefined) return channels.development;
  return channels.production;
}

export default getEnvVar();