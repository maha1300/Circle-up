
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Home, Users, Plus, Bell, User } from "lucide-react";

const BottomNavigation = () => {
  const location = useLocation();
  const [isCreatePressed, setIsCreatePressed] = useState(false);

  const navItems = [
    { 
      path: "/", 
      icon: Home, 
      label: "Home"
    },
    { 
      path: "/communities", 
      icon: Users, 
      label: "Communities"
    },
    { 
      path: "/create-post", 
      icon: Plus, 
      label: "Post", 
      isSpecial: true
    },
    { 
      path: "/notifications", 
      icon: Bell, 
      label: "Notifications"
    },
    { 
      path: "/profile", 
      icon: User, 
      label: "Profile"
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-lg mx-auto">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                item.isSpecial
                  ? `bg-primary text-primary-foreground shadow-lg hover:bg-primary/90`
                  : isActive(item.path)
                  ? `bg-primary text-primary-foreground shadow-md`
                  : "text-foreground hover:text-primary hover:bg-secondary/50"
              }`}
              onTouchStart={() => item.isSpecial && setIsCreatePressed(true)}
              onTouchEnd={() => item.isSpecial && setIsCreatePressed(false)}
              onMouseDown={() => item.isSpecial && setIsCreatePressed(true)}
              onMouseUp={() => item.isSpecial && setIsCreatePressed(false)}
              onMouseLeave={() => item.isSpecial && setIsCreatePressed(false)}
            >
              <div className="flex items-center justify-center mb-1">
                <IconComponent size={20} className="transition-all duration-200" />
              </div>
              <span className="text-xs font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
