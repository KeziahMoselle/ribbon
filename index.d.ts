interface RedditToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  token_date: number;
}

interface RedditPreviewInterface {
  images: {
    source: {
      url: string;
      width: number;
      height: number;
    };
    resolutions: {
      url: string;
      width: number;
      height: number;
    }[];
  }[];
  enabled: boolean;
}

interface BookmarkInterface {
  kind: 'Link' | 'Comment';
  id: string;
  title: string;
  date: number;
  description: string;
  subreddit: string;
  permalink: string;
  thumbnail?: string;
  url: string;
}