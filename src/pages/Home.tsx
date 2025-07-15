
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";
import { useUser } from "@/contexts/UserContext";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { allPosts } = useUser();

  const filteredPosts = selectedCategory === "all" 
    ? allPosts 
    : allPosts.filter(post => post.category === selectedCategory);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Good morning! 👋</h1>
              <p className="text-muted-foreground">What's happening in your community</p>
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
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🏘️</div>
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Communities</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-secondary/10 to-primary/10 border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🔔</div>
              <div className="text-2xl font-bold text-secondary">7</div>
              <div className="text-sm text-muted-foreground">New Alerts</div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <Card className="p-8 text-center bg-card/50 shadow-md">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No posts yet</h3>
              <p className="text-muted-foreground">Be the first to share something with your community!</p>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <PostCard key={post.id} post={{
                ...post,
                isLiked: post.isLiked ?? false,
                author: {
                  name: post.authorName || "Community Member",
                  avatar: post.authorName?.charAt(0).toUpperCase() || "C"
                },
                timestamp: post.time,
                location: post.location || "Local Area"
              }} />
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
                    <div className="w-10 h-10 bg-card-bg rounded-full"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-card-bg rounded w-1/3"></div>
                      <div className="h-3 bg-card-bg rounded w-1/4"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-card-bg rounded"></div>
                    <div className="h-4 bg-card-bg rounded w-5/6"></div>
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
