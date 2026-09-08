import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function TiltWrapper({ children, className = '' }) {
  const ref = useRef(null);
  
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(smoothY, [0, 1], [10, -10]);
  const rotateY = useTransform(smoothX, [0, 1], [-10, 10]);

  const handleMouseMove = (e) => {
    // Ignore if user is dragging/selecting text
    if (e.buttons > 0) return;
    
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMouseMove}
      onPointerLeave={handleMouseLeave}
      onPointerCancel={handleMouseLeave}
      onPointerUp={handleMouseLeave}
      onDragStart={(e) => e.preventDefault()}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}
