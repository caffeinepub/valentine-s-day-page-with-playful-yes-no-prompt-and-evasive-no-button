import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';
import { KissShower } from '@/components/KissShower';

function App() {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonPositioned, setIsNoButtonPositioned] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleYesClick = () => {
    setAccepted(true);
  };

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    // Calculate safe bounds (keep button within viewport with padding)
    const padding = 20;
    const maxX = window.innerWidth - button.width - padding;
    const maxY = window.innerHeight - button.height - padding;
    const minX = padding;
    const minY = padding;

    // Generate random position within safe bounds
    let newX = Math.random() * (maxX - minX) + minX;
    let newY = Math.random() * (maxY - minY) + minY;

    // Ensure the button moves a significant distance from current position
    const currentX = button.left;
    const currentY = button.top;
    const minDistance = 150;

    let attempts = 0;
    while (
      Math.sqrt(Math.pow(newX - currentX, 2) + Math.pow(newY - currentY, 2)) < minDistance &&
      attempts < 10
    ) {
      newX = Math.random() * (maxX - minX) + minX;
      newY = Math.random() * (maxY - minY) + minY;
      attempts++;
    }

    setNoButtonPosition({ x: newX, y: newY });
    setIsNoButtonPositioned(true);
  };

  const handleNoHover = () => {
    moveNoButton();
  };

  useEffect(() => {
    // Prevent scrolling when button moves off-screen
    if (isNoButtonPositioned) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isNoButtonPositioned]);

  if (accepted) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/generated/valentine-bg.dim_1920x1080.png)',
            filter: 'brightness(0.95)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background/80 to-primary/20" />

        {/* Kiss Shower Animation */}
        <KissShower />

        {/* Success Content */}
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Heart className="w-32 h-32 text-primary fill-primary animate-pulse-heart" />
              <Sparkles className="w-8 h-8 text-accent absolute -top-2 -right-2 animate-pulse" />
              <Sparkles className="w-6 h-6 text-primary absolute -bottom-1 -left-1 animate-pulse delay-150" />
            </div>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
            I love you Motu, Tu mera pyaara baccha h
          </h1>
          
          <p className="font-sans text-xl md:text-2xl text-foreground mb-4 font-light">
            I knew you'd say yes! 💕
          </p>
          
          <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
            This Valentine's Day is going to be amazing. Can't wait to spend it with you! ❤️
          </p>

          <div className="mt-12 flex justify-center gap-4">
            <Heart className="w-6 h-6 text-primary fill-primary animate-pulse" />
            <Heart className="w-6 h-6 text-accent fill-accent animate-pulse delay-100" />
            <Heart className="w-6 h-6 text-primary fill-primary animate-pulse delay-200" />
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-4 left-0 right-0 text-center z-10">
          <p className="text-sm text-muted-foreground font-sans">
            © 2026. Built with <Heart className="w-4 h-4 inline text-primary fill-primary" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/generated/valentine-bg.dim_1920x1080.png)',
          filter: 'brightness(0.95)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background/70 to-primary/10" />

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        {/* Decorative Illustration */}
        <div className="mb-8 flex justify-center animate-float">
          <img
            src="/assets/generated/heart-ribbon-illustration.dim_800x600.png"
            alt="Hearts with ribbon"
            className="w-64 h-48 object-contain drop-shadow-romantic"
          />
        </div>

        {/* Question */}
        <h1 className="font-display text-5xl md:text-7xl font-bold text-primary mb-8 leading-tight">
          Will you be my valentine?
        </h1>

        <p className="font-sans text-lg md:text-xl text-muted-foreground mb-12 font-light">
          I promise to make this Valentine's Day unforgettable 💝
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative">
          <Button
            onClick={handleYesClick}
            size="lg"
            className="font-sans text-xl px-12 py-7 rounded-full shadow-romantic-lg hover:shadow-romantic transition-all duration-300 hover:scale-105 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            <Heart className="w-6 h-6 mr-2 fill-current" />
            Yes
          </Button>

          <Button
            ref={noButtonRef}
            onMouseEnter={handleNoHover}
            onPointerEnter={handleNoHover}
            variant="outline"
            size="lg"
            className="font-sans text-xl px-12 py-7 rounded-full border-2 border-muted-foreground/30 hover:border-muted-foreground/50 transition-all duration-200 font-medium"
            style={
              isNoButtonPositioned
                ? {
                    position: 'fixed',
                    left: `${noButtonPosition.x}px`,
                    top: `${noButtonPosition.y}px`,
                    transition: 'all 0.3s ease-out',
                    zIndex: 50
                  }
                : {}
            }
          >
            No
          </Button>
        </div>

        <p className="font-sans text-sm text-muted-foreground/70 mt-8 italic">
          (Hint: The "No" button is a bit shy... 😊)
        </p>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center z-10">
        <p className="text-sm text-muted-foreground font-sans">
          © 2026. Built with <Heart className="w-4 h-4 inline text-primary fill-primary" /> using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
