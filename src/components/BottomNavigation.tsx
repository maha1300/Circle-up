
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
      emoji: "🏠",
      label: "Home",
      gradient: "from-[#1E88E5] to-[#43A047]"
    },
    { 
      path: "/communities", 
      icon: Users, 
      emoji: "🌐",
      label: "Communities",
      gradient: "from-[#43A047] to-[#1E88E5]"
    },
    { 
      path: "/create-post", 
      icon: Plus, 
      emoji: "✨",
      label: "Post", 
      isSpecial: true,
      gradient: "from-[#FF7043] to-[#1E88E5]"
    },
    { 
      path: "/notifications", 
      icon: Bell, 
      emoji: "🔔",
      label: "Notifications",
      gradient: "from-[#FF7043] to-[#43A047]"
    },
    { 
      path: "/profile", 
      icon: User, 
      emoji: "👤",
      label: "Profile",
      gradient: "from-[#1E88E5] to-[#FF7043]"
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl z-50">
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
                        ? `bg-gradient-to-br ${item.gradient} shadow-2xl animate-glow` 
                        : `bg-gradient-to-br ${item.gradient} hover:shadow-xl hover:scale-110`
                    }`
                  : isActive(item.path)
                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg animate-bounce-gentle`
                  : "text-[#757575] hover:text-[#212121] hover:bg-gray-100"
              }`}
              onTouchStart={() => item.isSpecial && setIsCreatePressed(true)}
              onTouchEnd={() => item.isSpecial && setIsCreatePressed(false)}
              onMouseDown={() => item.isSpecial && setIsCreatePressed(true)}
              onMouseUp={() => item.isSpecial && setIsCreatePressed(false)}
              onMouseLeave={() => item.isSpecial && setIsCreatePressed(false)}
            >
              {/* Special floating effect for create button */}
              {item.isSpecial && (
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-2xl animate-float`}>
                  <Plus className="w-6 h-6 text-white font-bold" strokeWidth={3} />
                </div>
              )}
              
              {/* Regular navigation items */}
              {!item.isSpecial && (
                <>
                  <div className={`flex items-center justify-center mb-1 ${isActive(item.path) ? 'animate-bounce-gentle' : ''}`}>
                    {isActive(item.path) ? (
                      <span className="text-2xl">{item.emoji}</span>
                    ) : (
                      <IconComponent size={22} className="transition-all duration-300" />
                    )}
                  </div>
                  <span className={`text-xs font-bold transition-all duration-300 ${
                    isActive(item.path) ? 'text-white' : ''
                  }`}>
                    {item.label}
                  </span>
                  {isActive(item.path) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse-soft"></div>
                  )}
                </>
              )}
              
              {/* Create button label */}
              {item.isSpecial && (
                <span className="text-xs font-bold mt-4 text-[#757575]">{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
