'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fadeUp, titleDown } from './variants';
import { Reveal } from './Reveal';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  /** Use on dark (ink) sections. */
  inverted?: boolean;
}

/** Title drops in, subtitle rises to meet it. */
export function SectionHeading({ title, subtitle, align = 'center', inverted = false }: SectionHeadingProps) {
  return (
    <Box sx={{ textAlign: align, maxWidth: 680, mx: align === 'center' ? 'auto' : 0, mb: { xs: 3.5, md: 5 } }}>
      <Reveal variants={titleDown}>
        <Typography variant="h2" component="h2" sx={{ color: inverted ? '#fff' : 'text.primary' }}>
          {title}
        </Typography>
      </Reveal>
      {subtitle && (
        <Reveal variants={fadeUp} delay={0.12}>
          <Typography variant="subtitle1" sx={{ mt: 1.5, color: inverted ? 'rgba(255,255,255,.75)' : 'text.secondary' }}>
            {subtitle}
          </Typography>
        </Reveal>
      )}
    </Box>
  );
}
