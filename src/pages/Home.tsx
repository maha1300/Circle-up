
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for posts
  const posts = [
    {
      id: 1,
      author: {
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face"
      },
      content: "🚨 Power cut scheduled in Anna Nagar from 10 AM to 2 PM today for maintenance work. Please plan accordingly!",
      category: "alert",
      timestamp: "2 hours ago",
      location: "Anna Nagar, Chennai",
      likes: 23,
      comments: 5,
      shares: 12,
      isLiked: false
    },
    {
      id: 2,
      author: {
        name: "Raj Kumar",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      },
      content: "🎉 Community temple festival this Saturday! Everyone is invited to join the celebrations. Food stalls and cultural programs starting at 6 PM.",
      category: "event",
      timestamp: "4 hours ago",
      location: "Thanjavur",
      likes: 47,
      comments: 12,
      shares: 8,
      isLiked: true,
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=500&h=300&fit=crop"
    },
    {
      id: 3,
      author: {
        name: "Tamil Nadu Govt",
        avatar: "🏛️",
        isOfficial: true
      },
      content: "📢 New subsidy scheme for solar panels launched! Apply online before March 31st. Up to ₹50,000 subsidy available for residential installations.",
      category: "scheme",
      timestamp: "6 hours ago",
      location: "Tamil Nadu",
      likes: 156,
      comments: 34,
      shares: 89,
      isLiked: false
    },
    {
      id: 4,
      author: {
        name: "Dr. Lakshmi",
        avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face"
      },
      content: "🌦️ Heavy rain expected this weekend. Please avoid waterlogged areas and stay safe. Emergency helpline: 1077",
      category: "weather",
      timestamp: "8 hours ago",
      location: "Trichy",
      likes: 67,
      comments: 15,
      shares: 25,
      isLiked: true
    }
  ];

  const filteredPosts = selectedCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Good morning! 👋</h1>
              <p className="text-gray-600">What's happening in your community</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2"
            >
              <span className={`text-xl ${isRefreshing ? 'animate-spin' : ''}`}>🔄</span>
            </Button>
          </div>
          
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-community-blue/10 to-community-purple/10 border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🏘️</div>
              <div className="text-2xl font-bold text-community-blue">3</div>
              <div className="text-sm text-gray-600">Communities</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-community-green/10 to-community-blue/10 border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🔔</div>
              <div className="text-2xl font-bold text-community-green">7</div>
              <div className="text-sm text-gray-600">New Alerts</div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <Card className="p-8 text-center bg-white/50">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600">Be the first to share something with your community!</p>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>

        {/* Loading animation when refreshing */}
        {isRefreshing && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4">
                <div className="animate-pulse">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
