export const imageAnimation = {
  initial: {
    opacity: 0,
    scale: 0.92,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.21, 0.45, 0.32, 0.95],
    },
  },
};

export const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.1 * index,
      duration: 0.8,
      ease: [0.21, 0.45, 0.32, 0.95],
    },
  }),
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.6,
      ease: [0.36, 0, 0.66, -0.56],
    },
  },
};

export const slideInFromBottom = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.21, 0.45, 0.32, 0.95],
    },
  },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};
