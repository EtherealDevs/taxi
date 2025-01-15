'use client';

import React, { useEffect, useRef, useCallback } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  isStatic: boolean;
}

const Stars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const requestRef = useRef<number>(0);

  const generateStars = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const numStars = 100;
    const stars: Star[] = [];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        color: '#000000',
        isStatic: true,
      });
    }

    starsRef.current = stars;
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateStars();
  }, [generateStars]);

  const animateStars = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw static stars
    starsRef.current.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = star.color;
      ctx.fill();
    });

    requestRef.current = requestAnimationFrame(animateStars);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    handleResize();
    window.addEventListener('resize', handleResize);

    requestRef.current = requestAnimationFrame(animateStars);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [handleResize, animateStars]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />;
};

export default React.memo(Stars);