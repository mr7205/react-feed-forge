// Service Layer - Data fetching and API simulation
import { Post, User, PostMedia } from '@/models/Post';

class FeedService {
  private static instance: FeedService;
  private posts: Post[] = [];
  private page = 0;
  private readonly pageSize = 10;

  static getInstance(): FeedService {
    if (!FeedService.instance) {
      FeedService.instance = new FeedService();
    }
    return FeedService.instance;
  }

  constructor() {
    this.generateMockData();
  }

  private generateMockData(): void {
    const users: User[] = [
      { id: '1', username: 'sarahtech', displayName: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e02e2a?w=400', verified: true },
      { id: '2', username: 'devjohn', displayName: 'John Developer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', verified: false },
      { id: '3', username: 'designlisa', displayName: 'Lisa Design', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', verified: true },
      { id: '4', username: 'techbro', displayName: 'Mike Rodriguez', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', verified: false },
      { id: '5', username: 'coderina', displayName: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', verified: true },
    ];

    const sampleContent = [
      "Just shipped a new feature! The power of clean architecture is incredible. MVVM pattern really makes testing so much easier 🚀",
      "Working on some amazing React patterns today. The separation of concerns in modern frontend development is beautiful.",
      "Hot take: Good documentation is more valuable than clever code. What do you think?",
      "Building something exciting with TypeScript and React. The type safety is a game changer for large applications.",
      "Sunday morning coding session with coffee ☕ Nothing beats the flow state!",
      "Reminder: Your code will be read more often than it's written. Make it count.",
      "Just discovered this amazing pattern for state management. Sometimes the simple solutions are the best ones.",
      "The future of web development is looking bright. So many exciting technologies to explore!",
    ];

    // Generate mock posts
    for (let i = 0; i < 50; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const content = sampleContent[Math.floor(Math.random() * sampleContent.length)];
      
      let media: PostMedia[] | undefined;
      const hasMedia = Math.random() > 0.7;
      
      if (hasMedia) {
        media = [{
          id: `media-${i}`,
          type: 'image',
          url: `https://images.unsplash.com/photo-${1500000000000 + i}?w=600&h=400&fit=crop`,
          thumbnailUrl: `https://images.unsplash.com/photo-${1500000000000 + i}?w=300&h=200&fit=crop`
        }];
      }

      this.posts.push({
        id: `post-${i}`,
        user,
        content,
        media,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        metrics: {
          likes: Math.floor(Math.random() * 1000),
          retweets: Math.floor(Math.random() * 500),
          replies: Math.floor(Math.random() * 200),
          views: Math.floor(Math.random() * 5000),
        },
        isLiked: Math.random() > 0.8,
        isRetweeted: Math.random() > 0.9,
        type: hasMedia ? 'image' : 'text',
      });
    }
  }

  async fetchPosts(page: number = 0, refresh: boolean = false): Promise<{ posts: Post[], hasMore: boolean }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, refresh ? 500 : 1000));
    
    if (refresh) {
      this.page = 0;
      page = 0;
    }

    const startIndex = page * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const posts = this.posts.slice(startIndex, endIndex);
    
    return {
      posts,
      hasMore: endIndex < this.posts.length
    };
  }

  async toggleLike(postId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.isLiked = !post.isLiked;
      post.metrics.likes += post.isLiked ? 1 : -1;
    }
  }

  async toggleRetweet(postId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.isRetweeted = !post.isRetweeted;
      post.metrics.retweets += post.isRetweeted ? 1 : -1;
    }
  }
}

export const feedService = FeedService.getInstance();