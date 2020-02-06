interface AuthProvider {
  isLoggedIn: boolean,
  username: string,
  login: () => Promise,
  logout: () => Promise
}

interface RedditToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  token_date: number;
}

interface RedditResponse {
  kind: string;
  data: {
    modhash: string;
    dist: number;
    children: RedditPost[];
    after: string;
    before: string;
  },
  error: string;
}

interface RedditPost {
  kind: 't1' | 't2' | 't3' | 't4' | 't5' | 't6';
  data: RedditPostData;
}

interface RedditPostData {
  title: string;
  selftext: string;
  url: string;
  awarders: string[];
  total_awards_received: number;
  approved_at_utc: number | null;
  link_title: string;
  mod_reason_by: string | null;
  banned_by: string | null;
  author_flair_type: string;
  removal_reason: string | null;
  link_id: string;
  author_flair_template_id: string | null;
  likes: boolean;
  replies: string;
  user_reports: array;
  saved: boolean;
  id: string;
  banned_at_utc: number | null;
  mod_reason_title: string | null;
  gilded: number;
  archived: boolean;
  no_follow: boolean;
  author: string;
  num_comments: number;
  can_mod_post: boolean;
  created_utc: number;
  send_replies: boolean;
  parent_id: string;
  score: number;
  author_fullname: string;
  over_18: boolean;
  preview: RedditPreviewInterface;
  approved_by: string | null;
  mod_note: string | null;
  all_awardings: object[];
  subreddit_id: string;
  body: string;
  edited: boolean;
  author_flair_css_class: string | null;
  name: string;
  author_patreon_flair: boolean;
  downs: number;
  author_flair_richtext: array;
  is_submitter: boolean;
  body_html: string;
  gildings: object;
  collapsed_reason: string | null;
  distinguished: any;
  associated_award: any;
  stickied: boolean;
  author_premium: boolean;
  can_gild: boolean;
  subreddit: string;
  author_flair_text_color: string | null;
  score_hidden: boolean;
  permalink: string;
  num_reports: any;
  link_permalink: string;
  report_reasons: string | null;
  link_author: string;
  author_flair_text: string | null;
  link_url: string;
  created: number;
  collapsed: boolean;
  subreddit_name_prefixed: string;
  controversiality: number;
  locked: boolean;
  author_flair_background_color: string | null;
  collapsed_because_crowd_control: string | null;
  mod_reports: array;
  quarantine: boolean;
  subreddit_type: string;
  ups: number;
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
  date: string;
  description: string;
  subreddit: string;
  permalink: string;
  thumbnail: string | void;
  url: string;
}

interface BookmarksProvider {
  bookmarks: BookmarkInterface[];
  pinnedBookmarks: BookmarkInterface[];
  status: PromiseStatus;
  refetch: () => Promise;
  updateBookmarks: () => void;
  updatePinnedBookmarks: () => void;
  addToPinnedBookmarks: (index: number) => void;
  removeFromPinnedBookmarks: (id: string) => void;
  isPinnedBookmark: (id: string) => boolean;
  pinnedStatus: PromiseStatus;
}

type PromiseStatus = 'initial' | 'pending' | 'fulfilled' | 'rejected';