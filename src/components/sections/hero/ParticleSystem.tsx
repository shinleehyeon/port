"use client";

import React, { useEffect, useRef, useState, startTransition } from "react";

// Interactive particle animation with orbital dots and falling snow effect

interface ParticleSystemProps {
  particleCount?: number;
  snowCount?: number;
  particleColor?: string;
  snowColor?: string;
  backgroundColor?: string;
  glowIntensity?: number;
  animationSpeed?: number;
}

type OrbitalParticle = {
  i: number;
  cx: number;
  cy: number;
  r: number;
  dot: number;
  prog: number;
  s: number;
  startTime: number;
  duration: number;
  scaleStartTime: number;
  scalePhase: number;
  introStartTime: number;
  introDelay: number;
  introDuration: number;
};

type SnowParticle = {
  x: number;
  y: number;
  s: number;
  a: number;
  startTime: number;
  duration: number;
};

export default function ParticleSystem(props: ParticleSystemProps) {
  const {
    particleCount = 999,
    snowCount = 999,
    particleColor = "#FFFFFF",
    snowColor = "#FFFFFF",
    backgroundColor = "#000000",
    glowIntensity = 0.05,
    animationSpeed = 1,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas2Ref = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkOrientation = () => {
      startTransition(() => {
        setIsPortrait(window.innerWidth < window.innerHeight);
      });
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const c = canvasRef.current;
    const c2 = canvas2Ref.current;
    if (!c || !c2) return;

    const ctx = c.getContext("2d");
    const ctx2 = c2.getContext("2d");
    if (!ctx || !ctx2) return;

    const cw = (c.width = 4000);
    const ch = (c.height = 4000);
    c2.width = c2.height = 4000;

    const T = Math.PI * 2;
    const m = {
      x: cw / 2,
      y: 0,
      targetX: cw / 2,
      targetY: 0,
    };

    // Easing function
    const easeOutExpo = (t: number) => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    // Utility functions
    const mapRange = (
      value: number,
      inMin: number,
      inMax: number,
      outMin: number,
      outMax: number,
    ) => {
      return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    };

    const clamp = (value: number, min: number, max: number) => {
      return Math.max(min, Math.min(max, value));
    };

    const interpolate = (start: number, end: number, t: number) => {
      return start + (end - start) * t;
    };

    const arr: OrbitalParticle[] = [];
    const arr2: SnowParticle[] = [];

    const handlePointerMove = (e: PointerEvent) => {
      const rect = c.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const scaleX = c.width / rect.width;
      const scaleY = c.height / rect.height;
      m.targetX = mouseX * scaleX;
      m.targetY = mouseY * scaleY;
    };

    c.addEventListener("pointermove", handlePointerMove);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const duration = 99000 / animationSpeed;
      arr.push({
        i: i,
        cx: cw / 2,
        cy: mapRange(i, 0, particleCount - 1, 600, 3700),
        r: i < 900 ? mapRange(i, 0, particleCount - 1, 3, 770) : 50,
        dot: 9,
        prog: 0.25,
        s: 1,
        startTime: Date.now() - Math.random() * duration,
        duration: duration,
        scaleStartTime: 0,
        scalePhase: 0,
        introStartTime: Date.now(),
        introDelay: i * 0.9,
        introDuration: 1000,
      });
    }

    // Initialize snow
    for (let i = 0; i < snowCount; i++) {
      const s = 3 + 5 * Math.random();
      const duration = 99000 / (s / 700) / animationSpeed;
      arr2.push({
        x: cw * Math.random(),
        y: -9,
        s: s,
        a: 0.1 + 0.5 * Math.random(),
        startTime: Date.now() - Math.random() * duration,
        duration: duration,
      });
    }

    ctx.fillStyle = particleColor;
    ctx2.fillStyle = snowColor;
    ctx.strokeStyle = `rgba(${parseInt(particleColor.slice(1, 3), 16)}, ${parseInt(particleColor.slice(3, 5), 16)}, ${parseInt(particleColor.slice(5, 7), 16)}, ${glowIntensity})`;
    ctx.globalCompositeOperation = "lighter";

    function drawDot(c: OrbitalParticle, now: number) {
      // Intro animation
      const introElapsed = now - c.introStartTime - c.introDelay;
      let introDotScale = 1;
      if (introElapsed < c.introDuration && introElapsed >= 0) {
        const t = introElapsed / c.introDuration;
        const eased =
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        introDotScale = eased;
      } else if (introElapsed < 0) {
        introDotScale = 0;
      }

      // Progress animation
      const elapsed = now - c.startTime;
      const cycleProgress = (elapsed % c.duration) / c.duration;
      const slowEase = (t: number) => {
        const p = 0.3;
        const s = 0.4;
        return Math.pow(t, p) / (Math.pow(t, p) + Math.pow(1 - t, p) * s);
      };
      c.prog = 0.25 + slowEase(cycleProgress);

      // Scale animation
      const scaleDuration = c.duration / 2;
      const scaleElapsed = elapsed % c.duration;
      let scale = 1;
      if (scaleElapsed < scaleDuration) {
        const t = scaleElapsed / scaleDuration;
        const eased =
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        scale = 1 - 0.85 * eased;
      } else {
        const t = (scaleElapsed - scaleDuration) / scaleDuration;
        const eased =
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        scale = 0.15 + 0.85 * eased;
      }
      c.s = scale;

      const angle = c.prog * T;
      const vs = 0.2;
      const x = Math.cos(angle) * c.r + c.cx;
      const y = Math.sin(angle) * c.r * vs + c.cy;
      const d = Math.sqrt((x - m.x) ** 2 + (y - m.y) ** 2);
      const ms = clamp(d / cw, 0.07, 1);

      ctx.beginPath();
      ctx.arc(x, y, (c.dot * c.s) / 2 / ms * introDotScale, 0, T);
      ctx.fill();
      ctx.lineWidth = (c.dot * c.s * 2) / ms * introDotScale;
      ctx.stroke();
    }

    function drawSnow(c: SnowParticle, now: number) {
      const elapsed = now - c.startTime;
      const progress = (elapsed % c.duration) / c.duration;
      c.y = -9 + progress * (ch + 9);
      const ys = interpolate(1.3, 0.1, c.y / ch);
      ctx2.beginPath();
      ctx2.arc(c.x, c.y, c.s * ys, 0, T);
      ctx2.globalAlpha = c.a * ys;
      ctx2.fill();
    }

    let lastTime = Date.now();

    function render() {
      const now = Date.now();
      const deltaTime = now - lastTime;
      lastTime = now;

      // Smooth mouse following
      const lerpFactor = 1 - Math.pow(0.001, deltaTime / 1000);
      m.x += (m.targetX - m.x) * lerpFactor;
      m.y += (m.targetY - m.y) * lerpFactor;

      ctx.clearRect(0, 0, cw, ch);
      ctx2.clearRect(0, 0, cw, ch);

      arr.forEach((c) => drawDot(c, now));
      arr2.forEach((c) => drawSnow(c, now));

      animationFrameRef.current = requestAnimationFrame(render);
    }

    // Intro animation for mouse position
    const introStartTime = Date.now();
    const introDuration = 1500;

    function animateIntro() {
      const elapsed = Date.now() - introStartTime;
      if (elapsed < introDuration) {
        const t = elapsed / introDuration;
        const eased = easeOutExpo(t);
        m.y = ch * 1.2 * (1 - eased);
        requestAnimationFrame(animateIntro);
      }
    }

    animateIntro();
    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      c.removeEventListener("pointermove", handlePointerMove);
    };
  }, [
    particleCount,
    snowCount,
    particleColor,
    snowColor,
    glowIntensity,
    animationSpeed,
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor,
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvas2Ref}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isPortrait ? "auto" : "100%",
          height: isPortrait ? "100%" : "auto",
          aspectRatio: "1",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isPortrait ? "100%" : "auto",
          height: isPortrait ? "auto" : "100%",
          aspectRatio: "1",
        }}
      />
    </div>
  );
}
