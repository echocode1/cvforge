import type { Variants } from 'framer-motion';

/** Shared easing: quick start, soft landing. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Elements animate in when scrolled into view AND back out when scrolled away. */
export const VIEWPORT = { once: false, amount: 0.2, margin: '0px 0px -6% 0px' } as const;

/** Section titles drop in from above. `custom` = delay in seconds. */
export const titleDown: Variants = {
  hidden: { opacity: 0, y: -22 },
  visible: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } }),
};

/** Subtitles and body copy rise up to meet the title. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({ opacity: 1, transition: { duration: 0.7, ease: 'easeOut', delay } }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  visible: (delay: number = 0) => ({ opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, ease: EASE, delay } }),
};

/** Cards inside a RevealGroup: one after another. */
export const cardItem: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
};

export function staggerContainer(stagger = 0.1, delay = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
}
