import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Image, Video, X } from "lucide-react";

interface MediaUploadProps {
  onMediaSelect: (file: File, type: 'image' | 'video') => void;
  onMediaRemove: () => void;
  selectedFile?: File | null;
  mediaPreview?: string;
  mediaType?: 'image' | 'video' | null;
}

const MediaUpload = ({ onMediaSelect, onMediaRemove, selectedFile, mediaPreview, mediaType }: MediaUploadProps) => {
  const [showGallery, setShowGallery] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = event.target.files?.[0];
    if (file) {
      onMediaSelect(file, type);
      setShowGallery(false);
    }
  };

  const handleCameraCapture = () => {
    // In a real app, this would open the camera
    // For now, we'll simulate by opening the image picker
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Media Preview */}
      {mediaPreview && (
        <div className="relative rounded-lg overflow-hidden border border-border">
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

      {/* Media Upload Options */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex flex-col items-center p-4 h-auto border-border hover:bg-muted"
          onClick={handleCameraCapture}
        >
          <Camera className="h-6 w-6 mb-2 text-primary" />
          <span className="text-sm font-medium">Camera</span>
        </Button>
        
        <Button
          type="button"
          variant="outline"
          className="flex flex-col items-center p-4 h-auto border-border hover:bg-muted"
          onClick={() => setShowGallery(true)}
        >
          <Image className="h-6 w-6 mb-2 text-primary" />
          <span className="text-sm font-medium">Gallery</span>
        </Button>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <Card className="mt-4 border border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Select Media</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowGallery(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <Tabs defaultValue="photos" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="photos" className="text-foreground">Photos</TabsTrigger>
                <TabsTrigger value="videos" className="text-foreground">Videos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="photos" className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Image className="h-4 w-4 mr-2" />
                  Choose from Photos
                </Button>
              </TabsContent>
              
              <TabsContent value="videos" className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => videoInputRef.current?.click()}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Choose from Videos
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Hidden file inputs */}
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
    </div>
  );
};

export default MediaUpload;