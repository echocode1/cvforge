'use client';

import { useState, type ElementType } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { useActiveSection } from '../motion/useActiveSection';
import { brand } from '../theme/theme';

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteHeaderProps {
  links: NavLink[];
  signIn: NavLink;
  cta: NavLink;
  /** Pass next/link for client-side navigation to app routes. Defaults to a plain anchor. */
  linkComponent?: ElementType;
}

const MotionBox = motion.create(Box);

export function SiteHeader({ links, signIn, cta, linkComponent = 'a' }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(links.filter((l) => l.href.startsWith('#')).map((l) => l.href.slice(1)));
  const Link = linkComponent;

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: (t) => t.zIndex.appBar,
        bgcolor: alpha('#ffffff', 0.86),
        backdropFilter: 'saturate(160%) blur(12px)',
        borderBottom: `1px solid ${brand.line}`,
      }}
    >
      <MotionBox initial={{ y: -28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', height: 64, gap: 2 }}>
        <Link href="/" aria-label="CVForge home" style={{ display: 'inline-flex', textDecoration: 'none', color: 'inherit' }}>
          <Logo />
        </Link>

        <Box component="nav" aria-label="Sections" sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, mx: 'auto' }}>
          {links.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <Box
                key={link.href}
                component="a"
                href={link.href}
                sx={{
                  position: 'relative',
                  px: 1.75,
                  py: 1,
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  color: isActive ? 'text.primary' : 'text.secondary',
                  textDecoration: 'none',
                  transition: 'color .15s',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{ position: 'absolute', left: 14, right: 14, bottom: 2, height: 2, borderRadius: 2, background: brand.cobalt }}
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </Box>
            );
          })}
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
          <Button component={Link} href={signIn.href} color="inherit">
            {signIn.label}
          </Button>
          <Button component={Link} href={cta.href} variant="contained">
            {cta.label}
          </Button>
        </Box>

        <IconButton
          sx={{ display: { md: 'none' }, ml: 'auto' }}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </IconButton>
      </Container>

      <Collapse in={open} sx={{ display: { md: 'none' } }}>
        <Container maxWidth="lg" sx={{ pb: 2, display: 'grid', gap: 0.5 }}>
          {links.map((link) => (
            <Button key={link.href} component="a" href={link.href} color="inherit" sx={{ justifyContent: 'flex-start' }} onClick={() => setOpen(false)}>
              {link.label}
            </Button>
          ))}
          <Box sx={{ display: 'flex', gap: 1, pt: 1 }}>
            <Button component={Link} href={signIn.href} variant="outlined" color="inherit" fullWidth>
              {signIn.label}
            </Button>
            <Button component={Link} href={cta.href} variant="contained" fullWidth>
              {cta.label}
            </Button>
          </Box>
        </Container>
      </Collapse>
      </MotionBox>
    </Box>
  );
}
