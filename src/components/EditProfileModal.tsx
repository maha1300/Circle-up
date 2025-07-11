
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, X, MapPin, User } from "lucide-react";
import { toast } from "sonner";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: {
    name: string;
    avatar: string;
    location: string;
  };
  onSave: (profile: { name: string; avatar: string; location: string }) => void;
}

const EditProfileModal = ({ isOpen, onClose, currentProfile, onSave }: EditProfileModalProps) => {
  const [name, setName] = useState(currentProfile.name);
  const [location, setLocation] = useState(currentProfile.location);
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
    const updatedProfile = {
      name,
      avatar,
      location
    };
    
    onSave(updatedProfile);
    toast.success("Profile updated successfully!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold text-[#212121]">Edit Profile</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-20 w-20 ring-4 ring-[#1E88E5]/20">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="bg-gradient-to-r from-[#1E88E5] to-[#43A047] text-white text-lg font-bold">
                  {name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white shadow-lg"
                onClick={() => document.getElementById('avatar-input')?.click()}
              >
                <Camera className="h-4 w-4 text-[#1E88E5]" />
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
            <Label htmlFor="name" className="text-[#212121] font-medium">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-[#757575]" />
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="pl-10 border-gray-300 focus:border-[#1E88E5] text-[#212121]"
              />
            </div>
          </div>

          {/* Location Field */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-[#212121] font-medium">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#757575]" />
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location"
                className="pl-10 border-gray-300 focus:border-[#1E88E5] text-[#212121]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 text-[#757575] hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-[#1E88E5] hover:bg-[#1976D2] text-white"
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
