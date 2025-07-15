
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";

interface MediaUploadProps {
  onMediaSelect: (file: File, preview: string, type: 'image' | 'video') => void;
  onMediaRemove: () => void;
  mediaPreview?: string;
  mediaType?: 'image' | 'video' | null;
}

const MediaUpload = ({ onMediaSelect, onMediaRemove, mediaPreview, mediaType }: MediaUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const type = file.type.startsWith('image/') ? 'image' : 'video';
      
      const reader = new FileReader();
      reader.onload = (e) => {
        onMediaSelect(file, e.target?.result as string, type);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
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
            onClick={onMediaRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {/* Upload Button */}
      {!mediaPreview && (
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center p-8 border-2 border-dashed border-soft-green hover:bg-light-green/20"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-8 w-8 text-primary-green" />
            <span className="text-body-text font-medium">Upload Photo or Video</span>
            <span className="text-sm text-body-text/70">Tap to select from gallery or camera</span>
          </div>
        </Button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        capture="environment"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default MediaUpload;
