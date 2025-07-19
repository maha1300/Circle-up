
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, MapPin, Calendar, Users, Settings, LogOut, UserMinus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import EditProfileModal from "@/components/EditProfileModal";
import AccountSettings from "@/components/AccountSettings";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [followingList, setFollowingList] = useState([
    { id: 1, name: "Dr. Lakshmi", location: "Trichy", avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face" },
    { id: 2, name: "Raj Kumar", location: "Thanjavur", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    { id: 3, name: "Priya Sharma", location: "Chennai", avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face" }
  ]);
  const { toast } = useToast();
  const { user, updateUser, logout } = useUser();

  if (!user) return null;

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
    logout();
  };

  const handleProfileSave = (updatedProfile: { name: string; avatar: string; location: string; bio?: string }) => {
    updateUser({
      name: updatedProfile.name,
      avatar: updatedProfile.avatar,
      location: updatedProfile.location,
      bio: updatedProfile.bio || user.bio
    });
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleUnfollow = (personId: number) => {
    setFollowingList(prev => prev.filter(person => person.id !== personId));
    toast({
      title: "Unfollowed",
      description: "You have unfollowed this person.",
    });
  };

  return (
    <>
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto pt-8">
          {/* Profile Header */}
          <Card className="mb-6 shadow-lg bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-4 ring-4 ring-border">
                  <AvatarImage src={user.avatar.startsWith('http') ? user.avatar : undefined} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <h1 className="text-xl font-bold text-foreground mb-1">{user.name}</h1>
                <p className="text-muted-foreground text-sm mb-2">{user.bio}</p>
                
                <div className="flex items-center text-muted-foreground text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {user.location}
                </div>
                
                <div className="flex items-center text-muted-foreground text-sm mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  {user.joinedDate}
                </div>
                
                <div className="flex space-x-6 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{user.stats.posts}</div>
                    <div className="text-xs text-muted-foreground">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{user.stats.communities}</div>
                    <div className="text-xs text-muted-foreground">Communities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{followingList.length}</div>
                    <div className="text-xs text-muted-foreground">Following</div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
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
            <TabsList className="grid w-full grid-cols-5 mb-4 bg-card border border-border">
              <TabsTrigger value="posts" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Posts</TabsTrigger>
              <TabsTrigger value="communities" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Communities</TabsTrigger>
              <TabsTrigger value="following" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Following</TabsTrigger>
              <TabsTrigger value="followers" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Followers</TabsTrigger>
              <TabsTrigger value="settings" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
              {user.posts.length === 0 ? (
                <Card className="p-8 text-center bg-card/50">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No posts yet</h3>
                  <p className="text-muted-foreground">Start sharing with your community!</p>
                </Card>
              ) : (
                user.posts.map((post) => (
                  <Card key={post.id} className="shadow-md bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-foreground">{post.title}</h3>
                        <Badge variant="secondary" className="text-xs bg-secondary text-secondary-foreground">
                          {post.category}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{post.content}</p>
                      {post.image && (
                        <img src={post.image} alt="Post" className="w-full h-48 object-cover rounded-md mb-3" />
                      )}
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
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
            </TabsContent>

            <TabsContent value="communities" className="space-y-4">
              {joinedCommunities.map((community) => (
                <Card 
                  key={community.id} 
                  className="shadow-md bg-card border-border cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => window.location.href = `/community/${community.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground">{community.name}</h3>
                        <p className="text-muted-foreground text-sm flex items-center mt-1">
                          <Users className="h-4 w-4 mr-1" />
                          {community.members} members
                        </p>
                      </div>
                      <Badge variant={community.role === 'Admin' ? 'default' : 'secondary'} 
                             className={community.role === 'Admin' ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'}>
                        {community.role}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="following" className="space-y-4">
              {followingList.map((person) => (
                <Card key={person.id} className="shadow-md bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar 
                        className="h-12 w-12 cursor-pointer" 
                        onClick={() => window.location.href = `/profile/${person.id}`}
                      >
                        <AvatarImage src={person.avatar} alt={person.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div 
                        className="flex-1 cursor-pointer" 
                        onClick={() => window.location.href = `/profile/${person.id}`}
                      >
                        <h3 className="font-semibold text-foreground">{person.name}</h3>
                        <p className="text-muted-foreground text-sm flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {person.location}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-border text-foreground hover:bg-secondary"
                        onClick={() => handleUnfollow(person.id)}
                      >
                        <UserMinus className="h-3 w-3 mr-1" />
                        Unfollow
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="followers" className="space-y-4">
              {/* Mock followers data */}
              {[
                { id: 1, name: "Alice Johnson", location: "Chennai", avatar: "https://images.unsplash.com/photo-1494790108755-2616b9fb0ce4?w=100&h=100&fit=crop&crop=face" },
                { id: 2, name: "Bob Wilson", location: "Coimbatore", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" }
              ].map((follower) => (
                <Card key={follower.id} className="shadow-md bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar 
                        className="h-12 w-12 cursor-pointer"
                        onClick={() => window.location.href = `/profile/${follower.id}`}
                      >
                        <AvatarImage src={follower.avatar} alt={follower.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {follower.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => window.location.href = `/profile/${follower.id}`}
                      >
                        <h3 className="font-semibold text-foreground">{follower.name}</h3>
                        <p className="text-muted-foreground text-sm flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {follower.location}
                        </p>
                      </div>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Following
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card className="shadow-md bg-card border-border">
                <CardContent className="p-4 space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-border text-foreground hover:bg-secondary"
                    onClick={() => setShowAccountSettings(true)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start bg-destructive hover:bg-destructive/90 text-destructive-foreground"
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
          name: user.name,
          avatar: user.avatar,
          location: user.location,
          bio: user.bio
        }}
        onSave={handleProfileSave}
      />

      <AccountSettings
        isOpen={showAccountSettings}
        onClose={() => setShowAccountSettings(false)}
      />
    </>
  );
};

export default Profile;
