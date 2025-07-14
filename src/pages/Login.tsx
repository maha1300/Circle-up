
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    
    // Simulate Google login
    setTimeout(() => {
      setIsGoogleLoading(false);
      toast.success("Successfully logged in with Google!");
      onLogin();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <span className="text-3xl">🏘️</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">MyCommunityHub</h1>
          <p className="text-muted-foreground">Welcome back to your community</p>
        </div>

        <Card className="shadow-xl border-0 bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl text-card-foreground">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Google Login */}
              <Button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isGoogleLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent"></div>
                    <span>Signing in with Google...</span>
                  </div>
                ) : (
                  <>
                    <span className="mr-2">📧</span>
                    Continue with Google
                  </>
                )}
              </Button>

              <div className="text-center">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link 
                  to="/signup" 
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
