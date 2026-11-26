'use client';

import type { ReactNode } from 'react';
import Box, { type BoxProps } from '@mui/material/Box';
import { motion, type Variants } from 'framer-motion';
import { cardItem, fadeUp, staggerContainer, VIEWPORT } from './variants';

const MotionBox = motion.create(Box);

type SxOnly = Pick<BoxProps, 'sx' | 'className' | 'id'>;

/** Animates a single block when it scrolls into view (and back out when it leaves). */
export function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  ...rest
}: SxOnly & { children: ReactNode; variants?: Variants; delay?: number }) {
  return (
    <MotionBox {...rest} variants={variants} custom={delay} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
      {children}
    </MotionBox>
  );
}

/** Parent of several <RevealItem/>s: children enter one after another. */
export function RevealGroup({
  children,
  stagger = 0.1,
  delay = 0,
  ...rest
}: SxOnly & { children: ReactNode; stagger?: number; delay?: number }) {
  return (
    <MotionBox
      {...rest}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </MotionBox>
  );
}

export function RevealItem({
  children,
  variants = cardItem,
  ...rest
}: SxOnly & { children: ReactNode; variants?: Variants }) {
  return (
    <MotionBox {...rest} variants={variants}>
      {children}
    </MotionBox>
  );
}
