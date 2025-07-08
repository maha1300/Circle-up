
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Communities from "./pages/Communities";
import CreatePost from "./pages/CreatePost";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import CommunityDetail from "./pages/CommunityDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  if (!hasSeenOnboarding) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Onboarding onComplete={() => setHasSeenOnboarding(true)} />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
              <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
              <Route path="/signup" element={<Signup onSignup={() => setIsAuthenticated(true)} />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="*" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="communities" element={<Communities />} />
              <Route path="communities/:id" element={<CommunityDetail />} />
              <Route path="create-post" element={<CreatePost />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="profile" element={<Profile onLogout={() => setIsAuthenticated(false)} />} />
              <Route path="search" element={<Search />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
