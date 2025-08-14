"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Sprout, ChevronsDown } from "lucide-react";
import ScrollAnimationWrapper from "@/components/ui/ScrollAnimationWrapper";
import { useLanguage } from "@/contexts/LanguageContext";
import ParticleSystem from "@/components/sections/hero/ParticleSystem";

const HangulTypingEffect: React.FC<{
  text: string;
  onComplete: () => void;
}> = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [decomposedChars, setDecomposedChars] = useState<string[][]>([]);
  const intervalRef = useRef<number | null>(null);
  const hasCompletedRef = useRef(false);

  const decomposeHangul = (char: string): string[][] => {
    const code = char.charCodeAt(0) - 0xac00;
    if (code < 0 || code > 11171) return [[char]];

    const cho = Math.floor(code / 28 / 21);
    const jung = Math.floor((code % (21 * 28)) / 28);
    const jong = code % 28;

    const chosung = String.fromCharCode(0x1100 + cho);
    const jungsung = String.fromCharCode(0x1161 + jung);
    const jongsung = jong > 0 ? String.fromCharCode(0x11a7 + jong) : "";

    return [[chosung, jungsung, jongsung].filter(Boolean)];
  };

  useEffect(() => {
    setDecomposedChars(text.split("").flatMap(decomposeHangul));
    setDisplayText("");
    hasCompletedRef.current = false;

    return () => {
      if (intervalRef.current) {
        cancelAnimationFrame(intervalRef.current);
      }
    };
  }, [text]);

  useEffect(() => {
    if (decomposedChars.length === 0 || hasCompletedRef.current) return;

    let currentCharIndex = 0;
    let currentJamoIndex = 0;
    let currentText = "";
    let lastTime = 0;

    const smoothWrite = (currentTime: number): void => {
      if (currentCharIndex >= decomposedChars.length) {
        if (intervalRef.current) {
          cancelAnimationFrame(intervalRef.current);
        }
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onComplete();
        }
        return;
      }

      const deltaTime = currentTime - lastTime;
      if (deltaTime > 100) {
        const currentJamo = decomposedChars[currentCharIndex][currentJamoIndex];
        currentText += currentJamo;
        setDisplayText(currentText);
        currentJamoIndex++;

        if (currentJamoIndex >= decomposedChars[currentCharIndex].length) {
          currentCharIndex++;
          currentJamoIndex = 0;
        }
        lastTime = currentTime;
      }

      intervalRef.current = requestAnimationFrame(smoothWrite);
    };

    intervalRef.current = requestAnimationFrame(smoothWrite);

    return () => {
      if (intervalRef.current) {
        cancelAnimationFrame(intervalRef.current);
      }
    };
  }, [decomposedChars, onComplete]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="font-hangul"
    >
      {displayText}
    </motion.span>
  );
};

const HeroSection = () => {
  const { t } = useLanguage();
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const handleTypingComplete = () => {
    setIsTypingComplete(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollHint(true);
    });

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) {
        setShowScrollHint(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const letterAnimation = {
    initial: {
      y: 50,
      opacity: 0,
      scale: 0.8,
      rotateX: -90,
    },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  const containerAnimation = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-white text-black"
    >
      <div className="absolute inset-0 z-0 will-change-transform">
        <ParticleSystem />
      </div>

      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        style={{
          y: textY,
          opacity: textOpacity,
          scale: textScale,
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="text-center">
          <motion.div
            variants={containerAnimation}
            initial="initial"
            animate="animate"
            className="mb-4"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-snug text-[#333]">
              <motion.span className="text-black block overflow-hidden">
                {t("hero.title1")
                  .split("")
                  .map((char, index) => (
                    <motion.span
                      key={index}
                      variants={letterAnimation}
                      className="inline-block"
                      style={{ perspective: 1000 }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
              </motion.span>
              <motion.span
                className="text-[#6f4f28] flex items-center justify-center lg:text-7xl mt-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <HangulTypingEffect
                    text={t("hero.title2")}
                    onComplete={handleTypingComplete}
                  />
                </motion.div>
                <AnimatePresence mode="wait">
                  {isTypingComplete && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        duration: 0.6,
                      }}
                    >
                      <Sprout className="ml-2" color="#22c55e" size={40} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-8"
          >
            <motion.p
              className="text-lg text-gray-600"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.p>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="fixed bottom-10 inset-x-0 z-[9999] flex justify-center"
          >
            <motion.div
              className="flex items-center gap-2 px-5 py-2 rounded-full shadow-lg backdrop-blur-sm bg-black text-white text-sm sm:text-base font-medium"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ChevronsDown className="w-5 h-5" />
              아래로 스크롤해서 더보기
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
