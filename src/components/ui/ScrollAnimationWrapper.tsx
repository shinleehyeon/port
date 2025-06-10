"use client";
import React, { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  threshold?: number;
  className?: string;
  once?: boolean;
}

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  delay = 0.1,
  direction = "up",
  threshold = 0.1,
  className = "",
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: threshold, once });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 30, opacity: 0 };
      case "down":
        return { y: -30, opacity: 0 };
      case "left":
        return { x: 30, opacity: 0 };
      case "right":
        return { x: -30, opacity: 0 };
      default:
        return { y: 30, opacity: 0 };
    }
  };

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={getInitialPosition()}
        animate={
          isInView
            ? {
                opacity: 1,
                y: direction === "up" || direction === "down" ? 0 : undefined,
                x:
                  direction === "left" || direction === "right" ? 0 : undefined,
              }
            : getInitialPosition()
        }
        transition={{
          duration: 0.3,
          delay,
          ease: [0.17, 0.55, 0.55, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollAnimationWrapper;
