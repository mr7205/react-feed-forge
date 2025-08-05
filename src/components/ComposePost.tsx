import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Image, Smile, MapPin, Calendar } from 'lucide-react';

const ComposePost = () => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handlePost = () => {
    if (content.trim()) {
      // Handle post submission
      console.log('Posting:', content);
      setContent('');
      setIsExpanded(false);
    }
  };

  const remainingChars = 280 - content.length;
  const isOverLimit = remainingChars < 0;

  return (
    <Card className="border border-border bg-gradient-to-b from-card to-card/50 mb-6">
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="w-10 h-10 ring-2 ring-accent">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={handleFocus}
              className="min-h-[60px] resize-none border-none bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0 p-0"
              maxLength={320}
            />
            
            {isExpanded && (
              <div className="space-y-4 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                {/* Media options */}
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
                    <Image className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
                    <MapPin className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
                    <Calendar className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div className="flex items-center space-x-2">
                    {content.length > 0 && (
                      <div className={`text-sm ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {remainingChars}
                      </div>
                    )}
                  </div>
                  
                  <Button
                    onClick={handlePost}
                    disabled={!content.trim() || isOverLimit}
                    className="bg-primary hover:bg-primary-hover text-primary-foreground px-6"
                  >
                    Post
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ComposePost;