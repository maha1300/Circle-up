
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserData {
  id: string;
  name: string;
  email: string;
  location: string;
  bio: string;
  avatar: string;
  joinedDate: string;
  posts: Post[];
  followers: Follower[];
  following: Following[];
  communities: Community[];
  stats: {
    posts: number;
    communities: number;
    following: number;
    followers: number;
  };
}

export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  likes: number;
  comments: number;
  shares: number;
  time: string;
  location?: string;
  image?: string;
  isLiked?: boolean;
}

export interface Follower {
  id: string;
  name: string;
  avatar: string;
  location: string;
}

export interface Following {
  id: string;
  name: string;
  avatar: string;
  location: string;
}

export interface Community {
  id: string;
  name: string;
  members: number;
  role: string;
  logo?: string;
  description?: string;
}

interface UserContextType {
  user: UserData | null;
  allPosts: Post[];
  setUser: (user: UserData | null) => void;
  updateUser: (updates: Partial<UserData>) => void;
  addPost: (post: Omit<Post, 'id' | 'time'>) => void;
  addToAllPosts: (post: Post) => void;
  isAuthenticated: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allPosts, setAllPosts] = useState<Post[]>([
    // Sample posts for the home feed
    {
      id: 1,
      title: "Power Cut Alert",
      content: "🚨 Power cut scheduled in Anna Nagar from 10 AM to 2 PM today for maintenance work. Please plan accordingly!",
      category: "alert",
      likes: 23,
      comments: 5,
      shares: 12,
      time: "2 hours ago",
      location: "Anna Nagar, Chennai",
      isLiked: false
    },
    {
      id: 2,
      title: "Community Festival",
      content: "🎉 Community temple festival this Saturday! Everyone is invited to join the celebrations. Food stalls and cultural programs starting at 6 PM.",
      category: "event",
      likes: 47,
      comments: 12,
      shares: 8,
      time: "4 hours ago",
      location: "Thanjavur",
      isLiked: true,
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=500&h=300&fit=crop"
    }
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAuth = localStorage.getItem('isAuthenticated');
    
    if (savedUser && savedAuth === 'true') {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const updateUser = (updates: Partial<UserData>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const addPost = (newPost: Omit<Post, 'id' | 'time'>) => {
    if (user) {
      const post: Post = {
        ...newPost,
        id: Date.now(),
        time: 'Just now',
        shares: 0,
        isLiked: false
      };
      
      const updatedPosts = [post, ...user.posts];
      const updatedUser = {
        ...user,
        posts: updatedPosts,
        stats: {
          ...user.stats,
          posts: updatedPosts.length
        }
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Add to all posts feed
      setAllPosts(prev => [post, ...prev]);
    }
  };

  const addToAllPosts = (post: Post) => {
    setAllPosts(prev => [post, ...prev]);
  };

  const followUser = (userId: string) => {
    if (user) {
      const newFollowing: Following = {
        id: userId,
        name: `User ${userId}`,
        avatar: "",
        location: "Unknown"
      };
      
      const updatedUser = {
        ...user,
        following: [...user.following, newFollowing],
        stats: {
          ...user.stats,
          following: user.following.length + 1
        }
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const unfollowUser = (userId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        following: user.following.filter(f => f.id !== userId),
        stats: {
          ...user.stats,
          following: user.following.length - 1
        }
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const login = (userData: UserData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <UserContext.Provider value={{
      user,
      allPosts,
      setUser,
      updateUser,
      addPost,
      addToAllPosts,
      isAuthenticated,
      login,
      logout,
      followUser,
      unfollowUser
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
