
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const BottomNavigation = () => {
  const location = useLocation();
  const [isCreatePressed, setIsCreatePressed] = useState(false);

  const navItems = [
    { path: "/", icon: "🏠", label: "Home" },
    { path: "/communities", icon: "🌐", label: "Communities" },
    { path: "/create-post", icon: "➕", label: "Post", isSpecial: true },
    { path: "/notifications", icon: "🔔", label: "Notifications" },
    { path: "/profile", icon: "👤", label: "Profile" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200/50 shadow-lg z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-lg mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
              item.isSpecial
                ? `transform ${isCreatePressed ? 'scale-95' : 'scale-100'} ${
                    isActive(item.path) 
                      ? 'bg-gradient-to-br from-community-blue to-community-purple shadow-lg' 
                      : 'bg-gradient-to-br from-community-blue to-community-purple hover:shadow-lg'
                  }`
                : isActive(item.path)
                ? "text-community-blue"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onTouchStart={() => item.isSpecial && setIsCreatePressed(true)}
            onTouchEnd={() => item.isSpecial && setIsCreatePressed(false)}
            onMouseDown={() => item.isSpecial && setIsCreatePressed(true)}
            onMouseUp={() => item.isSpecial && setIsCreatePressed(false)}
            onMouseLeave={() => item.isSpecial && setIsCreatePressed(false)}
          >
            {/* Special floating effect for create button */}
            {item.isSpecial && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-community-blue to-community-purple flex items-center justify-center shadow-xl">
                <span className="text-xl text-white">{item.icon}</span>
              </div>
            )}
            
            {/* Regular navigation items */}
            {!item.isSpecial && (
              <>
                <span className={`text-xl mb-1 ${isActive(item.path) ? 'animate-bounce-gentle' : ''}`}>
                  {item.icon}
                </span>
                <span className={`text-xs font-medium ${isActive(item.path) ? 'text-community-blue' : ''}`}>
                  {item.label}
                </span>
                {isActive(item.path) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-community-blue rounded-full"></div>
                )}
              </>
            )}
            
            {/* Create button label */}
            {item.isSpecial && (
              <span className="text-xs font-medium mt-4 text-gray-600">{item.label}</span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
