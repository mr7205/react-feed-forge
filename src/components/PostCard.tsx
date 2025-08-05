import { Post } from "@/models/Post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, BadgeCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onRetweet: (postId: string) => void;
}

const PostCard = ({ post, onLike, onRetweet }: PostCardProps) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Card className="border border-border hover:shadow-[var(--shadow-hover)] transition-all duration-200 bg-gradient-to-b from-card to-card/50">
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 min-w-0 flex-1">
            <Avatar className="w-10 h-10 ring-2 ring-accent">
              <AvatarImage src={post.user.avatar} alt={post.user.displayName} />
              <AvatarFallback>{post.user.displayName[0]}</AvatarFallback>
            </Avatar>
            
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-card-foreground truncate">
                  {post.user.displayName}
                </h3>
                {post.user.verified && (
                  <BadgeCheck className="w-4 h-4 text-primary flex-shrink-0" />
                )}
                <span className="text-muted-foreground text-sm">@{post.user.username}</span>
                <span className="text-muted-foreground text-sm">·</span>
                <span className="text-muted-foreground text-sm">
                  {formatDistanceToNow(post.timestamp, { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-card-foreground leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
          
          {/* Media */}
          {post.media && post.media.length > 0 && (
            <div className="rounded-xl overflow-hidden border border-border">
              <img
                src={post.media[0].url}
                alt="Post media"
                className="w-full h-auto max-h-96 object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary group"
          >
            <MessageCircle className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
            <span className="text-sm">{formatNumber(post.metrics.replies)}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRetweet(post.id)}
            className={`group transition-colors ${
              post.isRetweeted 
                ? 'text-retweet hover:text-retweet/80' 
                : 'text-muted-foreground hover:text-retweet'
            }`}
          >
            <Repeat2 className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
            <span className="text-sm">{formatNumber(post.metrics.retweets)}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(post.id)}
            className={`group transition-colors ${
              post.isLiked 
                ? 'text-like hover:text-like/80' 
                : 'text-muted-foreground hover:text-like'
            }`}
          >
            <Heart 
              className={`w-4 h-4 mr-1 group-hover:scale-110 transition-transform ${
                post.isLiked ? 'fill-current' : ''
              }`} 
            />
            <span className="text-sm">{formatNumber(post.metrics.likes)}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary group"
          >
            <Share className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;