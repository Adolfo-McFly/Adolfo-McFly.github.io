import React, { useState, useEffect } from 'react';

export default function ProfileScanner({ src, alt, className }) {
  const [status, setStatus] = useState('scanning'); // scanning, completed, idle

  useEffect(() => {
    // Escaneo dura 3 segundos
    const scanTimer = setTimeout(() => {
      setStatus('completed');
    }, 3000);

    // Mensaje de completado dura 1 segundo, luego idle (muestra foto)
    const idleTimer = setTimeout(() => {
      setStatus('idle');
    }, 4000);

    return () => {
      clearTimeout(scanTimer);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          status === 'idle' ? 'opacity-100' : 'opacity-20 blur-sm'
        }`}
      />
      
      {/* Scanner Overlay */}
      {status !== 'idle' && (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center flex-col z-10 transition-opacity duration-500">
          <div className="text-blue-400 font-mono text-xs md:text-sm tracking-widest font-bold mb-2">
            {status === 'scanning' ? 'ESCANEANDO FOTO...' : 'ESCANEO COMPLETADO'}
          </div>
          
          {/* Progress bar */}
          <div className="w-3/4 h-1 bg-slate-800 rounded-full overflow-hidden">
            {status === 'scanning' ? (
              <div className="h-full bg-blue-500 w-1/2 animate-[ping-pong_1s_ease-in-out_infinite]"></div>
            ) : (
              <div className="h-full bg-emerald-500 w-full transition-all duration-300"></div>
            )}
          </div>

          {/* Scanner Line */}
          {status === 'scanning' && (
            <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-[scan_2s_linear_infinite]"></div>
          )}
        </div>
      )}
    </div>
  );
}
