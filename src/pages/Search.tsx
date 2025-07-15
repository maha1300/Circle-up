
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search as SearchIcon, MapPin, Clock, Users } from "lucide-react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All', icon: '📱' },
    { id: 'posts', label: 'Posts', icon: '📝' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'communities', label: 'Communities', icon: '🏘️' },
    { id: 'locations', label: 'Locations', icon: '📍' }
  ];

  const searchResults = [
    {
      id: 1,
      type: 'post',
      title: 'Local Market Update',
      content: 'New vegetable market opened near the temple with fresh produce and affordable prices for the community.',
      author: 'John Doe',
      location: 'Thanjavur Central',
      time: '2 hours ago',
      category: 'news',
      likes: 12,
      comments: 5
    },
    {
      id: 2,
      type: 'user',
      name: 'Priya Sharma',
      username: '@priya_sharma',
      location: 'Chennai, Tamil Nadu',
      followers: 156,
      bio: 'Community enthusiast and local advocate',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      type: 'community',
      name: 'Thanjavur Central Community',
      members: 1234,
      description: 'Local community for Thanjavur Central residents sharing updates and events',
      category: 'local',
      logo: '🏘️'
    },
    {
      id: 4,
      type: 'location',
      name: 'Anna Nagar',
      city: 'Chennai',
      posts: 45,
      communities: 3,
      description: 'Residential area in Chennai with active community participation'
    },
    {
      id: 5,
      type: 'user',
      name: 'Rajesh Kumar',
      username: '@rajesh_kumar',
      location: 'Thanjavur, Tamil Nadu',
      followers: 89,
      bio: 'Local business owner and community member'
    },
    {
      id: 6,
      type: 'community',
      name: 'Chennai Tech Community',
      members: 567,
      description: 'Technology enthusiasts and professionals in Chennai',
      category: 'tech',
      logo: '💻'
    }
  ];

  const filteredResults = searchResults.filter(result => {
    const matchesSearch = 
      (result.type === 'post' && (result.title.toLowerCase().includes(searchQuery.toLowerCase()) || result.content.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (result.type === 'user' && (result.name.toLowerCase().includes(searchQuery.toLowerCase()) || result.username.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (result.type === 'community' && result.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (result.type === 'location' && (result.name.toLowerCase().includes(searchQuery.toLowerCase()) || result.city.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'posts' && result.type === 'post') ||
      (selectedFilter === 'users' && result.type === 'user') ||
      (selectedFilter === 'communities' && result.type === 'community') ||
      (selectedFilter === 'locations' && result.type === 'location');
    
    return matchesSearch && matchesFilter;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'alert': return 'bg-red-100 text-red-700';
      case 'event': return 'bg-blue-100 text-blue-700';
      case 'scheme': return 'bg-green-100 text-green-700';
      case 'news': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderResult = (result: any) => {
    switch (result.type) {
      case 'post':
        return (
          <Card key={result.id} className="shadow-md border-0 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3 flex-1">
                 <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {result.author.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{result.title}</h3>
                    <p className="text-xs text-muted-foreground">{result.author}</p>
                  </div>
                </div>
                <Badge className={`${getCategoryColor(result.category)} text-xs`}>
                  {result.category}
                </Badge>
              </div>
              
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{result.content}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {result.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {result.time}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <span>❤️ {result.likes}</span>
                  <span>💬 {result.comments}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'user':
        return (
          <Card key={result.id} className="shadow-md border-0 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={result.avatar} alt={result.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {result.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{result.name}</h3>
                  <p className="text-sm text-muted-foreground">{result.username}</p>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {result.location}
                  </p>
                  <p className="text-xs text-muted-foreground">{result.followers} followers</p>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Follow
                </Button>
              </div>
              {result.bio && (
                <p className="text-sm text-muted-foreground mt-3">{result.bio}</p>
              )}
            </CardContent>
          </Card>
        );

      case 'community':
        return (
          <Card key={result.id} className="shadow-md border-0 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-2xl">
                  {result.logo}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{result.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {result.members} members
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{result.description}</p>
                </div>
                <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  Join
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'location':
        return (
          <Card key={result.id} className="shadow-md border-0 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{result.name}</h3>
                  <p className="text-sm text-muted-foreground">{result.city}</p>
                  <p className="text-xs text-muted-foreground mt-1">{result.description}</p>
                  <div className="flex space-x-4 mt-2 text-xs text-muted-foreground">
                    <span>{result.posts} posts</span>
                    <span>{result.communities} communities</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Search
          </h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts, users, communities, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-border focus:border-primary bg-background text-foreground"
            />
          </div>
          
          {/* Filters */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center space-x-2 whitespace-nowrap transition-all duration-200 ${
                  selectedFilter === filter.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "hover:bg-secondary/20 text-foreground"
                }`}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        <div className="space-y-4">
          {filteredResults.length > 0 ? (
            filteredResults.map(renderResult)
          ) : (
            <div className="text-center py-12">
              <SearchIcon className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                {searchQuery ? 'No results found' : 'Start searching'}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery ? 'Try different keywords or filters' : 'Search for posts, users, communities and locations'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
