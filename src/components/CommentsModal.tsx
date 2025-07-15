import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Heart } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

interface Comment {
  id: number;
  author: string;
  content: string;
  time: string;
  likes: number;
  avatar?: string;
  isLiked?: boolean;
}

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  postTitle: string;
}

const CommentsModal = ({ isOpen, onClose, postTitle }: CommentsModalProps) => {
  const { user } = useUser();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Priya Sharma",
      content: "Thanks for sharing this important information!",
      time: "2 hours ago",
      likes: 5,
      isLiked: false
    },
    {
      id: 2,
      author: "Raj Kumar",
      content: "Very helpful post. I was looking for this update.",
      time: "1 hour ago",
      likes: 3,
      isLiked: true
    }
  ]);

  const handleAddComment = () => {
    if (newComment.trim() && user) {
      const comment: Comment = {
        id: Date.now(),
        author: user.name,
        content: newComment,
        time: "Just now",
        likes: 0,
        isLiked: false
      };
      
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const toggleLike = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Comments</DialogTitle>
          <p className="text-sm text-muted-foreground truncate">{postTitle}</p>
        </DialogHeader>
        
        {/* Comments List */}
        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {getInitials(comment.author)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-1">
                <div className="bg-muted rounded-lg p-3">
                  <p className="font-medium text-sm">{comment.author}</p>
                  <p className="text-sm">{comment.content}</p>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>{comment.time}</span>
                  <button 
                    onClick={() => toggleLike(comment.id)}
                    className={`flex items-center space-x-1 hover:text-primary ${
                      comment.isLiked ? 'text-red-500' : ''
                    }`}
                  >
                    <Heart className={`h-3 w-3 ${comment.isLiked ? 'fill-current' : ''}`} />
                    <span>{comment.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Add Comment */}
        <div className="flex space-x-2 pt-4 border-t">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {user ? getInitials(user.name) : 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 flex space-x-2">
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              className="flex-1"
            />
            <Button 
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsModal;