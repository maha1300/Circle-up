
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
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back to MyCommunityHub!");
      onLogin();
    }, 1500);
  };

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
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#1E88E5] to-[#43A047] flex items-center justify-center shadow-lg">
            <span className="text-3xl">🏘️</span>
          </div>
          <h1 className="text-2xl font-bold text-[#212121]">MyCommunityHub</h1>
          <p className="text-[#757575]">Welcome back to your community</p>
        </div>

        <Card className="shadow-xl border-0 bg-white">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl text-[#212121]">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#212121] font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-[#757575]" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 h-12 border-gray-300 focus:border-[#1E88E5] text-[#212121]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#212121] font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-[#757575]" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-[#1E88E5] text-[#212121]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#757575] hover:text-[#212121]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-[#1E88E5] hover:text-[#1976D2] transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#FF7043] hover:bg-[#FF5722] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Google Login */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-[#757575]">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                className="w-full h-12 border-gray-300 hover:bg-gray-50 text-[#212121]"
              >
                {isGoogleLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#1E88E5] border-t-transparent"></div>
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
                <span className="text-[#757575]">Don't have an account? </span>
                <Link 
                  to="/signup" 
                  className="text-[#1E88E5] hover:text-[#1976D2] font-semibold transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
