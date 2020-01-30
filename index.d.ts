interface RedditToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  token_date: number;
}

interface BookmarkInterface {
  id: number;
  title: string;
  description: string;
  subreddit: string;
  permalink: string;
  preview?: string;
  url: string;
}