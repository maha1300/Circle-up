
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const categories = [
    { id: "alert", label: "Alert", icon: "🔌" },
    { id: "event", label: "Event", icon: "🎉" },
    { id: "scheme", label: "Scheme", icon: "🎁" },
    { id: "weather", label: "Weather", icon: "🌦️" },
    { id: "news", label: "News", icon: "📣" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Post Created!",
      description: "Your post has been shared with the community.",
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('');
    setLocation('');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-4">
      <div className="max-w-md mx-auto pt-8">
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-community-blue to-community-purple bg-clip-text text-transparent">
              Create New Post
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Post title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-slate-200 focus:border-community-blue"
                  required
                />
              </div>
              
              <div>
                <Textarea
                  placeholder="What's happening in your community?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border-slate-200 focus:border-community-blue min-h-[120px]"
                  required
                />
              </div>
              
              <div>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger className="border-slate-200 focus:border-community-blue">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        <div className="flex items-center space-x-2">
                          <span>{cat.icon}</span>
                          <span>{cat.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Location (optional)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-community-blue"
                />
              </div>
              
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-slate-200 hover:bg-slate-50"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Add Photo
                </Button>
              </div>
              
              <Button
                type="submit"
                disabled={isLoading || !title || !description || !category}
                className="w-full bg-gradient-to-r from-community-blue to-community-purple hover:from-community-blue/90 hover:to-community-purple/90 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Posting...
                  </div>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Post Now
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePost;
