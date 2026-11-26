'use client';

import Box from '@mui/material/Box';
import { brand } from '../theme/theme';

export function LogoMark({ size = 32, tile = brand.ink }: { size?: number; tile?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" role="img" aria-label="EJ Solutions logo">
      <rect width="64" height="64" rx="16" fill={tile} />
      <rect x="18" y="16" width="7" height="32" rx="3.5" fill="#fff" />
      <rect x="18" y="16" width="28" height="7" rx="3.5" fill="#fff" />
      <rect x="18" y="28.5" width="20" height="7" rx="3.5" fill={brand.marigold} />
      <rect x="18" y="41" width="28" height="7" rx="3.5" fill="#fff" />
    </svg>
  );
}

export interface LogoProps {
  label?: string;
  size?: number;
  /** "dark" = ink text (for light backgrounds), "light" = white text. */
  tone?: 'dark' | 'light';
}

export function Logo({ label = 'CVForge', size = 32, tone = 'dark' }: LogoProps) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25 }}>
      <LogoMark size={size} tile={tone === 'light' ? brand.inkSoft : brand.ink} />
      <Box
        component="span"
        sx={{
          fontFamily: '"Bricolage Grotesque Variable", system-ui, sans-serif',
          fontWeight: 700,
          fontSize: size * 0.62,
          letterSpacing: '-0.02em',
          color: tone === 'dark' ? brand.ink : '#fff',
        }}
      >
        {label}
      </Box>
    </Box>
  );
}
