'use client';

import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { brand } from '../theme/theme';

export interface SectionProps {
  id?: string;
  children: ReactNode;
  /** "ink" = dark navy band with white text. */
  tone?: 'default' | 'white' | 'ink';
}

const BG = { default: 'transparent', white: '#ffffff', ink: brand.ink } as const;

/** Page band with tight, consistent vertical rhythm. */
export function Section({ id, children, tone = 'default' }: SectionProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        bgcolor: BG[tone],
        color: tone === 'ink' ? '#fff' : 'text.primary',
        py: { xs: 6, md: 8 },
        borderTop: tone === 'white' ? `1px solid ${brand.line}` : 'none',
        borderBottom: tone === 'white' ? `1px solid ${brand.line}` : 'none',
      }}
    >
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
}
