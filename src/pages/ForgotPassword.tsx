
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toast.success("Password reset link sent to your email!");
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-community-purple/10 via-white to-community-blue/10 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in">
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-community-green to-community-blue flex items-center justify-center shadow-lg">
                <span className="text-3xl">📧</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
              <p className="text-gray-600 mb-8">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <Button
                  onClick={() => setIsSuccess(false)}
                  variant="outline"
                  className="w-full"
                >
                  Try Again
                </Button>
                <Link to="/login">
                  <Button variant="ghost" className="w-full">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-community-purple/10 via-white to-community-blue/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Back Button */}
        <Link 
          to="/login" 
          className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Sign In
        </Link>

        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-community-purple to-community-blue flex items-center justify-center shadow-lg">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-600">Enter your email to receive reset instructions</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl text-gray-900">Forgot Your Password?</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReset} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="pl-10 h-12"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">
                  We'll send you a link to reset your password.
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-community-purple to-community-blue hover:from-community-blue hover:to-community-purple text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Sending Reset Link...</span>
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </Button>

              <div className="text-center">
                <span className="text-gray-600">Remember your password? </span>
                <Link 
                  to="/login" 
                  className="text-community-blue hover:text-community-purple font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
