
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

  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} login coming soon!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-community-blue/10 via-white to-community-purple/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-community-blue to-community-purple flex items-center justify-center shadow-lg">
            <span className="text-3xl">🏘️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">MyCommunityHub</h1>
          <p className="text-gray-600">Welcome back to your community</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl text-gray-900">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-community-blue hover:text-community-purple transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-community-blue to-community-purple hover:from-community-purple hover:to-community-blue text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
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

              {/* Social Login */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("Google")}
                  className="h-12 border-gray-300 hover:bg-gray-50"
                >
                  <span className="mr-2">📧</span>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("Facebook")}
                  className="h-12 border-gray-300 hover:bg-gray-50"
                >
                  <span className="mr-2">📘</span>
                  Facebook
                </Button>
              </div>

              <div className="text-center">
                <span className="text-gray-600">Don't have an account? </span>
                <Link 
                  to="/signup" 
                  className="text-community-blue hover:text-community-purple font-semibold transition-colors"
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
