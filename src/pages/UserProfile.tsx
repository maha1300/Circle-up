import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Users, UserPlus, UserMinus, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import PostCard from '@/components/PostCard';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  // Mock user data - in a real app, this would be fetched based on userId
  const mockUser = {
    id: userId,
    name: "Priya Sharma",
    bio: "Community volunteer and local business owner",
    location: "Anna Nagar, Chennai",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
    joinedDate: "Joined March 2023",
    stats: {
      posts: 42,
      communities: 5,
      followers: 128,
      following: 67
    },
    posts: [
      {
        id: 1,
        author: {
          id: userId,
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
      }
    ]
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: `You ${isFollowing ? 'unfollowed' : 'are now following'} ${mockUser.name}`,
    });
  };

  const handleAuthorClick = (authorName: string, authorId?: string) => {
    if (authorId && authorId !== userId) {
      navigate(`/profile/${authorId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 text-foreground hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Profile Header */}
        <Card className="mb-6 shadow-lg bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-4 ring-4 ring-border">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <h1 className="text-xl font-bold text-foreground mb-1">{mockUser.name}</h1>
              <p className="text-muted-foreground text-sm mb-2">{mockUser.bio}</p>
              
              <div className="flex items-center text-muted-foreground text-sm mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {mockUser.location}
              </div>
              
              <div className="flex items-center text-muted-foreground text-sm mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                {mockUser.joinedDate}
              </div>
              
              <div className="flex space-x-6 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{mockUser.stats.posts}</div>
                  <div className="text-xs text-muted-foreground">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{mockUser.stats.followers}</div>
                  <div className="text-xs text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{mockUser.stats.following}</div>
                  <div className="text-xs text-muted-foreground">Following</div>
                </div>
              </div>
              
              <Button 
                className={`w-full ${isFollowing ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                onClick={handleFollow}
              >
                {isFollowing ? (
                  <>
                    <UserMinus className="h-4 w-4 mr-2" />
                    Unfollow
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-card border border-border">
            <TabsTrigger value="posts" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Posts</TabsTrigger>
            <TabsTrigger value="communities" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Communities</TabsTrigger>
            <TabsTrigger value="about" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">About</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            {mockUser.posts.length === 0 ? (
              <Card className="p-8 text-center bg-card/50">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No posts yet</h3>
                <p className="text-muted-foreground">This user hasn't shared anything yet.</p>
              </Card>
            ) : (
              mockUser.posts.map((post) => (
                <PostCard key={post.id} post={post} onAuthorClick={handleAuthorClick} />
              ))
            )}
          </TabsContent>

          <TabsContent value="communities" className="space-y-4">
            <Card className="p-8 text-center bg-card/50">
              <div className="text-6xl mb-4">🏘️</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Communities</h3>
              <p className="text-muted-foreground">Member of 5 communities</p>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <Card className="shadow-md bg-card border-border">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-3">About</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {mockUser.location}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {mockUser.joinedDate}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    Active community member
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;