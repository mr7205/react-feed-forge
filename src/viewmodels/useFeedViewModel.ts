// ViewModel Layer - Business logic and state management
import { useState, useEffect, useCallback, useRef } from 'react';
import { Post, FeedState } from '@/models/Post';
import { feedService } from '@/services/FeedService';

export const useFeedViewModel = () => {
  const [feedState, setFeedState] = useState<FeedState>({
    posts: [],
    loading: false,
    error: null,
    hasMore: true,
    refreshing: false,
  });

  const currentPage = useRef(0);
  const isLoadingMore = useRef(false);

  // Load initial posts
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = useCallback(async (refresh = false) => {
    if (isLoadingMore.current && !refresh) return;

    isLoadingMore.current = true;
    
    setFeedState(prev => ({
      ...prev,
      loading: !refresh && prev.posts.length === 0,
      refreshing: refresh,
      error: null,
    }));

    try {
      const result = await feedService.fetchPosts(refresh ? 0 : currentPage.current, refresh);
      
      if (refresh) {
        currentPage.current = 1;
        setFeedState(prev => ({
          ...prev,
          posts: result.posts,
          hasMore: result.hasMore,
          loading: false,
          refreshing: false,
        }));
      } else {
        currentPage.current += 1;
        setFeedState(prev => ({
          ...prev,
          posts: [...prev.posts, ...result.posts],
          hasMore: result.hasMore,
          loading: false,
        }));
      }
    } catch (error) {
      setFeedState(prev => ({
        ...prev,
        error: 'Failed to load posts',
        loading: false,
        refreshing: false,
      }));
    } finally {
      isLoadingMore.current = false;
    }
  }, []);

  const refresh = useCallback(() => {
    loadPosts(true);
  }, [loadPosts]);

  const loadMore = useCallback(() => {
    if (feedState.hasMore && !isLoadingMore.current) {
      loadPosts(false);
    }
  }, [feedState.hasMore, loadPosts]);

  const toggleLike = useCallback(async (postId: string) => {
    // Optimistic update
    setFeedState(prev => ({
      ...prev,
      posts: prev.posts.map(post => 
        post.id === postId 
          ? {
              ...post,
              isLiked: !post.isLiked,
              metrics: {
                ...post.metrics,
                likes: post.metrics.likes + (post.isLiked ? -1 : 1)
              }
            }
          : post
      )
    }));

    try {
      await feedService.toggleLike(postId);
    } catch (error) {
      // Revert optimistic update on error
      setFeedState(prev => ({
        ...prev,
        posts: prev.posts.map(post => 
          post.id === postId 
            ? {
                ...post,
                isLiked: !post.isLiked,
                metrics: {
                  ...post.metrics,
                  likes: post.metrics.likes + (post.isLiked ? 1 : -1)
                }
              }
            : post
        )
      }));
    }
  }, []);

  const toggleRetweet = useCallback(async (postId: string) => {
    // Optimistic update
    setFeedState(prev => ({
      ...prev,
      posts: prev.posts.map(post => 
        post.id === postId 
          ? {
              ...post,
              isRetweeted: !post.isRetweeted,
              metrics: {
                ...post.metrics,
                retweets: post.metrics.retweets + (post.isRetweeted ? -1 : 1)
              }
            }
          : post
      )
    }));

    try {
      await feedService.toggleRetweet(postId);
    } catch (error) {
      // Revert optimistic update on error
      setFeedState(prev => ({
        ...prev,
        posts: prev.posts.map(post => 
          post.id === postId 
            ? {
                ...post,
                isRetweeted: !post.isRetweeted,
                metrics: {
                  ...post.metrics,
                  retweets: post.metrics.retweets + (post.isRetweeted ? 1 : -1)
                }
              }
            : post
        )
      }));
    }
  }, []);

  return {
    ...feedState,
    refresh,
    loadMore,
    toggleLike,
    toggleRetweet,
  };
};