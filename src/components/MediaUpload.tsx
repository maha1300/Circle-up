import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Image, X, Video } from "lucide-react";

interface MediaUploadProps {
  onMediaSelect: (file: File, preview: string, type: 'image' | 'video') => void;
  onMediaRemove: () => void;
  mediaPreview?: string;
  mediaType?: 'image' | 'video' | null;
}

const MediaUpload = ({ onMediaSelect, onMediaRemove, mediaPreview, mediaType }: MediaUploadProps) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const type = file.type.startsWith('image/') ? 'image' : 'video';
      
      const reader = new FileReader();
      reader.onload = (e) => {
        onMediaSelect(file, e.target?.result as string, type);
        setIsSheetOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Media Preview */}
      {mediaPreview && (
        <div className="relative rounded-lg overflow-hidden bg-muted">
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
      
      {/* Upload Options */}
      {!mediaPreview && (
        <div className="flex gap-4">
          {/* Camera Button */}
          <Button
            type="button"
            variant="outline"
            className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed hover:bg-muted/50"
            onClick={() => cameraInputRef.current?.click()}
          >
            <Camera className="h-8 w-8 mb-2 text-primary" />
            <span className="text-sm font-medium">Camera</span>
            <span className="text-xs text-muted-foreground">Take photo/video</span>
          </Button>

          {/* Gallery Button */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed hover:bg-muted/50"
              >
                <Image className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium">Gallery</span>
                <span className="text-xs text-muted-foreground">Choose from files</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[60vh]">
              <SheetHeader>
                <SheetTitle>Select Media</SheetTitle>
              </SheetHeader>
              <Tabs defaultValue="photos" className="mt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                </TabsList>
                <TabsContent value="photos" className="mt-4">
                  <div className="space-y-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full p-8 border-2 border-dashed hover:bg-muted/50"
                      onClick={() => {
                        galleryInputRef.current?.click();
                        galleryInputRef.current?.setAttribute('accept', 'image/*');
                      }}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <Image className="h-12 w-12 text-primary" />
                        <span className="font-medium">Select Photo</span>
                        <span className="text-sm text-muted-foreground">Choose from your gallery</span>
                      </div>
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="videos" className="mt-4">
                  <div className="space-y-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full p-8 border-2 border-dashed hover:bg-muted/50"
                      onClick={() => {
                        galleryInputRef.current?.click();
                        galleryInputRef.current?.setAttribute('accept', 'video/*');
                      }}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <Video className="h-12 w-12 text-primary" />
                        <span className="font-medium">Select Video</span>
                        <span className="text-sm text-muted-foreground">Choose from your files</span>
                      </div>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </SheetContent>
          </Sheet>
        </div>
      )}

      {/* Hidden File Inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*,video/*"
        capture="environment"
        className="hidden"
        onChange={handleFileSelect}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default MediaUpload;