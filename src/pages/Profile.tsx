
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
  const { toast } = useToast();
  const { user, updateUser, logout, unfollowUser } = useUser();

  if (!user) return null;

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

  const handleUnfollow = (personId: string) => {
    unfollowUser(personId);
    toast({
      title: "Unfollowed",
      description: "You have unfollowed this person.",
    });
  };

  return (
    <>
      <div className="min-h-screen bg-app-bg p-4">
        <div className="max-w-md mx-auto pt-8">
          {/* Profile Header */}
          <Card className="mb-6 shadow-lg bg-card-bg border-border-color">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                 <Avatar className="h-20 w-20 mb-4 ring-4 ring-primary/20">
                   <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                     {user.name.charAt(0).toUpperCase()}
                   </AvatarFallback>
                 </Avatar>
                
                <h1 className="text-xl font-bold text-input-text mb-1">{user.name}</h1>
                <p className="text-body-text text-sm mb-2">{user.bio || "Not added yet"}</p>
                
                <div className="flex items-center text-body-text text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {user.location || "Not added yet"}
                </div>
                
                <div className="flex items-center text-body-text text-sm mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  {user.joinedDate}
                </div>
                
                <div className="flex space-x-6 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-input-text">{user.stats.posts}</div>
                    <div className="text-xs text-body-text">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-input-text">{user.stats.communities}</div>
                    <div className="text-xs text-body-text">Communities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-input-text">{user.stats.followers}</div>
                    <div className="text-xs text-body-text">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-input-text">{user.stats.following}</div>
                    <div className="text-xs text-body-text">Following</div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-primary-green hover:bg-primary-green/90 text-white"
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
            <TabsList className="grid w-full grid-cols-5 mb-4 bg-card-bg border border-border-color">
              <TabsTrigger value="posts" className="text-input-text data-[state=active]:bg-primary-green data-[state=active]:text-white">Posts</TabsTrigger>
              <TabsTrigger value="communities" className="text-input-text data-[state=active]:bg-primary-green data-[state=active]:text-white">Communities</TabsTrigger>
              <TabsTrigger value="followers" className="text-input-text data-[state=active]:bg-primary-green data-[state=active]:text-white">Followers</TabsTrigger>
              <TabsTrigger value="following" className="text-input-text data-[state=active]:bg-primary-green data-[state=active]:text-white">Following</TabsTrigger>
              <TabsTrigger value="settings" className="text-input-text data-[state=active]:bg-primary-green data-[state=active]:text-white">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
              {user.posts.length === 0 ? (
                <Card className="p-8 text-center bg-card-bg/50">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-lg font-semibold text-input-text mb-2">No posts yet</h3>
                  <p className="text-body-text">Start sharing with your community!</p>
                </Card>
              ) : (
                user.posts.map((post) => (
                  <Card key={post.id} className="shadow-md bg-card-bg border-border-color">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-input-text">{post.title}</h3>
                        <Badge variant="secondary" className="text-xs bg-floating-green/20 text-input-text">
                          {post.category}
                        </Badge>
                      </div>
                      <p className="text-body-text text-sm mb-3">{post.content}</p>
                      {post.image && (
                        <img src={post.image} alt="Post" className="w-full h-48 object-cover rounded-md mb-3" />
                      )}
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
            </TabsContent>

            <TabsContent value="communities" className="space-y-4">
              {user.communities.map((community) => (
                <Card key={community.id} className="shadow-md bg-card-bg border-border-color">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-input-text">{community.name}</h3>
                        <p className="text-body-text text-sm flex items-center mt-1">
                          <Users className="h-4 w-4 mr-1" />
                          {community.members} members
                        </p>
                        {community.description && (
                          <p className="text-body-text text-sm mt-1">{community.description}</p>
                        )}
                      </div>
                      <Badge variant={community.role === 'Admin' ? 'default' : 'secondary'} 
                             className={community.role === 'Admin' ? 'bg-floating-green text-white' : 'bg-floating-green/20 text-input-text'}>
                        {community.role}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="followers" className="space-y-4">
              {user.followers.map((follower) => (
                <Card key={follower.id} className="shadow-md bg-card-bg border-border-color">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={follower.avatar} alt={follower.name} />
                        <AvatarFallback className="bg-primary-green text-white">
                          {follower.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-input-text">{follower.name}</h3>
                        <p className="text-body-text text-sm flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {follower.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="following" className="space-y-4">
              {user.following.map((person) => (
                <Card key={person.id} className="shadow-md bg-card-bg border-border-color">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={person.avatar} alt={person.name} />
                        <AvatarFallback className="bg-primary-green text-white">
                          {person.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-input-text">{person.name}</h3>
                        <p className="text-body-text text-sm flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {person.location}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-border-color text-input-text hover:bg-floating-green/20"
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

            <TabsContent value="settings" className="space-y-4">
              <Card className="shadow-md bg-card-bg border-border-color">
                <CardContent className="p-4 space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-border-color text-input-text hover:bg-floating-green/20"
                    onClick={() => setShowAccountSettings(true)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
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
