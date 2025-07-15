
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, UserPlus, UserMinus } from "lucide-react";
import PostCard from "./PostCard";

interface UserProfileProps {
  userId: string;
  onBack: () => void;
}

const UserProfile = ({ userId, onBack }: UserProfileProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock user data - in real app, this would come from API
  const userData = {
    id: userId,
    name: "John Doe",
    bio: "Community enthusiast and local advocate",
    location: "Chennai, Tamil Nadu",
    joinedDate: "Joined March 2024",
    avatar: "",
    stats: {
      posts: 12,
      followers: 156,
      following: 89
    },
    posts: [
      {
        id: 1,
        title: "Local Market Update",
        content: "Great deals at the morning market today! Fresh vegetables and fruits available.",
        category: "news",
        likes: 23,
        comments: 5,
        time: "2 hours ago"
      }
    ]
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="min-h-screen bg-app-bg p-4">
      <div className="max-w-md mx-auto pt-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          ← Back
        </Button>

        {/* Profile Header */}
        <Card className="mb-6 shadow-lg bg-card-bg border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-4 ring-4 ring-primary-green/20">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="bg-primary-green text-white text-lg font-bold">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <h1 className="text-xl font-bold text-input-text mb-1">{userData.name}</h1>
              <p className="text-body-text text-sm mb-2">@{userData.id}</p>
              <p className="text-body-text text-sm mb-2">{userData.bio}</p>
              
              <div className="flex items-center text-body-text text-sm mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {userData.location}
              </div>
              
              <div className="flex items-center text-body-text text-sm mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                {userData.joinedDate}
              </div>
              
              <div className="flex space-x-6 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-input-text">{userData.stats.posts}</div>
                  <div className="text-xs text-body-text">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-input-text">{userData.stats.followers}</div>
                  <div className="text-xs text-body-text">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-input-text">{userData.stats.following}</div>
                  <div className="text-xs text-body-text">Following</div>
                </div>
              </div>
              
              <Button 
                className={`w-full ${isFollowing ? 'bg-floating-green hover:bg-floating-green/90' : 'bg-primary-green hover:bg-primary-green/90'} text-white`}
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

        {/* User Posts */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-input-text">Posts</h2>
          {userData.posts.length === 0 ? (
            <Card className="p-8 text-center bg-card-bg/50">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-input-text mb-2">No posts yet</h3>
              <p className="text-body-text">This user hasn't shared anything yet.</p>
            </Card>
          ) : (
            userData.posts.map((post) => (
              <Card key={post.id} className="shadow-md bg-card-bg border-border">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-input-text">{post.title}</h3>
                    <Badge variant="secondary" className="text-xs bg-floating-green/20 text-input-text">
                      {post.category}
                    </Badge>
                  </div>
                  <p className="text-body-text text-sm mb-3">{post.content}</p>
                  <div className="flex justify-between items-center text-xs text-body-text">
                    <div className="flex space-x-4">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                    <span>{post.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
