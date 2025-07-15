
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, X } from "lucide-react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: {
    name: string;
    avatar: string;
    location: string;
    bio?: string;
  };
  onSave: (profile: { name: string; avatar: string; location: string; bio: string }) => void;
}

const EditProfileModal = ({ isOpen, onClose, currentProfile, onSave }: EditProfileModalProps) => {
  const [name, setName] = useState(currentProfile.name);
  const [location, setLocation] = useState(currentProfile.location);
  const [bio, setBio] = useState(currentProfile.bio || '');
  const [avatar, setAvatar] = useState(currentProfile.avatar);

  const handleSave = () => {
    onSave({ name, avatar, location, bio });
    onClose();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card-bg">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold text-input-text">Edit Profile</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="h-20 w-20 ring-4 ring-primary-green/20">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className="bg-primary-green text-white text-lg font-bold">
                {name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="relative border-border-color">
              <Camera className="h-4 w-4 mr-2" />
              Change Photo
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleAvatarChange}
              />
            </Button>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-input-text">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 bg-app-bg border-border-color focus:border-primary-green text-input-text"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-input-text">Location</label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 bg-app-bg border-border-color focus:border-primary-green text-input-text"
                placeholder="Enter your location"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-input-text">Bio</label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-1 bg-app-bg border-border-color focus:border-primary-green text-input-text min-h-[80px]"
                placeholder="Tell us about yourself..."
                maxLength={150}
              />
              <p className="text-xs text-body-text mt-1">{bio.length}/150 characters</p>
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 border-border-color text-input-text">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary-green hover:bg-primary-green/90 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
