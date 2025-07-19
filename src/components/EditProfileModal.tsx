
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, X, MapPin, User, FileText } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: {
    name: string;
    avatar: string;
    location: string;
    bio: string;
  };
  onSave: (profile: { name: string; avatar: string; location: string; bio: string }) => void;
}

const EditProfileModal = ({ isOpen, onClose, currentProfile, onSave }: EditProfileModalProps) => {
  const { generateAvatarFromName } = useUser();
  const [name, setName] = useState(currentProfile.name === 'Not added yet' ? '' : currentProfile.name);
  const [location, setLocation] = useState(currentProfile.location === 'Not added yet' ? '' : currentProfile.location);
  const [bio, setBio] = useState(currentProfile.bio === 'Not added yet' ? '' : currentProfile.bio);
  const [avatar, setAvatar] = useState(currentProfile.avatar);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const finalName = name.trim() || 'Anonymous User';
    const finalAvatar = avatar || generateAvatarFromName(finalName);
    
    const updatedProfile = {
      name: finalName,
      avatar: finalAvatar,
      location: location.trim(),
      bio: bio.trim()
    };
    
    onSave(updatedProfile);
    toast.success("Profile updated successfully!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold text-foreground">Edit Profile</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-20 w-20 ring-4 ring-primary/20">
              <AvatarImage src={avatar || generateAvatarFromName(name || 'User')} alt={name || 'User'} />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                {(name || 'U').split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="sm"
              className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-background shadow-lg border-border"
              onClick={() => document.getElementById('avatar-input')?.click()}
            >
              <Camera className="h-4 w-4 text-primary" />
            </Button>
          </div>
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-medium">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="pl-10 border-border focus:border-primary text-foreground bg-input"
              />
            </div>
          </div>

          {/* Location Field */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-foreground font-medium">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location"
                className="pl-10 border-border focus:border-primary text-foreground bg-input"
              />
            </div>
          </div>

          {/* Bio Field */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-foreground font-medium">Bio</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
                className="pl-10 border-border focus:border-primary text-foreground bg-input min-h-[80px]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-border text-foreground hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
