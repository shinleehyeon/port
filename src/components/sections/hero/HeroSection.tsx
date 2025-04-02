'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sprout,
  Github,
  Code2,
  Terminal,
  MousePointerClick,
  Lightbulb,
  Coffee,
} from 'lucide-react';
import ScrollAnimationWrapper from '@/components/ui/ScrollAnimationWrapper';
import { useLanguage } from '@/contexts/LanguageContext';

// 한글 타이핑 효과 컴포넌트
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

// HeroSection 컴포넌트
const HeroSection = () => {
  const { t } = useLanguage();
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const handleTypingComplete = () => {
    setIsTypingComplete(true);
  };

  return (
    <section className="relative h-screen bg-[url('/bg-texture.png')] bg-cover bg-center flex items-center justify-center overflow-hidden">
      {/* 🎯 텍스트 주변으로 아이콘 배치 */}
      <Github className="absolute top-[35%] left-[28%] text-black opacity-60" size={34} />
      <Lightbulb className="absolute top-[33%] right-[28%] text-yellow-400 opacity-70" size={30} />
      <MousePointerClick className="absolute top-[45%] left-[20%] text-gray-500 opacity-50" size={30} />
      <Code2 className="absolute top-[45%] right-[20%] text-[#444] opacity-50" size={30} />
      <Terminal className="absolute top-[55%] right-[30%] text-[#333] opacity-40" size={28} />
      <Coffee className="absolute top-[60%] left-[32%] text-[#c59b7b] opacity-60" size={28} />

      {/* 도형 장식 */}
      <div className="absolute top-[38%] left-[24%] w-3 h-3 bg-yellow-300 rotate-45" />
      <div className="absolute top-[42%] right-[26%] w-4 h-4 bg-pink-300 rounded-full" />
      <div className="absolute top-[50%] left-[30%] w-2 h-2 bg-green-300 rounded-full" />
      <div className="absolute top-[58%] right-[30%] w-3 h-3 bg-blue-200 rotate-45" />

      {/* 👩‍🎨 텍스트 */}
      <div className="z-10 text-center">
        <ScrollAnimationWrapper direction="up" delay={0.1}>
          <h1 className="mb-4 text-2xl sm:text-4xl lg:text-6xl font-extrabold leading-snug text-[#333]">
            <span className="text-black block">
              {t("hero.title1")}
            </span>
            <span className="text-[#6f4f28] flex items-center justify-center">
              <HangulTypingEffect text={t("hero.title2")} onComplete={handleTypingComplete} />
              <AnimatePresence mode="wait">
                {isTypingComplete && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Sprout className="ml-2" color="#22c55e" size={36} />
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
          </h1>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};

export default HeroSection;
