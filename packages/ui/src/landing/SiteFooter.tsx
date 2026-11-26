'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Logo } from '../brand/Logo';
import { brand } from '../theme/theme';
import type { NavLink } from './SiteHeader';

export function SiteFooter({ links }: { links: NavLink[] }) {
  return (
    <Box component="footer" sx={{ bgcolor: brand.ink, color: 'rgba(255,255,255,.72)', py: 4 }}>
      <Container maxWidth="lg" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2.5 }}>
        <Box sx={{ display: 'grid', gap: 0.75 }}>
          <Logo tone="light" />
          <Typography variant="body2">A product by EJ Solutions.</Typography>
        </Box>
        <Box component="nav" aria-label="Footer" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5 }}>
          {links.map((l) => (
            <Box key={l.href} component="a" href={l.href} sx={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9375rem', '&:hover': { color: '#fff' } }}>
              {l.label}
            </Box>
          ))}
        </Box>
        <Typography variant="body2" sx={{ width: { xs: '100%', md: 'auto' } }}>
          © {new Date().getFullYear()} EJ Solutions
        </Typography>
      </Container>
    </Box>
  );
}
