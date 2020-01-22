import { getToken } from './RedditService';

async function bootstrapAppData(): Promise<RedditToken> {
  const token = await getToken()
  if (!token) {
    return null
  }

  return token
}

export default bootstrapAppData;