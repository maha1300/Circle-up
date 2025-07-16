
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, MapPin, Clock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import CommentsModal from "./CommentsModal";
import ShareModal from "./ShareModal";

interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
    isOfficial?: boolean;
  };
  content: string;
  category: string;
  timestamp: string;
  location: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  image?: string;
}

interface PostCardProps {
  post: Post;
  onPostClick?: (post: Post) => void;
}

const PostCard = ({ post, onPostClick }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const categoryConfig = {
    alert: { 
      gradient: "from-destructive via-destructive/80 to-destructive/60", 
      icon: "⚡", 
      bgColor: "bg-destructive/10",
      textColor: "text-destructive"
    },
    event: { 
      gradient: "from-primary via-primary/80 to-primary/60", 
      icon: "🎊", 
      bgColor: "bg-primary/10",
      textColor: "text-primary"
    },
    scheme: { 
      gradient: "from-accent via-accent/80 to-accent/60", 
      icon: "🎁", 
      bgColor: "bg-accent/10",
      textColor: "text-accent-foreground"
    },
    weather: { 
      gradient: "from-muted via-muted/80 to-muted/60", 
      icon: "🌈", 
      bgColor: "bg-muted/10",
      textColor: "text-muted-foreground"
    },
    news: { 
      gradient: "from-secondary via-secondary/80 to-secondary/60", 
      icon: "📢", 
      bgColor: "bg-secondary/10",
      textColor: "text-secondary-foreground"
    }
  };

  const config = categoryConfig[post.category as keyof typeof categoryConfig] || 
    { 
      gradient: "from-muted to-muted/60", 
      icon: "📝", 
      bgColor: "bg-muted/10",
      textColor: "text-muted-foreground"
    };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? "💔 Removed from favorites" : "❤️ Added to favorites");
  };

  const handleComment = () => {
    setShowComments(true);
  };

  const handleShare = () => {
    setShowShare(true);
  };

  const handlePostClick = () => {
    if (onPostClick) {
      onPostClick(post);
    }
  };

  return (
    <>
      <Card className="bg-card backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in hover:scale-[1.02] overflow-hidden cursor-pointer" onClick={handlePostClick}>
        <div className={`h-1 w-full bg-gradient-to-r ${config.gradient}`}></div>
        <CardContent className="p-5">
          {/* Author Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12 ring-2 ring-card shadow-lg">
                <AvatarImage src={post.author.avatar.startsWith('http') ? post.author.avatar : undefined} />
                <AvatarFallback className={`bg-gradient-to-br ${config.gradient} text-primary-foreground font-bold`}>
                  {post.author.avatar.startsWith('http') ? 
                    post.author.name.split(' ').map(n => n[0]).join('') : 
                    post.author.avatar
                  }
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-card-foreground">{post.author.name}</h3>
                  {post.author.isOfficial && (
                    <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs border-0 animate-pulse-soft">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Official
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock size={12} className="text-primary" />
                    <span>{post.timestamp}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={12} className="text-accent" />
                    <span>{post.location}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Badge className={`${config.bgColor} ${config.textColor} border-0 font-bold shadow-lg animate-float`}>
              <span className="mr-1 text-sm">{config.icon}</span>
              {post.category}
            </Badge>
          </div>

          {/* Content */}
          <div className="mb-4">
            <p className="text-card-foreground leading-relaxed font-medium">{post.content}</p>
            {post.image && (
              <div className="mt-4 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={post.image} 
                  alt="Post content" 
                  className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
                className={`flex items-center space-x-2 transition-all duration-300 ${
                  isLiked 
                    ? 'text-destructive bg-destructive/10 hover:bg-destructive/20 animate-bounce-gentle' 
                    : 'text-muted-foreground hover:bg-destructive/10 hover:text-destructive'
                }`}
              >
                <Heart 
                  size={18} 
                  className={`transition-all duration-300 ${
                    isLiked ? 'fill-current text-destructive scale-125' : ''
                  }`} 
                />
                <span className="font-bold">{likes}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleComment();
                }}
                className="flex items-center space-x-2 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                <MessageCircle size={18} />
                <span className="font-bold">{post.comments}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare();
                }}
                className="flex items-center space-x-2 text-muted-foreground hover:bg-accent/10 hover:text-accent transition-all duration-300"
              >
                <Share size={18} />
                <span className="font-bold">{post.shares}</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <CommentsModal 
        isOpen={showComments} 
        onClose={() => setShowComments(false)} 
        postId={post.id} 
      />
      
      <ShareModal 
        isOpen={showShare} 
        onClose={() => setShowShare(false)} 
        postId={post.id}
        postContent={post.content}
      />
    </>
  );
};

export default PostCard;
