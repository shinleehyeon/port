"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Sprout, ChevronsDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ParticleSystem from "@/components/sections/hero/ParticleSystem";
import { HighlightText } from "@/components/text/highlight-text";
import PaperCutText from "@/components/text/paper-cut-text";

const HeroSection = () => {
  const { t } = useLanguage();
  const [isTypingComplete] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

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

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden text-white bg-black"
    >
      <div className="absolute inset-0 z-0 will-change-transform">
        <ParticleSystem
          particleCount={999}
          snowCount={999}
          particleColor="#FFFFFF"
          snowColor="#FFFFFF"
          backgroundColor="#000000"
          glowIntensity={0.05}
          animationSpeed={1}
        />
      </div>

      <motion.div
        className="absolute inset-0 z-10 flex items-end justify-start pointer-events-none px-8 pb-16"
        style={{
          y: textY,
          opacity: textOpacity,
          scale: textScale,
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="text-left">
          <div className="mb-4">
            <PaperCutText
              text={t("hero.title1")}
              textColor="#FFFFFF"
              textBorderWidth={0.01}
              textBorderColor="rgba(255, 255, 255, 0.3)"
              backgroundColor="transparent"
              overlayGradientStart="#FFFFFF"
              overlayGradientEnd="#E0E0E0"
              shadowColor="rgba(0, 0, 0, 0.5)"
              shadowBlur={5}
              animationDuration={3}
              letterDelay={0.2}
              font={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: "900",
                letterSpacing: "0.05em",
                lineHeight: "1em",
              }}
              padding="0"
              className="mb-2"
            />
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-snug text-white mt-2">
              <motion.span
                className="text-white flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <HighlightText
                    text={t("hero.title2")}
                    inView={true}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-white bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-500 dark:to-purple-500"
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
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-8"
          >
            <motion.p
              className="text-lg text-gray-300"
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
