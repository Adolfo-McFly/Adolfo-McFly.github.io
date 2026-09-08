import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function AboutMe({ title, text, handleMouseMoveGlow }) {
  const ref = useRef(null);
  
  // Motion values for tracking mouse
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth springs for rotation
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Map motion values to rotation degrees
  // If mouse is at top (y=0), rotateX should be positive (tilts up)
  // If mouse is at right (x=1), rotateY should be positive (tilts right)
  const rotateX = useTransform(smoothY, [0, 1], [10, -10]);
  const rotateY = useTransform(smoothX, [0, 1], [-10, 10]);

  const handleMouseMoveLocal = (e) => {
    // Ignore if user is dragging/selecting text
    if (e.buttons > 0) return;
    
    // Also trigger the parent's glow effect
    if (handleMouseMoveGlow) handleMouseMoveGlow(e);
    
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    // Reset to center
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.section 
      id="about"
      ref={ref}
      onPointerMove={handleMouseMoveLocal}
      onPointerLeave={handleMouseLeave}
      onPointerCancel={handleMouseLeave}
      onPointerUp={handleMouseLeave}
      onDragStart={(e) => e.preventDefault()}
      className="relative rounded-3xl p-8 md:p-12 backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/60 dark:border-slate-700/50 shadow-[0_8px_32px_rgba(31,38,135,0.04),inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group cursor-default"
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" style={{ background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(59, 130, 246, 0.1), transparent 80%)` }} />
      
      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mb-4 border-b border-blue-500/30 pb-2">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
          {text}
        </p>
      </div>
    </motion.section>
  );
}
