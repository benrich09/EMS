import { useEffect, useState } from 'react';

export function Sparkles({ 
  className = '', 
  background = 'transparent',
  particleSize = 2,
  minSize = 1,
  maxSize = 4,
  speed = 10,
  particleColor = 'from-blue-400 via-indigo-400 to-cyan-400',
  particleDensity = 50 
}) {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const sparklesArray = [];
      const density = Math.max(20, Math.min(particleDensity, 200));
      
      for (let i = 0; i < density; i++) {
        sparklesArray.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: minSize + Math.random() * (maxSize - minSize),
          delay: Math.random() * 5,
          duration: 3 + Math.random() * speed,
          rotation: Math.random() * 360
        });
      }
      setSparkles(sparklesArray);
    };

    handleResize(); // Initial setup
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [minSize, maxSize, speed, particleDensity]);

  return (
    <>
      <div 
        className={`sparkles-container fixed inset-0 pointer-events-none z-0 ${className}`} // FIXED: fixed + z-0
        style={{ background }}
      >
        <div className="sparkles absolute inset-0">
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className={`spark absolute bg-gradient-to-t ${particleColor} rounded-full opacity-80`} // INCREASED opacity
              style={{
                left: `${sparkle.x}px`,
                top: `${sparkle.y}px`,
                width: `${particleSize + sparkle.size}px`,
                height: `${particleSize + sparkle.size}px`,
                animationDelay: `${sparkle.delay}s`,
                animationDuration: `${sparkle.duration}s`,
                transform: `rotate(${sparkle.rotation}deg)`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.9; // INCREASED opacity
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-150vh) rotate(360deg); // INCREASED distance
            opacity: 0;
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .sparkles-container {
          overflow: visible !important; // FIXED: No overflow hidden
        }
        
        .spark {
          animation: float linear infinite;
        }
      `}</style>
    </>
  );
}