'use client';

import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { brand } from '../theme/theme';

export function EmptyState({ title, text, actions }: { title: string; text: string; actions?: ReactNode }) {
  return (
    <Box
      sx={{
        display: 'grid',
        justifyItems: 'center',
        gap: 1.5,
        textAlign: 'center',
        p: { xs: 4, md: 6 },
        border: `1.5px dashed ${brand.line}`,
        borderRadius: 4,
        bgcolor: '#fff',
      }}
    >
      <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden>
        <rect x="14" y="20" width="44" height="58" rx="6" fill="#e9edf7" transform="rotate(-8 14 20)" />
        <rect x="26" y="12" width="44" height="58" rx="6" fill="#fff" stroke={brand.line} strokeWidth="2" />
        <rect x="33" y="22" width="22" height="5" rx="2.5" fill={brand.ink} />
        <rect x="33" y="33" width="30" height="3.5" rx="1.75" fill={brand.line} />
        <rect x="33" y="41" width="26" height="3.5" rx="1.75" fill={brand.line} />
        <rect x="33" y="49" width="30" height="3.5" rx="1.75" fill={brand.marigold} />
      </svg>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
        {text}
      </Typography>
      {actions && <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center', mt: 0.5 }}>{actions}</Box>}
    </Box>
  );
}
