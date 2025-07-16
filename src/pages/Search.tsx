
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search as SearchIcon, Filter, MapPin, Clock } from "lucide-react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All', icon: '📱' },
    { id: 'posts', label: 'Posts', icon: '📝' },
    { id: 'events', label: 'Events', icon: '🎉' },
    { id: 'schemes', label: 'Schemes', icon: '🎁' },
    { id: 'alerts', label: 'Alerts', icon: '🔌' }
  ];

  const searchResults = [
    {
      id: 1,
      type: 'post',
      title: 'Local Market Update',
      content: 'New vegetable market opened near the temple with fresh produce...',
      author: 'John Doe',
      location: 'Thanjavur Central',
      time: '2 hours ago',
      category: 'news',
      likes: 12,
      comments: 5
    },
    {
      id: 2,
      type: 'event',
      title: 'Community Clean-up Drive',
      content: 'Join us this Saturday for a community clean-up drive starting at 7 AM...',
      author: 'Community Admin',
      location: 'Temple Street',
      time: '1 day ago',
      category: 'event',
      likes: 24,
      comments: 8
    },
    {
      id: 3,
      type: 'scheme',
      title: 'Solar Panel Subsidy',
      content: 'Government announces new solar panel subsidy scheme for residential areas...',
      author: 'Government Official',
      location: 'Thanjavur District',
      time: '2 days ago',
      category: 'scheme',
      likes: 45,
      comments: 12
    },
    {
      id: 4,
      type: 'alert',
      title: 'Power Cut Alert',
      content: 'Scheduled power cut tomorrow from 10 AM to 2 PM in the following areas...',
      author: 'TNEB Official',
      location: 'Multiple Areas',
      time: '3 hours ago',
      category: 'alert',
      likes: 8,
      comments: 3
    }
  ];

  const filteredResults = searchResults.filter(result => {
    const matchesSearch = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         result.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || result.type === selectedFilter.slice(0, -1);
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'alert': return '🔌';
      case 'event': return '🎉';
      case 'scheme': return '🎁';
      case 'news': return '📣';
      default: return '📱';
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
              placeholder="Search users, locations, communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-border focus:border-primary text-foreground"
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
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
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
            filteredResults.map((result) => (
              <Card key={result.id} className="bg-card border border-border shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3 flex-1">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt={result.author} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {result.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{result.title}</h3>
                        <p className="text-xs text-muted-foreground">{result.author}</p>
                      </div>
                    </div>
                    <Badge className="bg-secondary text-secondary-foreground text-xs border border-border">
                      {getCategoryIcon(result.category)} {result.category}
                    </Badge>
                  </div>
                  
                  <p className="text-foreground text-sm mb-3 line-clamp-2">{result.content}</p>
                  
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
            ))
          ) : (
            <div className="text-center py-12">
              <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchQuery ? 'No results found' : 'Start searching'}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery ? 'Try different keywords or filters' : 'Search for users, locations, communities and more'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
