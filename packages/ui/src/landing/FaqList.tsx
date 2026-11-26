'use client';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ChevronDown } from 'lucide-react';
import { RevealGroup, RevealItem } from '../motion/Reveal';

export interface FaqItem {
  q: string;
  a: string;
}

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <RevealGroup stagger={0.08} sx={{ display: 'grid', gap: 1.25, maxWidth: 760, mx: 'auto' }}>
      {items.map((item) => (
        <RevealItem key={item.q}>
          <Accordion>
            <AccordionSummary expandIcon={<ChevronDown size={20} />}>
              <Typography fontWeight={600}>{item.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {item.a}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
