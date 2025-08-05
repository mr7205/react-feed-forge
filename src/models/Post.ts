// Model Layer - Data structures and types
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified: boolean;
}

export interface PostMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
}

export interface PostMetrics {
  likes: number;
  retweets: number;
  replies: number;
  views: number;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  media?: PostMedia[];
  timestamp: Date;
  metrics: PostMetrics;
  isLiked: boolean;
  isRetweeted: boolean;
  parentPost?: Post; // For retweets
  type: 'text' | 'image' | 'video' | 'retweet';
}

export interface FeedState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  refreshing: boolean;
}