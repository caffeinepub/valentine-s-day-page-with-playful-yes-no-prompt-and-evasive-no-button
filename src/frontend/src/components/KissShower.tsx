import { useEffect, useState } from 'react';

interface Kiss {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  rotation: number;
}

export function KissShower() {
  const [kisses, setKisses] = useState<Kiss[]>([]);

  useEffect(() => {
    // Generate 40 kiss particles with random positions and timings
    const newKisses: Kiss[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage across screen
      y: -10 - Math.random() * 20, // start above viewport
      delay: Math.random() * 2, // stagger start times
      duration: 3 + Math.random() * 2, // vary fall speed
      rotation: Math.random() * 360, // random rotation
    }));
    setKisses(newKisses);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {kisses.map((kiss) => (
        <div
          key={kiss.id}
          className="absolute text-4xl animate-kiss-fall"
          style={{
            left: `${kiss.x}%`,
            top: `${kiss.y}%`,
            animationDelay: `${kiss.delay}s`,
            animationDuration: `${kiss.duration}s`,
            transform: `rotate(${kiss.rotation}deg)`,
          }}
        >
          💋
        </div>
      ))}
    </div>
  );
}
