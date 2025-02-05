'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';

const HangulTypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [decomposedChars, setDecomposedChars] = useState([]);
  const intervalRef = useRef(null);

  const decomposeHangul = (char) => {
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
  }, [text]);

  useEffect(() => {
    let currentCharIndex = 0;
    let currentJamoIndex = 0;
    let currentText = '';

    if (decomposedChars.length === 0) return;

    intervalRef.current = setInterval(() => {
      if (currentCharIndex >= decomposedChars.length) {
        clearInterval(intervalRef.current);
        return;
      }

      const currentJamo = decomposedChars[currentCharIndex][currentJamoIndex];
      currentText += currentJamo;
      setDisplayText(currentText);

      currentJamoIndex++;
      if (currentJamoIndex >= decomposedChars[currentCharIndex].length) {
        currentCharIndex++;
        currentJamoIndex = 0;
      }
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [decomposedChars]);

  return <span>{displayText}</span>;
};

const HeroSection = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="mb-4 text-4xl sm:text-5xl lg:text-7xl lg:leading-normal font-extrabold">
            <span className="text-black block">
              끊임없는 배움으로
            </span>
            <span className="text-[#6f4f28] block mb-1 flex items-center justify-center sm:justify-start">
              <HangulTypingEffect text="성장하는 개발자" />
              <Sprout className="ml-2" color="#22c55e" size={38} />
            </span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;