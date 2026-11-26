'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { AnimatePresence, motion } from 'framer-motion';
import type { CvData, TemplateId } from '@cvforge/types';
import { CvDocument, TEMPLATE_LABELS } from '../cv/CvDocument';
import { EASE } from '../motion/variants';
import { brand } from '../theme/theme';

/** A4 paper is 794px wide at 96dpi; `zoom` shrinks it while keeping layout correct. */
const PAPER_W = 794;
const PAPER_H = 1123;

/** Hero preview: cycles through templates by itself, and the visitor can pick one. */
export function CvShowcase({
  data,
  templates,
  intervalMs = 4200,
}: {
  data: CvData;
  templates: readonly TemplateId[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);

  // Restarts whenever the index changes, so a manual pick delays the next auto-switch.
  useEffect(() => {
    const timer = setTimeout(() => setIndex((i) => (i + 1) % templates.length), intervalMs);
    return () => clearTimeout(timer);
  }, [index, intervalMs, templates.length]);

  const current = templates[index] ?? templates[0] ?? 'minimal';

  return (
    <Box sx={{ display: 'grid', justifyItems: 'center', gap: 2 }}>
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}>
        <Box
          sx={{
            '--zoom': { xs: 0.4, sm: 0.5, md: 0.52 },
            zoom: 'var(--zoom)',
            width: PAPER_W,
            height: 700,
            borderRadius: '6px',
            boxShadow: '0 30px 60px -28px rgba(0,0,0,.6)',
            overflow: 'hidden',
            bgcolor: '#fff',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <CvDocument data={data} templateId={current} />
            </motion.div>
          </AnimatePresence>
        </Box>
      </motion.div>

      <ToggleButtonGroup
        exclusive
        size="small"
        value={current}
        aria-label="Preview template"
        onChange={(_, next: TemplateId | null) => next && setIndex(templates.indexOf(next))}
        sx={{ bgcolor: 'rgba(255,255,255,.08)', borderRadius: '10px', '& .MuiToggleButton-root': { color: 'rgba(255,255,255,.75)', border: 0, px: 2 }, '& .Mui-selected': { bgcolor: `${brand.marigold} !important`, color: `${brand.ink} !important` } }}
      >
        {templates.map((id) => (
          <ToggleButton key={id} value={id}>
            {TEMPLATE_LABELS[id]}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}

/** Static template thumbnail card for the templates section. */
export function TemplateCard({
  data,
  templateId,
  description,
}: {
  data: CvData;
  templateId: TemplateId;
  description: string;
}) {
  const zoom = 0.3;
  return (
    <Card variant="feature" sx={{ overflow: 'hidden', height: '100%' }}>
      <Box sx={{ bgcolor: '#e9edf7', display: 'grid', justifyItems: 'center', pt: 2.25, height: PAPER_H * zoom * 0.72, overflow: 'hidden' }}>
        <Box sx={{ zoom, width: PAPER_W, height: PAPER_H, boxShadow: '0 12px 30px -12px rgba(15,23,48,.45)' }}>
          <CvDocument data={data} templateId={templateId} />
        </Box>
      </Box>
      <Box sx={{ p: 2.25 }}>
        <Typography variant="h5" component="h3">
          {TEMPLATE_LABELS[templateId]}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {description}
        </Typography>
      </Box>
    </Card>
  );
}
