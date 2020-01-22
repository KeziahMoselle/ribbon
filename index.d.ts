interface RedditToken {
  access_token: string;
  bearer_token?: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

interface BookmarkInterface {
  id: number;
  title: string;
  url: string;
}