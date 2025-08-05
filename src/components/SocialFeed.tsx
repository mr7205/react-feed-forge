// Main Feed View Component - Composing all the UI elements
import { useFeedViewModel } from '@/viewmodels/useFeedViewModel';
import FeedHeader from './FeedHeader';
import ComposePost from './ComposePost';
import FeedList from './FeedList';

const SocialFeed = () => {
  const {
    posts,
    loading,
    refreshing,
    hasMore,
    error,
    refresh,
    loadMore,
    toggleLike,
    toggleRetweet,
  } = useFeedViewModel();

  return (
    <div className="min-h-screen bg-background">
      <FeedHeader />
      
      <main className="max-w-2xl mx-auto px-4 py-6">
        <ComposePost />
        
        <FeedList
          posts={posts}
          loading={loading}
          refreshing={refreshing}
          hasMore={hasMore}
          error={error}
          onRefresh={refresh}
          onLoadMore={loadMore}
          onLike={toggleLike}
          onRetweet={toggleRetweet}
        />
      </main>
    </div>
  );
};

export default SocialFeed;