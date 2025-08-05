import { useEffect, useRef, useCallback } from 'react';
import { Post } from '@/models/Post';
import PostCard from './PostCard';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';

interface FeedListProps {
  posts: Post[];
  loading: boolean;
  refreshing: boolean;
  hasMore: boolean;
  error: string | null;
  onRefresh: () => void;
  onLoadMore: () => void;
  onLike: (postId: string) => void;
  onRetweet: (postId: string) => void;
}

const FeedList = ({
  posts,
  loading,
  refreshing,
  hasMore,
  error,
  onRefresh,
  onLoadMore,
  onLike,
  onRetweet,
}: FeedListProps) => {
  const observerRef = useRef<IntersectionObserver>();
  const lastPostRef = useRef<HTMLDivElement>(null);

  // Infinite scroll implementation
  const lastPostElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        onLoadMore();
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [loading, hasMore, onLoadMore]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <p className="text-destructive text-center">{error}</p>
        <Button onClick={onRefresh} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Pull to refresh indicator */}
      {refreshing && (
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center space-x-2 text-primary">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="text-sm font-medium">Refreshing...</span>
          </div>
        </div>
      )}

      {/* Posts */}
      {posts.map((post, index) => (
        <div
          key={post.id}
          ref={index === posts.length - 1 ? lastPostElementRef : null}
          className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <PostCard
            post={post}
            onLike={onLike}
            onRetweet={onRetweet}
          />
        </div>
      ))}

      {/* Loading more indicator */}
      {loading && posts.length > 0 && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading more posts...</span>
          </div>
        </div>
      )}

      {/* Initial loading */}
      {loading && posts.length === 0 && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="border border-border rounded-xl p-4 bg-card">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* End of feed */}
      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">You've reached the end of the feed</p>
          <Button 
            onClick={onRefresh} 
            variant="ghost" 
            size="sm" 
            className="mt-2"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh Feed
          </Button>
        </div>
      )}
    </div>
  );
};

export default FeedList;