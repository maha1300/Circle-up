
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const categories = [
    { 
      id: "all", 
      label: "All", 
      icon: "🌟", 
      gradient: "from-community-purple via-community-pink to-community-orange",
      hoverColor: "hover:bg-gradient-to-r hover:from-community-purple/20 hover:to-community-pink/20"
    },
    { 
      id: "alert", 
      label: "Alerts", 
      icon: "⚡", 
      gradient: "from-community-red via-community-orange to-community-amber",
      hoverColor: "hover:bg-gradient-to-r hover:from-red-100 hover:to-orange-100"
    },
    { 
      id: "event", 
      label: "Events", 
      icon: "🎊", 
      gradient: "from-community-blue via-community-cyan to-community-teal",
      hoverColor: "hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100"
    },
    { 
      id: "scheme", 
      label: "Schemes", 
      icon: "🎁", 
      gradient: "from-community-green via-community-emerald to-community-lime",
      hoverColor: "hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100"
    },
    { 
      id: "weather", 
      label: "Weather", 
      icon: "🌈", 
      gradient: "from-community-orange via-community-amber to-community-rose",
      hoverColor: "hover:bg-gradient-to-r hover:from-orange-100 hover:to-amber-100"
    },
    { 
      id: "news", 
      label: "News", 
      icon: "📢", 
      gradient: "from-community-purple via-community-violet to-community-indigo",
      hoverColor: "hover:bg-gradient-to-r hover:from-purple-100 hover:to-violet-100"
    }
  ];

  return (
    <div className="flex space-x-3 overflow-x-auto pb-2 px-1">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center space-x-2 whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
            selectedCategory === category.id
              ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg hover:shadow-xl animate-glow`
              : `${category.hoverColor} border border-slate-200 backdrop-blur-sm`
          }`}
        >
          <span className="text-lg animate-bounce-gentle">{category.icon}</span>
          <span className="font-medium">{category.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
