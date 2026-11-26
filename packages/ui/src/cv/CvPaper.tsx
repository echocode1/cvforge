'use client';

import type { ReactNode } from 'react';
import Box from '@mui/material/Box';

/** A4 sheet. Colors are fixed (not theme-driven) so exports look the same in dark mode. */
export function CvPaper({ children, fontFamily }: { children: ReactNode; fontFamily: string }) {
  return (
    <Box
      className="cv-print-area"
      sx={{
        width: '210mm',
        minHeight: '297mm',
        bgcolor: '#ffffff',
        color: '#1a1a1a',
        fontFamily,
        fontSize: '10.5pt',
        lineHeight: 1.5,
        boxSizing: 'border-box',
        overflow: 'hidden',
        '& *': { boxSizing: 'border-box' },
        '& h1, & h2, & h3, & p, & ul': { m: 0 },
      }}
    >
      {children}
    </Box>
  );
}
