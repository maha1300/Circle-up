import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Mail, Lock, Trash2, FileText, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";

interface AccountSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountSettings = ({ isOpen, onClose }: AccountSettingsProps) => {
  const { user, updateUser, logout } = useUser();
  const [activeSection, setActiveSection] = useState<'main' | 'email' | 'password' | 'privacy'>('main');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Email change form
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [emailPassword, setEmailPassword] = useState('');
  
  // Password change form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailChange = () => {
    if (!newEmail || !emailPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    updateUser({ email: newEmail });
    toast.success("Email updated successfully!");
    setActiveSection('main');
    setNewEmail('');
    setEmailPassword('');
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    toast.success("Password updated successfully!");
    setActiveSection('main');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    toast.success("Account deleted successfully");
    logout();
    onClose();
  };

  const renderMainSettings = () => (
    <div className="space-y-4">
      <Button
        variant="outline"
        className="w-full justify-start border-border text-foreground hover:bg-muted"
        onClick={() => setActiveSection('email')}
      >
        <Mail className="h-4 w-4 mr-2" />
        Edit Email
      </Button>
      
      <Button
        variant="outline"
        className="w-full justify-start border-border text-foreground hover:bg-muted"
        onClick={() => setActiveSection('password')}
      >
        <Lock className="h-4 w-4 mr-2" />
        Change Password
      </Button>
      
      <Button
        variant="outline"
        className="w-full justify-start border-border text-foreground hover:bg-muted"
        onClick={() => setActiveSection('privacy')}
      >
        <FileText className="h-4 w-4 mr-2" />
        Privacy Policy
      </Button>
      
      <Button
        variant="destructive"
        className="w-full justify-start bg-destructive hover:bg-destructive/90 text-destructive-foreground"
        onClick={() => setShowDeleteConfirm(true)}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Delete Account
      </Button>
    </div>
  );

  const renderEmailChange = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="current-email" className="text-foreground">Current Email</Label>
        <Input
          id="current-email"
          value={user?.email || ''}
          disabled
          className="bg-muted border-border"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="new-email" className="text-foreground">New Email</Label>
        <Input
          id="new-email"
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Enter new email"
          className="bg-input border-border"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email-password" className="text-foreground">Confirm Password</Label>
        <Input
          id="email-password"
          type="password"
          value={emailPassword}
          onChange={(e) => setEmailPassword(e.target.value)}
          placeholder="Enter your current password"
          className="bg-input border-border"
        />
      </div>
      
      <div className="flex space-x-3 pt-4">
        <Button
          variant="outline"
          onClick={() => setActiveSection('main')}
          className="flex-1 border-border text-foreground"
        >
          Back
        </Button>
        <Button
          onClick={handleEmailChange}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Update Email
        </Button>
      </div>
    </div>
  );

  const renderPasswordChange = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="current-password" className="text-foreground">Current Password</Label>
        <div className="relative">
          <Input
            id="current-password"
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            className="bg-input border-border pr-10"
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="new-password" className="text-foreground">New Password</Label>
        <div className="relative">
          <Input
            id="new-password"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="bg-input border-border pr-10"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirm-password" className="text-foreground">Confirm New Password</Label>
        <div className="relative">
          <Input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="bg-input border-border pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
      
      <div className="flex space-x-3 pt-4">
        <Button
          variant="outline"
          onClick={() => setActiveSection('main')}
          className="flex-1 border-border text-foreground"
        >
          Back
        </Button>
        <Button
          onClick={handlePasswordChange}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Update Password
        </Button>
      </div>
    </div>
  );

  const renderPrivacyPolicy = () => (
    <div className="space-y-4">
      <div className="max-h-64 overflow-y-auto bg-muted/50 p-4 rounded-lg text-sm text-foreground">
        <h3 className="font-semibold mb-2">Privacy Policy</h3>
        <p className="mb-2">
          At MyCommunityHub, we are committed to protecting your privacy and ensuring the security of your personal information.
        </p>
        <p className="mb-2">
          <strong>Information We Collect:</strong> We collect information you provide directly, such as your name, email, location, and posts.
        </p>
        <p className="mb-2">
          <strong>How We Use Information:</strong> We use your information to provide community services, connect you with neighbors, and improve our platform.
        </p>
        <p className="mb-2">
          <strong>Information Sharing:</strong> We do not sell your personal information. We only share information within your community as you choose.
        </p>
        <p>
          <strong>Data Security:</strong> We implement security measures to protect your personal information against unauthorized access.
        </p>
      </div>
      
      <Button
        variant="outline"
        onClick={() => setActiveSection('main')}
        className="w-full border-border text-foreground"
      >
        Back to Settings
      </Button>
    </div>
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-foreground">
              {activeSection === 'main' && 'Account Settings'}
              {activeSection === 'email' && 'Change Email'}
              {activeSection === 'password' && 'Change Password'}
              {activeSection === 'privacy' && 'Privacy Policy'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {activeSection === 'main' && renderMainSettings()}
            {activeSection === 'email' && renderEmailChange()}
            {activeSection === 'password' && renderPasswordChange()}
            {activeSection === 'privacy' && renderPrivacyPolicy()}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAccount}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AccountSettings;