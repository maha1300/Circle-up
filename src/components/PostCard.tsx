
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, MapPin, Clock, Sparkles } from "lucide-react";
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
    alert: { 
      gradient: "from-red-500 via-orange-500 to-amber-500", 
      icon: "⚡", 
      bgColor: "bg-gradient-to-r from-red-50 to-orange-50",
      textColor: "text-red-700"
    },
    event: { 
      gradient: "from-blue-500 via-cyan-500 to-teal-500", 
      icon: "🎊", 
      bgColor: "bg-gradient-to-r from-blue-50 to-cyan-50",
      textColor: "text-blue-700"
    },
    scheme: { 
      gradient: "from-green-500 via-emerald-500 to-lime-500", 
      icon: "🎁", 
      bgColor: "bg-gradient-to-r from-green-50 to-emerald-50",
      textColor: "text-green-700"
    },
    weather: { 
      gradient: "from-orange-500 via-amber-500 to-rose-500", 
      icon: "🌈", 
      bgColor: "bg-gradient-to-r from-orange-50 to-amber-50",
      textColor: "text-orange-700"
    },
    news: { 
      gradient: "from-purple-500 via-violet-500 to-indigo-500", 
      icon: "📢", 
      bgColor: "bg-gradient-to-r from-purple-50 to-violet-50",
      textColor: "text-purple-700"
    }
  };

  const config = categoryConfig[post.category as keyof typeof categoryConfig] || 
    { 
      gradient: "from-slate-500 to-slate-600", 
      icon: "📝", 
      bgColor: "bg-gradient-to-r from-slate-50 to-gray-50",
      textColor: "text-slate-700"
    };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? "💔 Removed from favorites" : "❤️ Added to favorites");
  };

  const handleComment = () => {
    toast.info("💬 Comments feature coming soon!");
  };

  const handleShare = () => {
    toast.success("🔗 Link copied to clipboard!");
  };

  return (
    <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in hover:scale-[1.02] overflow-hidden">
      <div className={`h-1 w-full bg-gradient-to-r ${config.gradient}`}></div>
      <CardContent className="p-5">
        {/* Author Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12 ring-2 ring-white shadow-lg">
              <AvatarImage src={post.author.avatar.startsWith('http') ? post.author.avatar : undefined} />
              <AvatarFallback className={`bg-gradient-to-br ${config.gradient} text-white font-bold`}>
                {post.author.avatar.startsWith('http') ? 
                  post.author.name.split(' ').map(n => n[0]).join('') : 
                  post.author.avatar
                }
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-slate-800">{post.author.name}</h3>
                {post.author.isOfficial && (
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs border-0 animate-pulse-soft">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Official
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-4 text-xs text-slate-500">
                <div className="flex items-center space-x-1">
                  <Clock size={12} className="text-community-blue" />
                  <span>{post.timestamp}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin size={12} className="text-community-green" />
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
          <p className="text-slate-700 leading-relaxed font-medium">{post.content}</p>
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
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-all duration-300 ${
                isLiked 
                  ? 'text-pink-600 bg-pink-50 hover:bg-pink-100 animate-bounce-gentle' 
                  : 'text-slate-600 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              <Heart 
                size={18} 
                className={`transition-all duration-300 ${
                  isLiked ? 'fill-current text-pink-600 scale-125' : ''
                }`} 
              />
              <span className="font-bold">{likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleComment}
              className="flex items-center space-x-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
            >
              <MessageCircle size={18} />
              <span className="font-bold">{post.comments}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="flex items-center space-x-2 text-slate-600 hover:bg-green-50 hover:text-green-600 transition-all duration-300"
            >
              <Share size={18} />
              <span className="font-bold">{post.shares}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
