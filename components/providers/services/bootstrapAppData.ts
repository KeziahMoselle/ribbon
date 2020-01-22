import { getToken } from './RedditService';

async function bootstrapAppData() {
  const token = await getToken()
  if (!token) {
    return null
  }

  return token
}

export default bootstrapAppData;