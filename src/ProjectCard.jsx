import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function ProjectCard({ title, description, tags, delay = 0, imageSrc, link, linkText, onImageClick }) {
  const cardRef = useRef(null);
  const borderRef = useRef(null);
  const contentRef = useRef(null);
  const tagRefs = useRef([]);
  const imageRef = useRef(null);

  // Custom Cursor for Image Container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  const iconScale = useMotionValue(0);
  const springScale = useSpring(iconScale, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const card = cardRef.current;
    const border = borderRef.current;
    const content = contentRef.current;
    const tagsArr = tagRefs.current;
    const img = imageRef.current;

    // Reset initial states for GSAP
    gsap.set(content.children, { y: 20, opacity: 0 });
    gsap.set(tagsArr, { scale: 0, opacity: 0 });
    if (img) gsap.set(img, { scale: 1.05, opacity: 0 });
    
    // Calculate total length of the rect path for drawing effect
    const pathLength = border.getTotalLength();
    gsap.set(border, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    // Create a GSAP timeline linked to ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      delay: delay
    });

    // 1. Line Drawing
    tl.to(border, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: 'power2.inOut',
    });
    
    // 1.5 Image fade in (if applicable)
    if (img) {
      tl.to(img, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=1.0');
    }

    // 2. Cascade Appearance (Fade and Slide up)
    tl.to(content.children, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
    }, '-=0.5')
    // 3. Scale and Bounce Tags
    .to(tagsArr, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    }, '-=0.3');

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden group transition-transform duration-300 block ${
        imageSrc ? 'rounded-[2.5rem] flex flex-col lg:flex-row mb-12' : 'rounded-3xl'
      }`}
    >
      {/* SVG Border Overlay */}
      <svg className={`absolute inset-0 w-full h-full pointer-events-none ${imageSrc ? 'rounded-[2.5rem]' : 'rounded-3xl'}`}>
        <rect
          ref={borderRef}
          x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)"
          rx={imageSrc ? "40" : "24"} ry={imageSrc ? "40" : "24"}
          fill="none"
          stroke="rgba(59, 130, 246, 0.5)"
          strokeWidth="2"
          className="dark:stroke-blue-500"
        />
      </svg>

      {imageSrc && (
        <div 
          className="lg:w-3/5 overflow-hidden bg-slate-50/20 dark:bg-slate-950/20 flex items-center justify-center p-6 lg:p-8 relative z-10 cursor-none"
          onClick={onImageClick}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
          }}
          onMouseEnter={() => iconScale.set(1)}
          onMouseLeave={() => iconScale.set(0)}
        >
          <img
            ref={imageRef}
            src={imageSrc}
            alt={title}
            className="w-full h-auto rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.06)] transition-transform duration-700 group-hover:scale-[1.02]"
            draggable={false}
          />
          <motion.div
            className="absolute pointer-events-none flex items-center justify-center w-14 h-14 rounded-full bg-white/30 dark:bg-slate-900/40 backdrop-blur-md border border-white/60 dark:border-slate-600 shadow-xl z-20 text-slate-800 dark:text-white"
            style={{
              x: springX,
              y: springY,
              scale: springScale,
              translateX: "-50%",
              translateY: "-50%",
              top: 0,
              left: 0,
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>
        </div>
      )}

      <div className={`${imageSrc ? 'lg:w-2/5 p-8 md:p-12' : 'p-8 h-full'} backdrop-blur-md bg-white/40 dark:bg-slate-900/40 border border-transparent shadow-[0_15px_35px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col justify-between relative z-10`}>
        <div ref={contentRef}>
          <h4 className={`${imageSrc ? 'text-3xl' : 'text-xl'} font-extrabold text-slate-800 dark:text-white mb-3 tracking-tight leading-tight`}>
            {title}
          </h4>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
            {description}
          </p>
          {link && linkText && (
              <div className="mb-6">
               <motion.a 
                 href={link} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="build-btn group relative inline-flex items-center justify-center px-6 py-2.5 rounded-full overflow-hidden font-bold text-sm text-blue-600 dark:text-blue-400 no-underline"
                 initial="rest"
                 whileHover="hover"
               >
                 <span className="build-text relative z-10 flex items-center">
                   {linkText}
                   <motion.svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <motion.path 
                       d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
                       fill="transparent"
                       variants={{
                         rest: { pathLength: 0, opacity: 0, fill: "transparent" },
                         hover: { pathLength: 1, opacity: 1, fill: "rgba(255,255,255,0.2)", transition: { pathLength: { duration: 1.5, ease: "easeInOut" }, opacity: { duration: 0.2 }, fill: { delay: 1.5, duration: 0.5 } } }
                       }}
                     />
                     <motion.path 
                       d="M15 3h6v6M10 14L21 3"
                       fill="none"
                       variants={{
                         rest: { pathLength: 0, opacity: 0 },
                         hover: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }
                       }}
                     />
                   </motion.svg>
                 </span>
                 <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-full">
                   <rect x="0" y="0" width="100%" height="100%" rx="999" fill="none" stroke="currentColor" strokeWidth="2" className="build-border" />
                 </svg>
                 <div className="build-fill absolute inset-0 bg-blue-600 dark:bg-blue-500 rounded-full z-0"></div>
               </motion.a>
             </div>
          )}
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, i) => (
              <span
                key={i}
                ref={(el) => (tagRefs.current[i] = el)}
                className="px-3 py-1 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-100/50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
