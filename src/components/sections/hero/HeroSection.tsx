'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, ChevronsDown } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/ui/ScrollAnimationWrapper';
import { useLanguage } from '@/contexts/LanguageContext';
import ParticleSystem from '@/components/sections/hero/ParticleSystem';

const HangulTypingEffect: React.FC<{ text: string; onComplete: () => void }> = ({
  text,
  onComplete,
}) => {
  const [displayText, setDisplayText] = useState('');
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
    const jongsung = jong > 0 ? String.fromCharCode(0x11a7 + jong) : '';

    return [[chosung, jungsung, jongsung].filter(Boolean)];
  };

  useEffect(() => {
    setDecomposedChars(text.split('').flatMap(decomposeHangul));
    setDisplayText('');
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
    let currentText = '';
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

  const handleTypingComplete = () => {
    setIsTypingComplete(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollHint(true);
    }, 3000);

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) {
        setShowScrollHint(false); 
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white text-black">
      <div className="absolute inset-0 z-0 will-change-transform">
        <ParticleSystem />
      </div>

      <div
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="text-center">
          <ScrollAnimationWrapper direction="up" delay={0.1}>
            <h1 className="mb-4 text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-snug text-[#333]">
              <span className="text-black block">
                {t("hero.title1")}
              </span>
              <span className="text-[#6f4f28] flex items-center justify-center lg:text-7xl">
                <HangulTypingEffect text={t("hero.title2")} onComplete={handleTypingComplete} />
                <AnimatePresence mode="wait">
                  {isTypingComplete && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Sprout className="ml-2" color="#22c55e" size={40} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </span>
            </h1>
          </ScrollAnimationWrapper>
        </div>
      </div>

      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="fixed bottom-10 inset-x-0 z-[9999] flex justify-center"
          >
            <div className="flex items-center gap-2 px-5 py-2 rounded-full shadow-lg backdrop-blur-sm bg-black text-white text-sm sm:text-base font-medium">
              <ChevronsDown className="w-5 h-5 animate-bounce" />
              아래로 스크롤해서 더보기
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
