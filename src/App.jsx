import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import ProfileScanner from './ProfileScanner';
import TechnicalSkills from './TechnicalSkills';
import NavBar from './NavBar';
import ProjectCard from './ProjectCard';
import AboutMe from './AboutMe';
import TiltWrapper from './TiltWrapper';

// DICCIONARIO DE TRADUCCIONES (ESPAÑOL / INGLÉS)
const translations = {
  ES: {
    langBtn: 'EN',
    subtitle: 'Ingeniero en Sistemas | Desarrollador Full-Stack',
    sectionDocumentation: 'Documentación',
    btnDownloadCV: 'Ver CV',
    btnDownloadLetter: 'Referencias',
    mainProjectsTitle: 'Proyectos Principales',
    otherWebsitesTitle: 'Otros Sitios Web',
    techLabel: 'Tecnologías:',
    viewProject: 'Ver Proyecto',
    visitWeb: 'Visitar Sitio Web',
    footerText: '© 2026 Adolfo Pérez León. Creado con React y Tailwind CSS.',

    // CV Sections
    aboutMeTitle: 'Sobre Mí',
    aboutMeText: 'Ingeniero en Sistemas y Comunicaciones enfocado en el desarrollo de software Full Stack y la resolución de problemas tecnológicos. Cuento con experiencia en el diseño, desarrollo e implementación de aplicaciones web. Poseo un dominio sólido en múltiples lenguajes de programación, frameworks y gestión de bases de datos SQL, complementado con experiencia práctica en soporte técnico, configuración de redes y automatización de procesos. Orientado a la resolución analítica de problemas, integrando herramientas de Inteligencia Artificial para optimizar procesos y entregar soluciones tecnológicas escalables y eficientes.',
    skillsTitle: 'Habilidades Técnicas',
    experienceTitle: 'Experiencia',
    educationTitle: 'Educación',
    educationText: 'UAEM Valle de México (Agosto 2021 – Junio 2026) - Ingeniería en Sistemas y Comunicaciones. Egresado.',
    languagesTitle: 'Idiomas',
    languagesText: 'Español: Nativo. Inglés: Intermedio - Técnico.',

    expList: [
      {
        title: 'Consultor JR / Desarrollador Full Stack',
        company: 'EsoftPasion (Enero 2026 – Actualidad)',
        bullets: [
          'Coordinación y gestión de proyectos de desarrollo de software en colaboración con stakeholders técnicos.',
          'Responsable de asegurar el cumplimiento de requerimientos, optimizar tiempos de entrega, gestionar recursos y brindar soporte directo en el despliegue de sistemas en entornos de producción para garantizar la estabilidad operativa.',
          'Desarrollo integral (Backend y Frontend) de sitios web y aplicaciones orientadas a optimizar los procesos de PyMES.'
        ]
      }
    ],

    specialtyTitle: 'Mi especialidad',
    specialties: [
      {
        title: 'Software Desarrollo',
        subtitle: 'Dart, Python, Java, JavaScript, TypeScript',
        desc: 'Con experiencia tanto en metodologías funcionales como en Programación Orientada a Objetos (POO) estructurando bases de datos SQL y lógica backend.'
      },
      {
        title: 'Desarrollo frontend',
        subtitle: 'React, NextJS, Tailwind CSS',
        desc: 'Apasionado por el diseño UI/UX. Creación de interfaces web sumamente interactivas, dinámicas y maquetación visual adaptada a todos los dispositivos.'
      },
      {
        title: 'Flutter Dev / Expo',
        subtitle: 'Android, iOS, Multiplataforma',
        desc: 'Capacitado en el desarrollo de aplicaciones móviles híbridas y soluciones de software moderno para dispositivos móviles.'
      }
    ],

    projects: {
      nedimiPosCloud: {
        title: 'NedimiPOS - Sistema en la Nube',
        description: 'Sistema de punto de venta desarrollado 100% desde cero. Abarca todo el ciclo de desarrollo (Backend y Frontend). Cuenta con especificaciones completas para la gestión de inventarios, ventas, cortes de caja y administración de usuarios en tiempo real.',
        tags: ['SaaS', 'Full Stack']
      },
      nedimiPosLanding: {
        title: 'NedimiPOS - Landing & Pagos',
        description: 'Desarrollo del sitio web oficial. Implementé la conexión segura del formulario de contacto y registro hacia el servidor y la base de datos SQL. Además, realicé la integración con la API de Stripe para gestionar los pagos y suscripciones de los planes. Este proyecto representa una solución integral que abarca desde la recolección de clientes potenciales hasta el procesamiento de pagos automatizados, asegurando una experiencia de usuario fluida, optimizada y completamente segura.',
        tags: ['Web Corporativa', 'Stripe API']
      },
      moneyBridge: {
        title: 'The Money Bridge',
        description: 'Plataforma financiera donde lideré el diseño de interfaz y la maquetación visual. Diseñé una experiencia de usuario (UI/UX) sumamente interactiva utilizando React y Tailwind CSS, logrando un frontend moderno y dinámico.'
      },
      esoftpasion: {
        title: 'EsoftPasion',
        description: 'Sitio corporativo de desarrollo de software. Realicé la conceptualización de diseño UI/UX, maquetación adaptativa y la implementación frontend completa. Creé componentes fluidos con efectos 3D y transiciones con React y Tailwind.'
      },
      nedimi: {
        title: 'Nedimi',
        description: 'Página web de presentación de servicios tecnológicos y consultoría. Diseñé una interfaz minimalista basada en la experiencia de usuario, optimizando el rendimiento, tiempo de carga y maquetación móvil con React y Tailwind CSS.'
      },
      dolphinNedimi: {
        title: 'V2Dolphin',
        description: 'Sofisticada aplicación de control y monitoreo. Mi enfoque principal estuvo en el diseño visual de la interfaz de usuario, la maquetación detallada de paneles y el desarrollo frontend en React y Tailwind CSS, garantizando una excelente usabilidad en cualquier dispositivo.'
      }
    }
  },
  EN: {
    langBtn: 'ES',
    subtitle: 'Systems Engineer | Full-Stack Developer',
    sectionDocumentation: 'Documentation',
    btnDownloadCV: 'View CV',
    btnDownloadLetter: 'References',
    mainProjectsTitle: 'Key Projects',
    otherWebsitesTitle: 'Other Websites',
    techLabel: 'Technologies:',
    viewProject: 'View Project',
    visitWeb: 'Visit Website',
    footerText: '© 2026 Adolfo Pérez León. Built with React and Tailwind CSS.',

    // CV Sections
    aboutMeTitle: 'About Me',
    aboutMeText: 'Systems and Communications Engineer focused on Full Stack software development and technical problem solving. Experienced in design, development, and implementation of web applications. Proficient in multiple programming languages, frameworks, and SQL databases, complemented by practical skills in tech support, networking, and process automation. Analytics-driven and oriented towards scalable and efficient technological solutions using AI integrations.',
    skillsTitle: 'Technical Skills',
    experienceTitle: 'Experience',
    educationTitle: 'Education',
    educationText: 'UAEM Valle de México (August 2021 – June 2026) - Systems and Communications Engineering. Graduated.',
    languagesTitle: 'Languages',
    languagesText: 'Spanish: Native. English: Intermediate - Technical.',

    expList: [
      {
        title: 'Junior Consultant / Full Stack Developer',
        company: 'EsoftPasion (January 2026 – Present)',
        bullets: [
          'Coordination and management of software development projects in collaboration with technical stakeholders.',
          'Responsible for ensuring requirements compliance, optimizing delivery times, managing resources, and deploying production environments to guarantee operational stability.',
          'End-to-end development (Backend & Frontend) of websites and systems tailored to optimize small business processes.'
        ]
      }
    ],

    specialtyTitle: 'My Specialty',
    specialties: [
      {
        title: 'Software Development',
        subtitle: 'Dart, Python, Java, JavaScript, TypeScript',
        desc: 'Experienced in functional and Object-Oriented Programming (OOP) structuring relational SQL databases and backend logic.'
      },
      {
        title: 'Frontend Development',
        subtitle: 'React, NextJS, Tailwind CSS',
        desc: 'Passionate about UI/UX design. Building highly interactive web interfaces, smooth animations, and visual layouts tailored to all screen sizes.'
      },
      {
        title: 'Flutter Dev / Expo',
        subtitle: 'Android, iOS, Cross-platform',
        desc: 'Skilled in cross-platform mobile application development and modern multiplatform software solutions.'
      }
    ],

    projects: {
      nedimiPosCloud: {
        title: 'NedimiPOS - Cloud System',
        description: 'Point of sale system developed 100% from scratch. Covers the entire development lifecycle (Backend and Frontend). It features comprehensive tools for inventory management, sales, cash registers, and real-time user management.',
        tags: ['SaaS', 'Full Stack']
      },
      nedimiPosLanding: {
        title: 'NedimiPOS - Landing & Payments',
        description: 'Official corporate website design and setup. Implemented secure connection for registration and contact forms to the server and SQL database. Integrated Stripe API for user subscription plans and billing management.',
        tags: ['Corporate Web', 'Stripe API']
      },
      moneyBridge: {
        title: 'The Money Bridge',
        description: 'Financial platform where I led the UI design and layout architecture. I focused on building an extremely interactive user experience (UI/UX) using React and Tailwind CSS, achieving a modern and dynamic frontend.'
      },
      esoftpasion: {
        title: 'EsoftPasion',
        description: 'Corporate website for software services. Responsible for UI/UX concept designs, responsive layouts, and full frontend implementation. Created fluid reusable components with sleek 3D effects using React and Tailwind.'
      },
      nedimi: {
        title: 'Nedimi',
        description: 'Landing showcase for technological and consulting services. I designed a minimalist, user-centric interface, optimizing response times, overall performance, and mobile responsive layout using React and Tailwind CSS.'
      },
      dolphinNedimi: {
        title: 'V2Dolphin',
        description: 'Sophisticated control and monitoring dashboard. My primary focus was on the visual design of the interface, highly detailed layouts for panels, and React & Tailwind frontend development to ensure seamless usability.'
      }
    }
  }
};

const skillsCategories = [
  {
    name: 'Lenguajes y BD',
    items: ['SQL', 'PHP', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++']
  },
  {
    name: 'Frontend & Apps',
    items: ['React', 'Tailwind CSS', 'Expo (Android)', 'HTML', 'WordPress', 'FastAPI']
  },
  {
    name: 'Herramientas',
    items: ['Git', 'GitHub', 'XAMPP', 'VS Code', 'Antigravity', 'UI/UX']
  }
];

function App() {
  const [lang, setLang] = useState('ES');
  const [darkMode, setDarkMode] = useState(false);
  const [imagenAmpliacion, setImagenAmpliacion] = useState(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [heroState, setHeroState] = useState('typewriter');

  useEffect(() => {
    // 4-step animation sequence for hero name
    const t1 = setTimeout(() => setHeroState('typewriter-bracket'), 3500); // Add "}"
    const t2 = setTimeout(() => setHeroState('deleting-bracket'), 4500); // Delete "}"
    const t3 = setTimeout(() => setHeroState('glow'), 5000); // Start glow

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); }
  }, []);

  // Intersection Observer for Slide Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll('.slide-in-right');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const t = translations[lang];

  // Alterna entre Español e Inglés
  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ES' ? 'EN' : 'ES'));
  };

  // Alterna Modo Oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Aplica clase .dark al elemento <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Bloqueo de scroll y eventos de teclado para el Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (imagenAmpliacion) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [imagenAmpliacion]);

  const handleClose = () => {
    setImagenAmpliacion(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e) => {
    const delta = e.deltaY < 0 ? 0.2 : -0.2;
    const newScale = Math.min(Math.max(1, scale + delta), 4);
    setScale(newScale);

    if (newScale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Manejador del cursor glow dinámico para las tarjetas
  const handleMouseMoveGlow = (e) => {
    if (e.buttons > 0) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="relative min-h-screen pb-16 font-sans transition-colors duration-300">
      <NavBar lang={lang} />

      {/* Botones de control flotantes en la esquina superior derecha */}
      <div className="fixed top-6 right-6 z-40 flex items-center gap-3">
        {/* Modo Oscuro Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-full text-slate-800 dark:text-slate-200 transition-all duration-300 backdrop-blur-xl bg-white/60 dark:bg-slate-900/40 border border-white/80 dark:border-slate-700/50 shadow-[0_8px_32px_rgba(31,38,135,0.06),inset_0_1px_1px_rgba(255,255,255,0.8)] hover:bg-white/80 dark:hover:bg-slate-800/60 hover:scale-105 active:scale-95 cursor-pointer"
          title={darkMode ? (lang === 'ES' ? 'Modo Claro' : 'Light Mode') : (lang === 'ES' ? 'Modo Oscuro' : 'Dark Mode')}
        >
          {darkMode ? (
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Idioma Toggle */}
        <button
          onClick={toggleLanguage}
          className="relative px-5 py-2.5 rounded-full font-bold text-slate-800 dark:text-slate-200 transition-all duration-300 backdrop-blur-xl bg-white/60 dark:bg-slate-900/40 border border-white/80 dark:border-slate-700/50 shadow-[0_8px_32px_rgba(31,38,135,0.06),inset_0_1px_1px_rgba(255,255,255,0.8)] hover:bg-white/85 dark:hover:bg-slate-800/60 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 group overflow-hidden"
          title={lang === 'ES' ? 'Cambiar a Inglés' : 'Switch to Spanish'}
        >
          <span className="relative z-10">{t.langBtn}</span>
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse relative z-10"></span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      {/* --- MODAL PARA EXPANDIR IMÁGENES --- */}
      {imagenAmpliacion && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 overflow-hidden"
          onClick={handleClose}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-white text-5xl font-light hover:text-blue-400 transition-colors z-[60] cursor-pointer"
            title="Cerrar (Esc)"
          >
            &times;
          </button>

          <div className="relative max-w-full max-h-full flex items-center justify-center overflow-visible">
            <img
              src={imagenAmpliacion}
              alt="Vista ampliada"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
              }}
              className={`max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl select-none ${scale === 1 ? 'cursor-zoom-in' : isDragging ? 'cursor-grabbing' : 'cursor-grab'
                }`}
              title={scale === 1 ? (lang === 'ES' ? 'Usa la rueda del mouse para hacer Zoom' : 'Use mouse wheel to zoom') : (lang === 'ES' ? 'Arrastra para moverte' : 'Drag to pan')}
              draggable={false}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => {
                e.stopPropagation();
                handleWheel(e);
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                handleMouseDown(e);
              }}
              data-visualsearch="false"
            />
          </div>
        </div>
      )}

      {/* Fondo de partículas */}
      <ParticlesBackground />

      {/* Cabecera */}
      <header id="hero" className="pt-32 pb-12 px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">

          {/* Foto de perfil */}
          <div className="mb-8 flex justify-center">
            <TiltWrapper className="relative group rounded-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <ProfileScanner
                src="/imagenes/adolfo.jpg"
                alt="Adolfo Pérez León"
                className="relative w-44 h-44 md:w-52 md:h-52 rounded-full border-4 border-white/80 dark:border-slate-800/80 shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]"
                draggable={false}
              />
            </TiltWrapper>
          </div>

          <h1 className={`text-5xl md:text-7xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] ${heroState === 'glow' ? 'animate-glow-pulse' : ''}`}>
            {heroState === 'typewriter' && <span className="inline-block typewriter pr-1">Adolfo Pérez León</span>}
            {heroState === 'typewriter-bracket' && <span className="inline-block pr-1 border-r-[0.15em] border-blue-500/70 animate-[blink-caret_.75s_step-end_infinite]">Adolfo Pérez León{'}'}</span>}
            {heroState === 'deleting-bracket' && <span className="inline-block pr-1 border-r-[0.15em] border-blue-500/70 animate-[blink-caret_.75s_step-end_infinite]">Adolfo Pérez León</span>}
            {heroState === 'glow' && <span>Adolfo Pérez León</span>}
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-10 max-w-2xl mx-auto flex justify-center">
            {heroState === 'typewriter' ? <span className="inline-block typewriter-delayed pr-1">{t.subtitle}</span> : t.subtitle}
          </p>

          {/* Botones de redes y contacto principal (Cristal Esmerilado) */}
          <div className="flex flex-wrap justify-center items-center gap-3.5 mb-10">
            {/* WhatsApp */}
            <a
              href="https://wa.me/525631896280"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center font-bold px-5 py-3 rounded-full text-slate-700 dark:text-slate-200 transition-all duration-300 hover:-translate-y-1 backdrop-blur-lg bg-white/60 dark:bg-slate-900/40 border border-white/80 dark:border-slate-700/50 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:text-green-600 dark:hover:text-green-400 hover:border-green-300"
            >
              <svg className="w-5 h-5 mr-2 whatsapp-icon" viewBox="0 0 24 24">
                <path className="whatsapp-stroke" fill="none" stroke="currentColor" strokeWidth="1" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                <path className="whatsapp-fill" fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/adolfo-león-3528a939a"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center font-bold px-5 py-3 rounded-full text-slate-700 dark:text-slate-200 transition-all duration-300 hover:-translate-y-1 backdrop-blur-lg bg-white/60 dark:bg-slate-900/40 border border-white/80 dark:border-slate-700/50 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300"
            >
              <svg className="w-5 h-5 mr-2 linkedin-icon overflow-visible" viewBox="0 0 24 24">
                <path className="linkedin-bg" fill="currentColor" d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                <path className="linkedin-letters" fill="#ffffff" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
              </svg>
              LinkedIn
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Adolfo-McFly"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center font-bold px-5 py-3 rounded-full text-slate-700 dark:text-slate-200 transition-all duration-300 hover:-translate-y-1 backdrop-blur-lg bg-white/60 dark:bg-slate-900/40 border border-white/80 dark:border-slate-700/50 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:text-slate-900 dark:hover:text-white hover:border-slate-400"
            >
              <svg className="w-5 h-5 mr-2 overflow-visible" viewBox="0 0 24 24">
                <path className="github-stroke" fill="none" stroke="currentColor" strokeWidth="1" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                <path className="github-fill" fill="currentColor" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>

            {/* Email */}
            <motion.a
              href="mailto:adolfopl55@gmail.com"
              className="group inline-flex items-center justify-center font-bold px-5 py-3 rounded-full text-slate-700 dark:text-slate-200 transition-all duration-300 hover:-translate-y-1 backdrop-blur-lg bg-white/60 dark:bg-slate-900/40 border border-white/80 dark:border-slate-700/50 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300"
              initial="rest"
              whileHover="hover"
            >
              <svg className="w-5 h-5 mr-2 overflow-visible" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                
                {/* Envelope Body (Morphs to plane later) */}
                <motion.path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  variants={{
                    rest: { d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7", x: 0, y: 0, scale: 1, opacity: 1 },
                    hover: { 
                      d: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z", // Paper plane path
                      x: 15, y: -15, scale: 0.5, opacity: 0,
                      transition: { duration: 1, ease: "easeOut", delay: 1.2 } 
                    }
                  }}
                />
                
                {/* Paper sliding IN */}
                <motion.path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  variants={{
                    rest: { d: "M5 3h14v10H5z", y: -10, opacity: 1 }, // starts outside
                    hover: { 
                      d: "M5 3h14v10H5z", y: 0, opacity: 0, // slides in, then hides when plane takes off
                      transition: { duration: 0.5, ease: "easeIn", opacity: { delay: 1.2, duration: 0.1 } } 
                    }
                  }}
                />
                
                {/* Flap (Open by default, closes on hover) */}
                <motion.path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M3 7l9 6 9-6"
                  style={{ transformOrigin: "50% 30%" }}
                  variants={{
                    rest: { rotateX: 180, opacity: 1 }, // open
                    hover: { 
                      rotateX: 0, // closes
                      opacity: 0, // hides when plane takes off
                      transition: { duration: 0.4, delay: 0.6, opacity: { delay: 1.2, duration: 0.1 } } 
                    }
                  }}
                />
              </svg>
              Email
            </motion.a>
          </div>

          {/* Sub-sección 'Documentación' */}
          <div className="flex flex-col items-center backdrop-blur-md bg-white/20 dark:bg-slate-900/20 border border-white/30 dark:border-slate-800/30 rounded-2xl p-6 w-full max-w-xl shadow-lg">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              {t.sectionDocumentation}
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {/* Ver CV */}
              <motion.a
                href="/CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center font-bold px-6 py-2.5 rounded-full text-white transition-all duration-300 hover:-translate-y-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md hover:shadow-indigo-500/20 cursor-pointer"
                initial="rest"
                whileHover="hover"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <motion.g variants={{ hover: { scaleY: 0.1, transition: { repeat: 3, repeatType: 'reverse', duration: 0.15 } } }} style={{ transformOrigin: "center" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </motion.g>
                </svg>
                {t.btnDownloadCV}
              </motion.a>

              {/* Referencias */}
              <motion.a
                href="/Referencias.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center font-bold px-6 py-2.5 rounded-full text-slate-700 dark:text-slate-200 transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-lg bg-white/50 dark:bg-slate-900/50 border border-white/60 dark:border-slate-700/60 hover:bg-white/80 dark:hover:bg-slate-800/80 shadow-sm hover:shadow-md cursor-pointer"
                initial="rest"
                whileHover="hover"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  {/* Back Document */}
                  <motion.path 
                    strokeLinecap="round" strokeLinejoin="round" d="M7 7h10v10H7z"
                    variants={{ rest: { x: 0, y: 0 }, hover: { x: 3, y: 3, transition: { type: "spring", stiffness: 300, damping: 20 } } }}
                  />
                  {/* Front Document */}
                  <motion.path 
                    strokeLinecap="round" strokeLinejoin="round" d="M4 4h10v10H4z" fill="var(--tw-bg-opacity, white)" className="fill-white dark:fill-slate-900"
                    variants={{ rest: { x: 0, y: 0 }, hover: { x: -3, y: -3, transition: { type: "spring", stiffness: 300, damping: 20 } } }}
                  />
                </svg>
                {t.btnDownloadLetter}
              </motion.a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="max-w-6xl mx-auto relative z-20 px-4 mt-8">

        {/* Sección: MI ESPECIALIDAD */}
        <section className="mb-24 mt-12">
          <div className="flex items-center justify-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white bg-white/50 dark:bg-slate-900/50 px-8 py-3 rounded-full shadow-[0_8px_32px_rgba(31,38,135,0.05),inset_0_1px_1px_rgba(255,255,255,0.7)] border border-white/60 dark:border-slate-800/60 backdrop-blur-md">
              {t.specialtyTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.specialties.map((spec, idx) => (
              <div
                key={idx}
                onMouseMove={handleMouseMoveGlow}
                className="slide-in-right relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-[0_15px_35px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/50 dark:border-slate-700/50 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.07)] transition-all duration-500 group flex flex-col justify-between cursor-default"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
                  style={{
                    background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(59, 130, 246, 0.12), transparent 80%)`
                  }}
                />

                <div className="relative z-10">
                  {/* Icono representativo */}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 backdrop-blur-sm">
                    {idx === 0 && (
                      <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    {idx === 1 && (
                      <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                      </svg>
                    )}
                    {idx === 2 && (
                      <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-800 dark:text-white mb-2">
                    {spec.title}
                  </h4>
                  <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-4 tracking-wide uppercase">
                    {spec.subtitle}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Nueva Estructura del CV */}
        <div className="mb-24 max-w-4xl mx-auto space-y-12">

          {/* Sobre Mí */}
          <AboutMe 
            title={t.aboutMeTitle} 
            text={t.aboutMeText} 
            handleMouseMoveGlow={handleMouseMoveGlow} 
          />

          {/* Habilidades */}
          <section id="skills">
            <TechnicalSkills categories={skillsCategories} title={t.skillsTitle} />
          </section>

          {/* Experiencia Laboral */}
          <section id="experience"
            onMouseMove={handleMouseMoveGlow}
            className="relative rounded-3xl p-8 backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/60 dark:border-slate-700/50 shadow-[0_8px_32px_rgba(31,38,135,0.04),inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-300 group cursor-default"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" style={{ background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(59, 130, 246, 0.1), transparent 80%)` }} />
            <div className="relative z-10">
              <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-6 border-b border-white/30 dark:border-slate-700/30 pb-2">
                {t.experienceTitle}
              </h3>
              <div className="space-y-6">
                {t.expList.map((exp, idx) => (
                  <div key={idx} className="relative pl-4 border-l-2 border-blue-500/50 dark:border-blue-400/50">
                    <h4 className="text-lg font-bold text-slate-800 dark:text-white leading-snug">
                      {exp.title}
                    </h4>
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">
                      {exp.company}
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {exp.bullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>



        </div>



        {/* Sección: PROYECTOS PRINCIPALES Y OTROS */}
        <section id="projects" className="mb-24">
          <div className="flex items-center justify-center mb-10">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white bg-white/50 dark:bg-slate-900/50 px-8 py-2.5 rounded-full shadow-[0_8px_32px_rgba(31,38,135,0.05),inset_0_1px_1px_rgba(255,255,255,0.7)] border border-white/60 dark:border-slate-800/60 backdrop-blur-md">
              {t.mainProjectsTitle}
            </h2>
          </div>

          <div className="flex flex-col gap-8 mb-16">
            <ProjectCard 
              title={t.projects.nedimiPosCloud.title}
              description={t.projects.nedimiPosCloud.description}
              tags={t.projects.nedimiPosCloud.tags.concat(['PHP', 'JavaScript', 'SQL'])}
              delay={0.1}
              imageSrc="/imagenes/nedimipos.png"
              link="https://nedimipos.com"
              linkText={t.visitWeb}
              onImageClick={() => setImagenAmpliacion('/imagenes/nedimipos.png')}
            />
            <ProjectCard 
              title={t.projects.nedimiPosLanding.title}
              description={t.projects.nedimiPosLanding.description}
              tags={t.projects.nedimiPosLanding.tags.concat(['Stripe API'])}
              delay={0.2}
              imageSrc="/imagenes/nedimi-web.png"
              link="https://nedimipos.com"
              linkText={t.visitWeb}
              onImageClick={() => setImagenAmpliacion('/imagenes/nedimi-web.png')}
            />
          </div>

          <div className="flex items-center justify-center mb-10">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white bg-white/50 dark:bg-slate-900/50 px-8 py-2.5 rounded-full shadow-[0_8px_32px_rgba(31,38,135,0.05),inset_0_1px_1px_rgba(255,255,255,0.7)] border border-white/60 dark:border-slate-800/60 backdrop-blur-md">
              {t.otherWebsitesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TiltWrapper>
              <ProjectCard 
                title={t.projects.moneyBridge.title}
                description={t.projects.moneyBridge.description}
                tags={['React', 'UI/UX Design', 'Tailwind CSS']}
                delay={0.1}
                link="#"
                linkText={t.visitWeb}
              />
            </TiltWrapper>
            <TiltWrapper>
              <ProjectCard 
                title={t.projects.esoftpasion.title}
                description={t.projects.esoftpasion.description}
                tags={['React', 'UI/UX Design', 'Tailwind CSS']}
                delay={0.2}
                link="#"
                linkText={t.visitWeb}
              />
            </TiltWrapper>
            <TiltWrapper>
              <ProjectCard 
                title={t.projects.nedimi.title}
                description={t.projects.nedimi.description}
                tags={['React', 'UI/UX Design', 'Tailwind CSS']}
                delay={0.1}
                link="#"
                linkText={t.visitWeb}
              />
            </TiltWrapper>
            <TiltWrapper>
              <ProjectCard 
                title={t.projects.dolphinNedimi.title}
                description={t.projects.dolphinNedimi.description}
                tags={['React', 'UI/UX Design', 'Tailwind CSS']}
                delay={0.2}
                link="#"
                linkText={t.visitWeb}
              />
            </TiltWrapper>
          </div>
        </section>

        {/* --- SECCIÓN ESTADÍSTICAS REUBICADA --- */}
        <section id="stats" className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Tarjeta 1 */}
            <div className="animate-float-rotate relative group cursor-default p-8 rounded-[2rem] bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col items-center justify-center overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50 dark:from-[#0f172a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative mb-6 w-[88px] h-[88px] rounded-full border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center">
                <div className="absolute inset-2 border border-dotted border-slate-200 dark:border-slate-600 rounded-full animate-[spin_10s_linear_infinite]"></div>
                {/* 3D Browser SVG */}
                <svg className="w-10 h-10 text-[#38bdf8] relative z-10 drop-shadow-[0_5px_10px_rgba(56,189,248,0.5)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="20" height="16" rx="2" fill="url(#paint0_linear)" stroke="currentColor" strokeWidth="2"/>
                  <path d="M6 8H7M9 8H10M12 8H13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M2 12H22" stroke="currentColor" strokeWidth="2"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="12" y1="4" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#38bdf8" stopOpacity="0.2"/>
                      <stop offset="1" stopColor="#0284c7" stopOpacity="0.8"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              <h3 className="text-[3.5rem] leading-none font-black text-[#38bdf8] mb-3 drop-shadow-[0_0_20px_rgba(56,189,248,0.6)] tracking-tighter">7</h3>
              <p className="text-[10px] tracking-[0.2em] font-bold text-slate-500 dark:text-slate-300 uppercase">Páginas web concluidas</p>
            </div>

            {/* Tarjeta 2 */}
            <div className="animate-float-rotate relative group cursor-default p-8 rounded-[2rem] bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col items-center justify-center overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50" style={{ animationDelay: '2s' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 dark:from-[#064e3b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative mb-6 w-[88px] h-[88px] rounded-full border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center">
                <div className="absolute inset-2 border border-dotted border-slate-200 dark:border-slate-600 rounded-full animate-[spin_10s_linear_infinite]"></div>
                {/* 3D Cube SVG */}
                <svg className="w-10 h-10 text-[#10b981] relative z-10 drop-shadow-[0_5px_10px_rgba(16,185,129,0.5)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#paint1_linear)" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M2 7V17L12 22V12L2 7Z" fill="url(#paint2_linear)" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M22 7V17L12 22V12L22 7Z" fill="url(#paint3_linear)" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="paint1_linear" x1="12" y1="2" x2="12" y2="12" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#34d399" stopOpacity="0.8"/>
                      <stop offset="1" stopColor="#059669" stopOpacity="0.4"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear" x1="7" y1="7" x2="7" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#10b981" stopOpacity="0.6"/>
                      <stop offset="1" stopColor="#047857" stopOpacity="0.9"/>
                    </linearGradient>
                    <linearGradient id="paint3_linear" x1="17" y1="7" x2="17" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#059669" stopOpacity="0.8"/>
                      <stop offset="1" stopColor="#064e3b" stopOpacity="1"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              <h3 className="text-[3.5rem] leading-none font-black text-[#10b981] mb-3 drop-shadow-[0_0_20px_rgba(16,185,129,0.6)] tracking-tighter">1</h3>
              <p className="text-[10px] tracking-[0.2em] font-bold text-slate-500 dark:text-slate-300 uppercase">Proyectos generales</p>
            </div>

            {/* Tarjeta 3 */}
            <div className="animate-float-rotate relative group cursor-default p-8 rounded-[2rem] bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col items-center justify-center overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50" style={{ animationDelay: '4s' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-purple-50 dark:from-[#4c1d95]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative mb-6 w-[88px] h-[88px] rounded-full border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center">
                <div className="absolute inset-2 border border-dotted border-slate-200 dark:border-slate-600 rounded-full animate-[spin_10s_linear_infinite]"></div>
                {/* 3D Shield SVG */}
                <svg className="w-10 h-10 text-[#fb923c] relative z-10 drop-shadow-[0_5px_10px_rgba(251,146,60,0.5)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="url(#paint4_linear)" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M12 8V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="paint4_linear" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#fb923c" stopOpacity="0.4"/>
                      <stop offset="1" stopColor="#c084fc" stopOpacity="0.9"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              <h3 className="text-[3.5rem] leading-none font-black text-[#c084fc] mb-3 drop-shadow-[0_0_20px_rgba(192,132,252,0.6)] tracking-tighter">ACTIVO</h3>
              <p className="text-[10px] tracking-[0.2em] font-bold text-slate-500 dark:text-slate-300 uppercase">Auditorías / Admin. Sistemas</p>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-10 text-slate-400 dark:text-slate-500 text-sm relative z-20 flex flex-col items-center">
        <p className="bg-white/30 dark:bg-slate-900/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/40 dark:border-slate-800/40 inline-block shadow-sm mb-8">
          {t.footerText}
        </p>

        <motion.div 
          className="flex justify-center items-center gap-4"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
        >
          {/* WhatsApp */}
          <motion.div variants={{ hidden: { y: -80, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.6, duration: 1 } } }}>
            <a href="https://wa.me/525631896280" target="_blank" rel="noreferrer" className="group flex items-center justify-center p-4 rounded-full text-slate-700 dark:text-slate-200 transition-all duration-300 hover:-translate-y-1 backdrop-blur-lg bg-white/60 dark:bg-slate-900/40 border border-white/80 dark:border-slate-700/50 shadow-md hover:text-green-600 dark:hover:text-green-400 hover:border-green-300">
              <svg className="w-6 h-6 whatsapp-icon" viewBox="0 0 24 24">
                <path className="whatsapp-stroke" fill="none" stroke="currentColor" strokeWidth="1" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                <path className="whatsapp-fill" fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </motion.div>

          {/* LinkedIn */}
          <motion.div variants={{ hidden: { y: -80, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.6, duration: 1 } } }}>
            <a href="https://www.linkedin.com/in/adolfo-león-3528a939a" target="_blank" rel="noreferrer" className="group flex items-center justify-center p-4 rounded-full text-slate-700 dark:text-slate-200 transition-all duration-300 hover:-translate-y-1 backdrop-blur-lg bg-white/60 dark:bg-slate-900/40 border border-white/80 dark:border-slate-700/50 shadow-md hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300">
              <svg className="w-6 h-6 linkedin-icon overflow-visible" viewBox="0 0 24 24">
                <path className="linkedin-bg" fill="currentColor" d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                <path className="linkedin-letters" fill="#ffffff" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
              </svg>
            </a>
          </motion.div>

          {/* GitHub */}
          <motion.div variants={{ hidden: { y: -80, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.6, duration: 1 } } }}>
            <a href="https://github.com/Adolfo-McFly" target="_blank" rel="noreferrer" className="group flex items-center justify-center p-4 rounded-full text-slate-700 dark:text-slate-200 transition-all duration-300 hover:-translate-y-1 backdrop-blur-lg bg-white/60 dark:bg-slate-900/40 border border-white/80 dark:border-slate-700/50 shadow-md hover:text-slate-900 dark:hover:text-white hover:border-slate-400">
              <svg className="w-6 h-6 overflow-visible" viewBox="0 0 24 24">
                <path className="github-stroke" fill="none" stroke="currentColor" strokeWidth="1" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                <path className="github-fill" fill="currentColor" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </motion.div>

          {/* Email */}
          <motion.div variants={{ hidden: { y: -80, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.6, duration: 1 } } }}>
            <motion.a
              href="mailto:adolfopl55@gmail.com"
              className="group flex items-center justify-center p-4 rounded-full text-slate-700 dark:text-slate-200 transition-all duration-300 hover:-translate-y-1 backdrop-blur-lg bg-white/60 dark:bg-slate-900/40 border border-white/80 dark:border-slate-700/50 shadow-md hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300"
              initial="rest"
              whileHover="hover"
            >
              <svg className="w-6 h-6 overflow-visible" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <motion.path 
                  strokeLinecap="round" strokeLinejoin="round" 
                  variants={{
                    rest: { d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7", x: 0, y: 0, scale: 1, opacity: 1 },
                    hover: { d: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z", x: 15, y: -15, scale: 0.5, opacity: 0, transition: { duration: 1, ease: "easeOut", delay: 1.2 } }
                  }}
                />
                <motion.path 
                  strokeLinecap="round" strokeLinejoin="round" 
                  variants={{
                    rest: { d: "M5 3h14v10H5z", y: -10, opacity: 1 },
                    hover: { d: "M5 3h14v10H5z", y: 0, opacity: 0, transition: { duration: 0.5, ease: "easeIn", opacity: { delay: 1.2, duration: 0.1 } } }
                  }}
                />
                <motion.path 
                  strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" style={{ transformOrigin: "50% 30%" }}
                  variants={{
                    rest: { rotateX: 180, opacity: 1 },
                    hover: { rotateX: 0, opacity: 0, transition: { duration: 0.4, delay: 0.6, opacity: { delay: 1.2, duration: 0.1 } } }
                  }}
                />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
}

export default App;