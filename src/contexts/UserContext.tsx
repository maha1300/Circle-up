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

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      updateUser,
      addPost,
      isAuthenticated,
      login,
      logout
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