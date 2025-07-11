
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link2, Mail, MessageCircle, X, Copy } from "lucide-react";
import { toast } from "sonner";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  postContent: string;
}

const ShareModal = ({ isOpen, onClose, postId, postContent }: ShareModalProps) => {
  const postUrl = `${window.location.origin}/post/${postId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    toast.success("Link copied to clipboard!");
    onClose();
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(`Check out this post: ${postContent.substring(0, 100)}... ${postUrl}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
    onClose();
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent('Check out this community post');
    const body = encodeURIComponent(`I thought you might be interested in this post:\n\n${postContent}\n\nView it here: ${postUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    onClose();
  };

  const handleSMSShare = () => {
    const message = encodeURIComponent(`Check out this post: ${postUrl}`);
    window.open(`sms:?body=${message}`, '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold">Share Post</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          <Button
            variant="outline"
            className="w-full justify-start space-x-3 h-12"
            onClick={handleCopyLink}
          >
            <Copy className="h-5 w-5 text-[#1E88E5]" />
            <span>Copy Link</span>
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start space-x-3 h-12"
            onClick={handleWhatsAppShare}
          >
            <MessageCircle className="h-5 w-5 text-[#25D366]" />
            <span>Share via WhatsApp</span>
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start space-x-3 h-12"
            onClick={handleEmailShare}
          >
            <Mail className="h-5 w-5 text-[#FF7043]" />
            <span>Share via Email</span>
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start space-x-3 h-12"
            onClick={handleSMSShare}
          >
            <MessageCircle className="h-5 w-5 text-[#43A047]" />
            <span>Share via SMS</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
