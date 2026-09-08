import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function AboutMe({ title, text, handleMouseMoveGlow }) {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Motion values for tracking rotation directly
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  // Smooth springs for rotation
  const smoothRotateX = useSpring(rawRotateX, { stiffness: 150, damping: 20 });
  const smoothRotateY = useSpring(rawRotateY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const isMobileDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    setIsMobile(isMobileDevice);

    if (isMobileDevice) {
      const handleOrientation = (event) => {
        if (event.beta === null || event.gamma === null) return;
        
        // Limita matemáticamente los valores para evitar que dé la vuelta completa
        const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
        
        // beta es la inclinación adelante/atrás (-180 a 180)
        // Restamos ~45 grados asumiendo una postura típica al sostener el móvil
        const betaVal = clamp(event.beta - 45, -25, 25);
        // gamma es la inclinación izquierda/derecha (-90 a 90)
        const gammaVal = clamp(event.gamma, -25, 25);
        
        // Eje X se controla con beta, eje Y con gamma
        rawRotateX.set(-betaVal);
        rawRotateY.set(gammaVal);
      };

      try {
        window.addEventListener('deviceorientation', handleOrientation);
      } catch (e) {
        console.warn("DeviceOrientation API no disponible:", e);
      }
      
      return () => {
        window.removeEventListener('deviceorientation', handleOrientation);
      };
    }
  }, [rawRotateX, rawRotateY]);

  // Si requiere permisos en iOS 13+ al hacer tap
  const handleCardClick = async () => {
    if (isMobile && typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        await DeviceOrientationEvent.requestPermission();
      } catch (error) {
        console.warn("DeviceOrientation permiso denegado o cancelado:", error);
      }
    }
  };

  const handleMouseMoveLocal = (e) => {
    // Si es móvil, ignoramos el evento de mouse/pointer
    if (isMobile) return;
    
    // Ignore if user is dragging/selecting text
    if (e.buttons > 0) return;
    
    // Also trigger the parent's glow effect
    if (handleMouseMoveGlow) handleMouseMoveGlow(e);
    
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    
    // Mapeo equivalente al useTransform original [0, 1] -> [10, -10]
    rawRotateX.set((0.5 - y) * 20); // y=0: 10, y=1: -10
    rawRotateY.set((x - 0.5) * 20); // x=0: -10, x=1: 10
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    // Reset to center
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <motion.section 
      id="about"
      ref={ref}
      onPointerMove={handleMouseMoveLocal}
      onPointerLeave={handleMouseLeave}
      onPointerCancel={handleMouseLeave}
      onPointerUp={handleMouseLeave}
      onClick={handleCardClick}
      onDragStart={(e) => e.preventDefault()}
      className="relative rounded-3xl p-8 md:p-12 backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/60 dark:border-slate-700/50 shadow-[0_8px_32px_rgba(31,38,135,0.04),inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group cursor-default"
      style={{ rotateX: smoothRotateX, rotateY: smoothRotateY, transformPerspective: 1000 }}
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
