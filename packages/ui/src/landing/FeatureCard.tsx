'use client';

import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { brand } from '../theme/theme';

export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  text: string;
  badge?: string;
}

export function FeatureCard({ icon, title, text, badge }: FeatureCardProps) {
  return (
    <Card variant="feature" sx={{ p: 2.5, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.75 }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            display: 'grid',
            placeItems: 'center',
            borderRadius: '11px',
            color: brand.cobalt,
            bgcolor: alpha(brand.cobalt, 0.09),
          }}
        >
          {icon}
        </Box>
        {badge && <Chip label={badge} size="small" sx={{ bgcolor: alpha(brand.marigold, 0.22), color: '#7a5600', height: 24 }} />}
      </Box>
      <Typography variant="h5" component="h3" sx={{ mb: 0.75 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Card>
  );
}

export interface StepCardProps {
  step: number;
  title: string;
  text: string;
}

/** Numbered because the content really is a sequence. */
export function StepCard({ step, title, text }: StepCardProps) {
  return (
    <Card variant="feature" sx={{ p: 2.5, height: '100%' }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          display: 'grid',
          placeItems: 'center',
          borderRadius: '50%',
          bgcolor: brand.ink,
          color: brand.marigold,
          fontFamily: '"Bricolage Grotesque Variable", system-ui, sans-serif',
          fontWeight: 700,
          mb: 1.75,
        }}
        aria-hidden
      >
        {step}
      </Box>
      <Typography variant="h5" component="h3" sx={{ mb: 0.75 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Card>
  );
}
