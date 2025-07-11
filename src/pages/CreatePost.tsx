
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, MapPin, Send, Image, Video, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string>('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: "alert", label: "Alert", icon: "⚡" },
    { id: "event", label: "Event", icon: "🎊" },
    { id: "scheme", label: "Scheme", icon: "🎁" },
    { id: "weather", label: "Weather", icon: "🌈" },
    { id: "news", label: "News", icon: "📢" }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = event.target.files?.[0];
    if (file) {
      setMediaFile(file);
      setMediaType(type);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // In a real app, this would open the camera
    toast({
      title: "Camera Feature",
      description: "Camera capture would be implemented here using device APIs.",
    });
  };

  const removeMedia = () => {
    setMediaFile(null);
    setMediaPreview('');
    setMediaType(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would upload the media file and create the post
    const newPost = {
      id: Date.now(),
      author: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
      },
      content: description,
      category: category,
      timestamp: "Just now",
      location: location || "Current Location",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      image: mediaPreview || undefined
    };

    toast({
      title: "Post Created!",
      description: "Your post has been shared with the community and added to your profile.",
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('');
    setLocation('');
    removeMedia();
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-8">
        <Card className="shadow-lg border-0 bg-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-card-foreground">
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
                  className="bg-input border-border focus:border-primary text-card-foreground"
                  required
                />
              </div>
              
              <div>
                <Textarea
                  placeholder="What's happening in your community?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-input border-border focus:border-primary min-h-[120px] text-card-foreground"
                  required
                />
              </div>
              
              <div>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger className="bg-input border-border focus:border-primary">
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
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Location (optional)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 bg-input border-border focus:border-primary text-card-foreground"
                />
              </div>
              
              {/* Media Preview */}
              {mediaPreview && (
                <div className="relative rounded-lg overflow-hidden">
                  {mediaType === 'image' ? (
                    <img src={mediaPreview} alt="Preview" className="w-full h-48 object-cover" />
                  ) : (
                    <video src={mediaPreview} className="w-full h-48 object-cover" controls />
                  )}
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeMedia}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {/* Media Upload Options */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex flex-col items-center p-4 h-auto border-border hover:bg-muted"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Image className="h-5 w-5 mb-1 text-primary" />
                  <span className="text-xs">Photo</span>
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="flex flex-col items-center p-4 h-auto border-border hover:bg-muted"
                  onClick={handleCameraCapture}
                >
                  <Camera className="h-5 w-5 mb-1 text-accent" />
                  <span className="text-xs">Camera</span>
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="flex flex-col items-center p-4 h-auto border-border hover:bg-muted"
                  onClick={() => videoInputRef.current?.click()}
                >
                  <Video className="h-5 w-5 mb-1 text-primary" />
                  <span className="text-xs">Video</span>
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileSelect(e, 'image')}
              />
              
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => handleFileSelect(e, 'video')}
              />
              
              <Button
                type="submit"
                disabled={isLoading || !title || !description || !category}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
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
