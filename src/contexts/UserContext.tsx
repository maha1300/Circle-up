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
  stats: {
    posts: number;
    communities: number;
    following: number;
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
}

interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  updateUser: (updates: Partial<UserData>) => void;
  addPost: (post: Omit<Post, 'id' | 'time'>) => void;
  isAuthenticated: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
  generateAvatarFromName: (name: string) => string;
  getMockUsers: () => Array<{ id: string; name: string; avatar: string; bio: string; location: string; isFollowing: boolean; posts: number; followers: number; following: number; }>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Load user data from localStorage on app start
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
        time: 'Just now'
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

  const generateAvatarFromName = (name: string): string => {
    const colors = ['#77bfa3', '#98c9a3', '#bfd8bd', '#dde7c7', '#edeec9'];
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    const colorIndex = name.length % colors.length;
    return `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="${colors[colorIndex]}"/>
        <text x="50" y="60" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white">${initials}</text>
      </svg>`
    )}`;
  };

  const getMockUsers = () => [
    {
      id: 'user_2',
      name: 'Sarah Johnson',
      avatar: generateAvatarFromName('Sarah Johnson'),
      bio: 'Community organizer and environmental enthusiast',
      location: 'Anna Nagar, Chennai',
      isFollowing: false,
      posts: 24,
      followers: 156,
      following: 89
    },
    {
      id: 'user_3', 
      name: 'Raj Patel',
      avatar: generateAvatarFromName('Raj Patel'),
      bio: 'Local business owner and tech enthusiast',
      location: 'Trichy, Tamil Nadu',
      isFollowing: true,
      posts: 18,
      followers: 203,
      following: 67
    },
    {
      id: 'user_4',
      name: 'Priya Sharma',
      avatar: generateAvatarFromName('Priya Sharma'),
      bio: 'Teacher and community volunteer',
      location: 'Thanjavur, Tamil Nadu',
      isFollowing: false,
      posts: 31,
      followers: 278,
      following: 134
    },
    {
      id: 'user_5',
      name: 'Kumar Raman',
      avatar: generateAvatarFromName('Kumar Raman'),
      bio: 'Government official and policy maker',
      location: 'Coimbatore, Tamil Nadu',
      isFollowing: true,
      posts: 45,
      followers: 892,
      following: 234
    }
  ];

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      updateUser,
      addPost,
      isAuthenticated,
      login,
      logout,
      generateAvatarFromName,
      getMockUsers
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