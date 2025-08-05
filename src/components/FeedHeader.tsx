import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Search, Bell, Mail, Bookmark, User, MoreHorizontal } from "lucide-react";

const FeedHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-hover flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">F</span>
            </div>
            <h1 className="text-xl font-bold hidden sm:block">Feed</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
              <Home className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Mail className="w-5 h-5" />
            </Button>
          </nav>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FeedHeader;