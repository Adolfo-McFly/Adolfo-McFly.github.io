import React, { useEffect, useState, useRef } from 'react';

export default function TechnicalSkills({ categories, title }) {
  const [isAssembled, setIsAssembled] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Start assembled after a short delay or when scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsAssembled(true), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative rounded-[2rem] p-8 md:p-12 backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/60 dark:border-slate-700/50 shadow-[0_8px_32px_rgba(31,38,135,0.04),inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-300 overflow-hidden"
    >
      <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">
        {title}
      </h3>

      <div className="space-y-8">
        {categories.map((cat, categoryIdx) => (
          <div key={categoryIdx}>
            <h5 className="text-sm font-black text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-[0.15em]">
              {cat.name}
            </h5>
            <div className="flex flex-wrap gap-3">
              {cat.items.map((skill, skillIdx) => {
                // Calculate a random starting position far off-center
                const randomX = (Math.random() - 0.5) * 200; // -100vw to 100vw roughly
                const randomY = (Math.random() - 0.5) * 200; // -100vh to 100vh roughly
                const randomRot = (Math.random() - 0.5) * 180;

                return (
                  <span
                    key={skill}
                    className="inline-block px-5 py-2.5 rounded-full text-sm font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{
                      transform: isAssembled 
                        ? 'translate(0, 0) rotate(0deg)' 
                        : `translate(${randomX}vw, ${randomY}vh) rotate(${randomRot}deg)`,
                      opacity: isAssembled ? 1 : 0,
                      transitionDelay: `${(categoryIdx * 5 + skillIdx) * 50}ms`
                    }}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
