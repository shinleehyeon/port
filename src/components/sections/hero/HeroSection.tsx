'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HangulTypingEffect: React.FC<{ text: string; onComplete: () => void }> = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [decomposedChars, setDecomposedChars] = useState<string[][]>([]);
  const intervalRef = useRef<number | null>(null);
  const hasCompletedRef = useRef(false);

  const decomposeHangul = (char: string): string[][] => {
    const code = char.charCodeAt(0) - 0xAC00;
    if (code < 0 || code > 11171) return [[char]];

    const cho = Math.floor(code / 28 / 21);
    const jung = Math.floor((code % (21 * 28)) / 28);
    const jong = code % 28;

    const chosung = String.fromCharCode(0x1100 + cho);
    const jungsung = String.fromCharCode(0x1161 + jung);
    const jongsung = jong > 0 ? String.fromCharCode(0x11A7 + jong) : '';

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
  const previousTextRef = useRef('');

  useEffect(() => {
    const currentText = t("hero.title2");
    if (previousTextRef.current !== currentText) {
      previousTextRef.current = currentText;
      setIsTypingComplete(false);
    }
  }, [t]);

  const handleTypingComplete = () => {
    setIsTypingComplete(true);
  };

  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          className="place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="mb-4 text-4xl sm:text-5xl lg:text-7xl lg:leading-normal font-extrabold">
            <span className="text-black block">
              {t("hero.title1")}
            </span>
            <span className="text-[#6f4f28] mb-1 flex items-center justify-center sm:justify-start">
              <HangulTypingEffect 
                text={t("hero.title2")} 
                onComplete={handleTypingComplete}
              />
              <AnimatePresence mode="wait">
                {isTypingComplete && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Sprout className="ml-2" color="#22c55e" size={38} />
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;