
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

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
}

const PostCard = ({ post }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);

  const categoryConfig = {
    alert: { color: "bg-red-100 text-red-700", icon: "🔌" },
    event: { color: "bg-blue-100 text-blue-700", icon: "🎉" },
    scheme: { color: "bg-green-100 text-green-700", icon: "🎁" },
    weather: { color: "bg-orange-100 text-orange-700", icon: "🌦️" },
    news: { color: "bg-purple-100 text-purple-700", icon: "📣" }
  };

  const config = categoryConfig[post.category as keyof typeof categoryConfig] || 
    { color: "bg-gray-100 text-gray-700", icon: "📝" };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  const handleComment = () => {
    toast.info("Comments feature coming soon!");
  };

  const handleShare = () => {
    toast.success("Link copied to clipboard!");
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
      <CardContent className="p-4">
        {/* Author Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.author.avatar.startsWith('http') ? post.author.avatar : undefined} />
              <AvatarFallback className="bg-gradient-to-br from-community-blue to-community-purple text-white">
                {post.author.avatar.startsWith('http') ? 
                  post.author.name.split(' ').map(n => n[0]).join('') : 
                  post.author.avatar
                }
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                {post.author.isOfficial && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                    ✓ Official
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-3 text-xs text-gray-500">
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
          
          <Badge className={`${config.color} border-0 font-medium`}>
            <span className="mr-1">{config.icon}</span>
            {post.category}
          </Badge>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-gray-800 leading-relaxed">{post.content}</p>
          {post.image && (
            <div className="mt-3 rounded-lg overflow-hidden">
              <img 
                src={post.image} 
                alt="Post content" 
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 hover:bg-pink-50 ${
                isLiked ? 'text-pink-600' : 'text-gray-600'
              }`}
            >
              <Heart 
                size={18} 
                className={`transition-all duration-200 ${
                  isLiked ? 'fill-current text-pink-600 scale-110' : ''
                }`} 
              />
              <span className="text-sm font-medium">{likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleComment}
              className="flex items-center space-x-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            >
              <MessageCircle size={18} />
              <span className="text-sm font-medium">{post.comments}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="flex items-center space-x-2 text-gray-600 hover:bg-green-50 hover:text-green-600"
            >
              <Share size={18} />
              <span className="text-sm font-medium">{post.shares}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
