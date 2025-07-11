
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, MapPin, Calendar, Users, FileText, Settings, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import EditProfileModal from "@/components/EditProfileModal";

interface ProfileProps {
  onLogout: () => void;
}

const Profile = ({ onLogout }: ProfileProps) => {
  const [activeTab, setActiveTab] = useState("posts");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const { toast } = useToast();

  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    bio: "Community enthusiast and local business owner",
    location: "Thanjavur, Tamil Nadu",
    joinedDate: "Joined March 2024",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    stats: {
      posts: 24,
      communities: 3,
      following: 45
    }
  });

  const myPosts = [
    {
      id: 1,
      title: "Local Market Update",
      content: "New vegetable market opened near the temple...",
      category: "news",
      likes: 12,
      comments: 5,
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Community Clean-up Drive",
      content: "Let's organize a community clean-up this weekend...",
      category: "event",
      likes: 18,
      comments: 8,
      time: "1 day ago"
    }
  ];

  const joinedCommunities = [
    { id: 1, name: "Thanjavur Central", members: 1234, role: "Member" },
    { id: 2, name: "Business Owners", members: 567, role: "Admin" },
    { id: 3, name: "Temple Street", members: 234, role: "Member" }
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    onLogout();
  };

  const handleProfileSave = (updatedProfile: { name: string; avatar: string; location: string }) => {
    setUserProfile(prev => ({
      ...prev,
      name: updatedProfile.name,
      avatar: updatedProfile.avatar,
      location: updatedProfile.location
    }));
  };

  return (
    <>
      <div className="min-h-screen bg-[#FAFAFA] p-4">
        <div className="max-w-md mx-auto pt-8">
          {/* Profile Header */}
          <Card className="mb-6 shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-4 ring-4 ring-[#1E88E5]/20">
                  <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  <AvatarFallback className="bg-gradient-to-r from-[#1E88E5] to-[#43A047] text-white text-lg font-bold">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <h1 className="text-xl font-bold text-[#212121] mb-1">{userProfile.name}</h1>
                <p className="text-[#757575] text-sm mb-2">{userProfile.bio}</p>
                
                <div className="flex items-center text-[#757575] text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {userProfile.location}
                </div>
                
                <div className="flex items-center text-[#757575] text-sm mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  {userProfile.joinedDate}
                </div>
                
                <div className="flex space-x-6 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#212121]">{userProfile.stats.posts}</div>
                    <div className="text-xs text-[#757575]">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#212121]">{userProfile.stats.communities}</div>
                    <div className="text-xs text-[#757575]">Communities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#212121]">{userProfile.stats.following}</div>
                    <div className="text-xs text-[#757575]">Following</div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-[#1E88E5] hover:bg-[#1976D2] text-white"
                  onClick={() => setShowEditProfile(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4 bg-white">
              <TabsTrigger value="posts" className="text-[#212121]">My Posts</TabsTrigger>
              <TabsTrigger value="communities" className="text-[#212121]">Communities</TabsTrigger>
              <TabsTrigger value="settings" className="text-[#212121]">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
              {myPosts.map((post) => (
                <Card key={post.id} className="shadow-md border-0 bg-white">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-[#212121]">{post.title}</h3>
                      <Badge variant="secondary" className="text-xs bg-[#1E88E5]/10 text-[#1E88E5]">
                        {post.category}
                      </Badge>
                    </div>
                    <p className="text-[#757575] text-sm mb-3">{post.content}</p>
                    <div className="flex justify-between items-center text-xs text-[#757575]">
                      <div className="flex space-x-4">
                        <span>❤️ {post.likes}</span>
                        <span>💬 {post.comments}</span>
                      </div>
                      <span>{post.time}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="communities" className="space-y-4">
              {joinedCommunities.map((community) => (
                <Card key={community.id} className="shadow-md border-0 bg-white">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-[#212121]">{community.name}</h3>
                        <p className="text-[#757575] text-sm flex items-center mt-1">
                          <Users className="h-4 w-4 mr-1" />
                          {community.members} members
                        </p>
                      </div>
                      <Badge variant={community.role === 'Admin' ? 'default' : 'secondary'} 
                             className={community.role === 'Admin' ? 'bg-[#43A047] text-white' : 'bg-gray-200 text-[#757575]'}>
                        {community.role}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card className="shadow-md border-0 bg-white">
                <CardContent className="p-4 space-y-4">
                  <Button variant="outline" className="w-full justify-start border-gray-300 text-[#212121] hover:bg-gray-50">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-300 text-[#212121] hover:bg-gray-50">
                    <FileText className="h-4 w-4 mr-2" />
                    Privacy Policy
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start bg-red-500 hover:bg-red-600 text-white"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        currentProfile={{
          name: userProfile.name,
          avatar: userProfile.avatar,
          location: userProfile.location
        }}
        onSave={handleProfileSave}
      />
    </>
  );
};

export default Profile;
