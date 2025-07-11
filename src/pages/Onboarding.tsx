
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to MyCommunityHub",
      subtitle: "Stay Connected to Your Local Community",
      description: "Discover what's happening around you and connect with your neighbors",
      emoji: "🏘️",
      gradient: "from-community-blue to-community-purple"
    },
    {
      title: "Get Alerts Instantly",
      subtitle: "Never Miss Important Updates",
      description: "Receive timely notifications about power cuts, weather alerts, and government schemes",
      emoji: "🔔",
      gradient: "from-community-green to-community-blue"
    },
    {
      title: "Share News, Events & More",
      subtitle: "Be Part of Your Community",
      description: "Share local news, organize events, and help your neighbors stay informed",
      emoji: "📢",
      gradient: "from-community-orange to-community-pink"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Slide Content */}
        <div className="w-full max-w-md text-center animate-fade-in">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-light to-blue-medium flex items-center justify-center shadow-2xl animate-bounce-gentle">
            <span className="text-6xl">{slides[currentSlide].emoji}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {slides[currentSlide].title}
          </h1>
          
          <h2 className="text-xl font-semibold text-primary mb-4">
            {slides[currentSlide].subtitle}
          </h2>
          
          <p className="text-muted-foreground text-lg leading-relaxed mb-12">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex space-x-3 mb-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-primary w-8' 
                  : 'bg-border hover:bg-accent'
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between w-full max-w-md">
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center space-x-2 text-foreground bg-background border-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-30"
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </Button>

          <Button
            onClick={nextSlide}
            className="flex items-center space-x-2 bg-primary hover:bg-primary/90 px-8 py-3 rounded-full text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</span>
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      {/* Skip Button */}
      <div className="p-6">
        <Button
          variant="ghost"
          onClick={onComplete}
          className="w-full text-muted-foreground hover:text-foreground bg-transparent hover:bg-accent"
        >
          Skip Intro
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
