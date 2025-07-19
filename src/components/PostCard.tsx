
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, MapPin, Clock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import CommentsModal from "./CommentsModal";
import ShareModal from "./ShareModal";
import { useUser } from "@/contexts/UserContext";

interface Post {
  id: number;
  author: {
    id?: string;
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
  onAuthorClick?: (authorName: string) => void;
}

const PostCard = ({ post, onPostClick, onAuthorClick }: PostCardProps) => {
  const { generateAvatarFromName } = useUser();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [shares, setShares] = useState(post.shares);
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

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? "💔 Removed from favorites" : "❤️ Added to favorites");
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowComments(true);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShares(prev => prev + 1);
    setShowShare(true);
  };

  const handleCommentAdded = () => {
    setComments(prev => prev + 1);
  };

  const handlePostClick = () => {
    if (onPostClick) {
      onPostClick(post);
    }
  };

  return (
    <>
      <Card className="bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={handlePostClick}>
        <CardContent className="p-4">
          {/* Author Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
               <Avatar 
                className="w-12 h-12 ring-2 ring-border shadow-lg cursor-pointer hover:ring-primary transition-all" 
                onClick={(e) => {
                  e.stopPropagation();
                  onAuthorClick?.(post.author.name);
                }}
              >
                <AvatarImage src={post.author.avatar.startsWith('http') ? post.author.avatar : post.author.avatar || generateAvatarFromName(post.author.name)} />
                <AvatarFallback className="bg-primary text-primary-foreground font-bold text-sm">
                  {post.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 
                    className="font-bold text-foreground cursor-pointer hover:text-primary transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAuthorClick?.(post.author.name);
                    }}
                  >
                    {post.author.name}
                  </h3>
                  {post.author.isOfficial && (
                    <Badge className="bg-primary text-primary-foreground text-xs border-0">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Official
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>{post.timestamp}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={12} />
                    <span>{post.location}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Badge className="bg-secondary text-secondary-foreground border border-border font-bold">
              <span className="mr-1 text-sm">{config.icon}</span>
              {post.category}
            </Badge>
          </div>

          {/* Content */}
          <div className="mb-4">
            <p className="text-foreground leading-relaxed">{post.content}</p>
            {post.image && (
              <div className="mt-4 rounded-lg overflow-hidden border border-border">
                <img 
                  src={post.image} 
                  alt="Post content" 
                  className="w-full h-48 object-cover"
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
                onClick={handleLike}
                className={`flex items-center space-x-2 transition-all duration-300 ${
                  isLiked 
                    ? 'text-destructive hover:bg-destructive/10' 
                    : 'text-muted-foreground hover:text-destructive hover:bg-destructive/10'
                }`}
              >
                <Heart 
                  size={18} 
                  className={`transition-all duration-300 ${
                    isLiked ? 'fill-current' : ''
                  }`} 
                />
                <span className="font-bold">{likes}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleComment}
                className="flex items-center space-x-2 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                <MessageCircle size={18} />
                <span className="font-bold">{comments}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="flex items-center space-x-2 text-muted-foreground hover:bg-accent/10 hover:text-accent transition-all duration-300"
              >
                <Share size={18} />
                <span className="font-bold">{shares}</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <CommentsModal 
        isOpen={showComments} 
        onClose={() => setShowComments(false)} 
        postId={post.id}
        onCommentAdded={handleCommentAdded}
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
