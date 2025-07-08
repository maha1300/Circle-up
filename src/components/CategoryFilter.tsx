
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const categories = [
    { id: "all", label: "All", icon: "📱", color: "bg-gray-100 text-gray-700" },
    { id: "alert", label: "Alerts", icon: "🔌", color: "bg-red-100 text-red-700" },
    { id: "event", label: "Events", icon: "🎉", color: "bg-blue-100 text-blue-700" },
    { id: "scheme", label: "Schemes", icon: "🎁", color: "bg-green-100 text-green-700" },
    { id: "weather", label: "Weather", icon: "🌦️", color: "bg-orange-100 text-orange-700" },
    { id: "news", label: "News", icon: "📣", color: "bg-purple-100 text-purple-700" }
  ];

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center space-x-2 whitespace-nowrap transition-all duration-200 ${
            selectedCategory === category.id
              ? "bg-gradient-to-r from-community-blue to-community-purple text-white shadow-lg"
              : `hover:${category.color} ${category.color}`
          }`}
        >
          <span>{category.icon}</span>
          <span className="font-medium">{category.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
