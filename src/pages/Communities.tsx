
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Communities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>([1, 3]);

  const communities = [
    {
      id: 1,
      name: "Anna Nagar Community",
      description: "Connect with neighbors in Anna Nagar, Chennai. Share local news, events, and stay updated.",
      location: "Anna Nagar, Chennai",
      members: 1247,
      avatar: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=100&h=100&fit=crop",
      category: "Residential",
      isActive: true,
      recentActivity: "5 new posts today"
    },
    {
      id: 2,
      name: "Thanjavur Central",
      description: "Official community for Thanjavur district. Get government updates and local announcements.",
      location: "Thanjavur, Tamil Nadu",
      members: 3456,
      avatar: "🏛️",
      category: "Official",
      isActive: true,
      recentActivity: "New scheme announced"
    },
    {
      id: 3,
      name: "Trichy Tech Hub",
      description: "For tech professionals and enthusiasts in Trichy. Share job opportunities and tech news.",
      location: "Trichy, Tamil Nadu",
      members: 892,
      avatar: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=100&h=100&fit=crop",
      category: "Professional",
      isActive: true,
      recentActivity: "12 new members this week"
    },
    {
      id: 4,
      name: "Coimbatore Events",
      description: "Discover and organize events in Coimbatore. From cultural festivals to business meetups.",
      location: "Coimbatore, Tamil Nadu",
      members: 2134,
      avatar: "🎪",
      category: "Events",
      isActive: true,
      recentActivity: "3 upcoming events"
    },
    {
      id: 5,
      name: "Salem Green Initiative",
      description: "Environmental community focused on making Salem cleaner and greener.",
      location: "Salem, Tamil Nadu",
      members: 567,
      avatar: "🌱",
      category: "Environment",
      isActive: true,
      recentActivity: "Tree plantation drive"
    }
  ];

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinCommunity = (communityId: number, communityName: string) => {
    if (joinedCommunities.includes(communityId)) {
      setJoinedCommunities(prev => prev.filter(id => id !== communityId));
      toast.success(`Left ${communityName}`);
    } else {
      setJoinedCommunities(prev => [...prev, communityId]);
      toast.success(`Joined ${communityName}!`);
    }
  };

  const categoryColors = {
    Residential: "bg-primary/10 text-primary",
    Official: "bg-accent/10 text-accent-foreground", 
    Professional: "bg-secondary/10 text-secondary-foreground",
    Events: "bg-muted/10 text-muted-foreground",
    Environment: "bg-accent/10 text-accent-foreground"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-card-foreground mb-4">Communities 🌐</h1>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search communities or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-input border-border"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* My Communities Section */}
        {joinedCommunities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">My Communities</h2>
            <div className="space-y-4">
              {filteredCommunities
                .filter(community => joinedCommunities.includes(community.id))
                .map((community) => (
                  <Card key={community.id} className="bg-primary/5 border-primary/20 shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={community.avatar.startsWith('http') ? community.avatar : undefined} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                              {community.avatar.startsWith('http') ? 
                                community.name.split(' ').map(n => n[0]).join('') : 
                                community.avatar
                              }
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <Link to={`/communities/${community.id}`}>
                              <h3 className="font-semibold text-card-foreground hover:text-primary transition-colors">
                                {community.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground line-clamp-1">{community.description}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <MapPin size={12} />
                                <span>{community.location}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <Users size={12} />
                                <span>{community.members.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleJoinCommunity(community.id, community.name)}
                          className="bg-card text-primary border-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          Joined ✓
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* All Communities Section */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {joinedCommunities.length > 0 ? 'Discover More' : 'All Communities'}
          </h2>
          <div className="space-y-4">
            {filteredCommunities
              .filter(community => !joinedCommunities.includes(community.id))
              .map((community) => (
                <Card key={community.id} className="bg-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={community.avatar.startsWith('http') ? community.avatar : undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-accent to-primary text-primary-foreground">
                            {community.avatar.startsWith('http') ? 
                              community.name.split(' ').map(n => n[0]).join('') : 
                              community.avatar
                            }
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-card-foreground">{community.name}</h3>
                            <Badge 
                              className={`${categoryColors[community.category as keyof typeof categoryColors]} border-0 text-xs`}
                            >
                              {community.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{community.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <MapPin size={12} />
                                <span>{community.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users size={12} />
                                <span>{community.members.toLocaleString()} members</span>
                              </div>
                            </div>
                            <div className="text-xs text-primary font-medium">
                              {community.recentActivity}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleJoinCommunity(community.id, community.name)}
                        className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground"
                      >
                        Join
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {filteredCommunities.length === 0 && (
            <Card className="p-8 text-center bg-card">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">No communities found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Communities;
