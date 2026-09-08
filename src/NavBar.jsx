import React, { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: 'Inicio', labelEN: 'Home' },
  { id: 'about', label: 'Sobre Mí', labelEN: 'About' },
  { id: 'skills', label: 'Habilidades', labelEN: 'Skills' },
  { id: 'experience', label: 'Experiencia', labelEN: 'Experience' },
  { id: 'projects', label: 'Proyectos', labelEN: 'Projects' },
  { id: 'stats', label: 'Estadísticas', labelEN: 'Stats' },
];

export default function NavBar({ lang }) {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Triggers when section is halfway through the viewport
        threshold: 0
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-xl bg-white/60 dark:bg-slate-900/40 border border-white/80 dark:border-slate-700/50 shadow-[0_8px_32px_rgba(31,38,135,0.06),inset_0_1px_1px_rgba(255,255,255,0.8)]">
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => handleClick(e, section.id)}
            className={`relative px-4 py-2 rounded-full font-bold transition-all duration-300 ${
              isActive 
                ? 'text-blue-600 dark:text-blue-400 bg-white/80 dark:bg-slate-800/80 shadow-sm' 
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800/40'
            }`}
          >
            <span className="relative z-10">{lang === 'ES' ? section.label : section.labelEN}</span>
            {/* Active underline indicator */}
            {isActive && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-blue-500 rounded-full"></span>
            )}
          </a>
        );
      })}
    </nav>
  );
}
