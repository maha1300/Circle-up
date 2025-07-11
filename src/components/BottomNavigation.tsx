
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
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border shadow-2xl z-50">
      <div className="flex justify-around items-center py-3 px-4 max-w-lg mx-auto">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
                item.isSpecial
                  ? `transform ${isCreatePressed ? 'scale-95' : 'scale-100'} ${
                      isActive(item.path) 
                        ? `bg-primary shadow-2xl animate-glow` 
                        : `bg-primary hover:bg-primary/90 hover:shadow-xl hover:scale-110`
                    }`
                  : isActive(item.path)
                  ? `bg-primary text-primary-foreground shadow-lg animate-bounce-gentle`
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              onTouchStart={() => item.isSpecial && setIsCreatePressed(true)}
              onTouchEnd={() => item.isSpecial && setIsCreatePressed(false)}
              onMouseDown={() => item.isSpecial && setIsCreatePressed(true)}
              onMouseUp={() => item.isSpecial && setIsCreatePressed(false)}
              onMouseLeave={() => item.isSpecial && setIsCreatePressed(false)}
            >
              {/* Special floating effect for create button */}
              {item.isSpecial && (
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-2xl animate-float`}>
                  <Plus className="w-6 h-6 text-primary-foreground font-bold" strokeWidth={3} />
                </div>
              )}
              
              {/* Regular navigation items */}
              {!item.isSpecial && (
                <>
                  <div className={`flex items-center justify-center mb-1 ${isActive(item.path) ? 'animate-bounce-gentle' : ''}`}>
                    <IconComponent size={22} className="transition-all duration-300" />
                  </div>
                  <span className={`text-xs font-bold transition-all duration-300`}>
                    {item.label}
                  </span>
                  {isActive(item.path) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary-foreground rounded-full animate-pulse-soft"></div>
                  )}
                </>
              )}
              
              {/* Create button label */}
              {item.isSpecial && (
                <span className="text-xs font-bold mt-4 text-muted-foreground">{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
