import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MapPin, Calendar, Plus, Bell, Share } from "lucide-react";
import PostCard from "@/components/PostCard";
import { useToast } from "@/hooks/use-toast";

const CommunityDetail = () => {
  const { id } = useParams();
  const [isJoined, setIsJoined] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const { toast } = useToast();

  const community = {
    id: 1,
    name: "Thanjavur Central",
    description: "Connect with neighbors and stay updated with local news, events, and community activities in Thanjavur Central area.",
    members: 1234,
    location: "Thanjavur Central, Tamil Nadu",
    image: "/placeholder.svg",
    category: "Residential",
    established: "2023"
  };

  const posts = [
    {
      id: 1,
      author: {
        name: "Raj Kumar",
        avatar: "/placeholder.svg",
        isOfficial: false
      },
      timestamp: "2 hours ago",
      content: "New vegetable market opened near the temple with fresh produce daily. Great prices and quality!",
      image: "/placeholder.svg",
      category: "news",
      likes: 12,
      comments: 5,
      shares: 2,
      location: "Thanjavur Central",
      isLiked: false
    },
    {
      id: 2,
      author: {
        name: "Priya Sharma",
        avatar: "/placeholder.svg",
        isOfficial: false
      },
      timestamp: "5 hours ago",
      content: "Community clean-up drive this Saturday at 7 AM. Let's make our neighborhood beautiful together! 🌟",
      category: "event",
      likes: 24,
      comments: 8,
      shares: 4,
      location: "Thanjavur Central",
      isLiked: false
    }
  ];

  const events = [
    {
      id: 1,
      title: "Community Clean-up Drive",
      date: "This Saturday, 7:00 AM",
      location: "Temple Street",
      attendees: 45,
      description: "Join us for a community clean-up drive to make our neighborhood beautiful."
    },
    {
      id: 2,
      title: "Monthly Community Meeting",
      date: "Next Sunday, 6:00 PM",
      location: "Community Hall",
      attendees: 23,
      description: "Discuss community issues and upcoming projects."
    }
  ];

  const schemes = [
    {
      id: 1,
      title: "Solar Panel Subsidy",
      description: "Government subsidy for solar panel installation in residential areas.",
      deadline: "Dec 31, 2024",
      status: "Active"
    },
    {
      id: 2,
      title: "Street Light Maintenance",
      description: "Monthly street light maintenance program by local authorities.",
      deadline: "Ongoing",
      status: "Active"
    }
  ];

  const handleJoin = () => {
    setIsJoined(!isJoined);
    toast({
      title: isJoined ? "Left community" : "Joined community!",
      description: isJoined 
        ? `You have left ${community.name}` 
        : `Welcome to ${community.name}! You'll now receive updates.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Community Header */}
        <Card className="mb-6 shadow-lg border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 ring-4 ring-community-blue/20">
                <AvatarImage src={community.image} alt={community.name} />
                <AvatarFallback className="bg-gradient-to-r from-community-blue to-community-purple text-white text-lg font-bold">
                  {community.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-slate-800">{community.name}</h1>
                <div className="flex items-center text-slate-600 text-sm mt-1">
                  <Users className="h-4 w-4 mr-1" />
                  {community.members} members
                </div>
                <div className="flex items-center text-slate-600 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {community.location}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-slate-600 text-sm mb-4">{community.description}</p>
            <div className="flex space-x-2 mb-4">
              <Badge variant="secondary">{community.category}</Badge>
              <Badge variant="outline">Est. {community.established}</Badge>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={handleJoin}
                className={`flex-1 ${isJoined 
                  ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' 
                  : 'bg-gradient-to-r from-community-blue to-community-purple hover:from-community-blue/90 hover:to-community-purple/90 text-white'
                } transition-all duration-200`}
              >
                {isJoined ? (
                  <>
                    <Users className="h-4 w-4 mr-2" />
                    Joined
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Join
                  </>
                )}
              </Button>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="schemes">Schemes</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            {events.map((event) => (
              <Card key={event.id} className="shadow-md border-0">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-slate-800">{event.title}</h3>
                    <Badge className="bg-blue-100 text-blue-700">🎉 Event</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {event.attendees} attending
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mt-3">{event.description}</p>
                  <Button size="sm" className="mt-3 bg-community-blue hover:bg-community-blue/90">
                    Join Event
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold text-slate-400 mb-2">No news updates</h3>
              <p className="text-slate-400">Community news will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="schemes" className="space-y-4">
            {schemes.map((scheme) => (
              <Card key={scheme.id} className="shadow-md border-0">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-slate-800">{scheme.title}</h3>
                    <Badge className="bg-green-100 text-green-700">🎁 {scheme.status}</Badge>
                  </div>
                  <p className="text-slate-600 text-sm mb-3">{scheme.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Deadline: {scheme.deadline}</span>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityDetail;
