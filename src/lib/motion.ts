export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
} as const;

export const transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1],
} as const;
