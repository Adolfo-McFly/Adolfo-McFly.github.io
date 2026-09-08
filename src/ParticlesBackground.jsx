import React, { useEffect, useState } from 'react';

const programmingTerms = [
  '< />', '{ }', '=>', 'div', 'import', 'const', 'function', 'class', '()', ';;',
  'return', 'if', 'else', 'await', 'async', 'try', 'catch', 'let', 'var', 'React',
  'SQL', 'API', 'JSON', 'NaN', 'undefined', 'null', 'true', 'false', '0101'
];

export default function ParticlesBackground() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      text: programmingTerms[Math.floor(Math.random() * programmingTerms.length)],
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 1.5 + 0.5, // rem
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 40 + 30, // seconds (slow)
      delay: Math.random() * -40, // negative delay so they start moving immediately
      directionX: Math.random() > 0.5 ? 100 : -100,
      directionY: Math.random() > 0.5 ? 100 : -100,
      rotation: Math.random() * 360,
      popping: false
    }));
    setParticles(newParticles);
  }, []);

  const handlePop = (id) => {
    setParticles(prev => 
      prev.map(p => p.id === id ? { ...p, popping: true } : p)
    );
    // Optional: remove it after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 600); // match animation duration
  };

  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Don't pop if clicking on interactive elements or solid cards
      if (e.target.closest('a, button, [role="button"], img, .bg-white, .dark\\:bg-slate-900')) {
        return;
      }
      
      const particleEls = document.querySelectorAll('.particle-el:not(.popping)');
      let minDistance = Infinity;
      let closestId = null;

      particleEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
          closestId = parseInt(el.getAttribute('data-id'), 10);
        }
      });

      if (closestId !== null) {
        handlePop(closestId);
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <div className="fixed inset-0 z-[0] overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          data-id={p.id}
          className="particle-el absolute pointer-events-auto cursor-pointer transition-transform"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            animation: `float-particle ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            '--dir-x': `${p.directionX}vw`,
            '--dir-y': `${p.directionY}vh`,
          }}
        >
          <div
            onClick={() => !p.popping && handlePop(p.id)}
            className={`font-mono font-bold whitespace-nowrap select-none origin-center
              ${p.popping ? 'pop-bubble popping' : ''}
              text-slate-400 dark:text-blue-500/30`}
            style={{
              fontSize: `${p.size}rem`,
              opacity: p.opacity,
            }}
          >
            {p.text}
          </div>
        </div>
      ))}
    </div>
  );
}
