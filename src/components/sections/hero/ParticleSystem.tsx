'use client';

import React, { useState, useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  opacity: number;
};

const ParticleSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const prevMousePos = useRef({ x: 0, y: 0 });

  const isMobileDevice = () => {
    return (
      typeof window !== 'undefined' && 
      (window.innerWidth <= 768 || 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    );
  };

  const particlesConfig = useRef({
    particles: {
      array: [] as Particle[],
      count: isMobileDevice() ? 10 : 40,
      color: '#6f4f28',
      size: { value: 3, random: true },
      opacity: { value: 0.6, random: false },
      line: {
        enable: true,
        color: '#6f4f28',
        opacity: 0.6,
        width: 1,
        distance: isMobileDevice() ? 200 : 350
      },
      move: {
        speed: 1.5,
        outMode: 'bounce'
      }
    },
    interactivity: {
      mouse: {
        pos_x: 0,
        pos_y: 0,
        click_pos_x: 0,
        click_pos_y: 0,
        click_time: 0
      },
      status: null as string | null,
      modes: {
        grab: {
          distance: isMobileDevice() ? 200 : 400,
          opacity: 0.7
        },
        bubble: {
          distance: 1500,
          size: 4,
          duration: 2,
          opacity: 0.7
        },
        repulse: {
          distance: 200,
          duration: 0.4,
          strength: 0.05
        },
        push: {
          particles_nb: isMobileDevice() ? 2 : 4
        }
      }
    },
    tmp: {
      bubble_clicking: false,
      repulse_clicking: false,
      repulse_count: 0,
      repulse_finish: false
    }
  });

  const initParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    particlesConfig.current.particles.count = isMobileDevice() ? 10 : 45;

    particlesConfig.current.particles.array = [];
    for (let i = 0; i < particlesConfig.current.particles.count; i++) {
      const size = particlesConfig.current.particles.size.random
        ? 1 + Math.random() * particlesConfig.current.particles.size.value
        : particlesConfig.current.particles.size.value;
        
      particlesConfig.current.particles.array.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: size,
        color: particlesConfig.current.particles.color,
        vx: (Math.random() - 0.5) * particlesConfig.current.particles.move.speed,
        vy: (Math.random() - 0.5) * particlesConfig.current.particles.move.speed,
        opacity: particlesConfig.current.particles.opacity.value
      });
    }
  };

  const drawParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const config = particlesConfig.current;
    const particles = config.particles.array;

    if (config.particles.line.enable) {
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist <= config.particles.line.distance) {
            const opacity = Math.min(
              config.particles.line.opacity,
              config.particles.line.opacity - (dist / config.particles.line.distance) * 0.5
            );
            
            if (opacity > 0.05) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(111, 79, 40, ${opacity})`;
              ctx.lineWidth = config.particles.line.width;
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }
      }
    }

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x - p.size < 0) {
        p.x = p.size;
        p.vx = -p.vx;
      } else if (p.x + p.size > canvas.width) {
        p.x = canvas.width - p.size;
        p.vx = -p.vx;
      }

      if (p.y - p.size < 0) {
        p.y = p.size;
        p.vy = -p.vy;
      } else if (p.y + p.size > canvas.height) {
        p.y = canvas.height - p.size;
        p.vy = -p.vy;
      }

      if (config.interactivity.status === 'mousemove') {
        const mouseX = config.interactivity.mouse.pos_x;
        const mouseY = config.interactivity.mouse.pos_y;
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= config.interactivity.modes.grab.distance) {
          const opacity = Math.min(
            config.interactivity.modes.grab.opacity, 
            config.interactivity.modes.grab.opacity - (dist / config.interactivity.modes.grab.distance) * 0.3
          );
          
          if (opacity > 0) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(111, 79, 40, ${opacity})`;
            ctx.lineWidth = config.particles.line.width;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(111, 79, 40, ${p.opacity})`;
      ctx.fill();
      ctx.closePath();
    });

    animFrameRef.current = requestAnimationFrame(drawParticles);
  };

  const pushParticles = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    for (let i = 0; i < particlesConfig.current.interactivity.modes.push.particles_nb; i++) {
      particlesConfig.current.particles.array.push({
        x: x,
        y: y,
        size: particlesConfig.current.particles.size.random 
          ? 1 + Math.random() * particlesConfig.current.particles.size.value
          : particlesConfig.current.particles.size.value,
        color: particlesConfig.current.particles.color,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        opacity: particlesConfig.current.particles.opacity.value
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const config = particlesConfig.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const dx = mouseX - prevMousePos.current.x;
    const dy = mouseY - prevMousePos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 1.5) {
      config.interactivity.mouse.pos_x = mouseX;
      config.interactivity.mouse.pos_y = mouseY;
      config.interactivity.status = 'mousemove';
      prevMousePos.current = { x: mouseX, y: mouseY };
    }
  };

  const handleMouseLeave = () => {
    const config = particlesConfig.current;
    config.interactivity.mouse.pos_x = null as any;
    config.interactivity.mouse.pos_y = null as any;
    config.interactivity.status = 'mouseleave';
    prevMousePos.current = { x: 0, y: 0 };
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const config = particlesConfig.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    pushParticles(mouseX, mouseY);
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesConfig.current.particles.count = isMobileDevice() ? 10 : 45;
    particlesConfig.current.particles.line.distance = isMobileDevice() ? 200 : 350;
    particlesConfig.current.interactivity.modes.grab.distance = isMobileDevice() ? 200 : 400;
    initParticles();
  };

  useEffect(() => {
    particlesConfig.current.particles.count = isMobileDevice() ? 10 : 45;
    initParticles();
    drawParticles();
    window.addEventListener('resize', handleResize);
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      className="w-full h-full absolute top-0 left-0 overflow-hidden"
      style={{ 
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ 
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
    </div>
  );
};

export default ParticleSystem;