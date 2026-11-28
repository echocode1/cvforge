'use client';

import { useState, type ElementType, type ReactNode } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { ArrowLeft, LogOut, Menu } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { brand } from '../theme/theme';

export interface ShellNavItem {
  label: string;
  href: string;
  icon: ReactNode;
  /** Pathname prefixes that should highlight this item. Defaults to [href]. */
  match?: string[];
  /** Not built yet: shown dimmed with a badge and not clickable. */
  disabled?: boolean;
  badge?: string;
}

export interface AppShellProps {
  navItems: ShellNavItem[];
  pathname: string;
  title: string;
  headerActions?: ReactNode;
  userName?: string;
  userNote?: string;
  onLogout?: () => void;
  backLink?: { label: string; href: string };
  /** Pass next/link for client-side navigation. */
  linkComponent?: ElementType;
  children: ReactNode;
}

const SIDEBAR_W = 232;

function isActive(item: ShellNavItem, pathname: string) {
  return (item.match ?? [item.href]).some((m) => pathname === m || pathname.startsWith(`${m}/`));
}

function SidebarContent({
  navItems,
  pathname,
  userName,
  userNote,
  onLogout,
  backLink,
  linkComponent,
  idPrefix,
  onNavigate,
}: Omit<AppShellProps, 'title' | 'headerActions' | 'children'> & {
  idPrefix: string;
  onNavigate?: () => void;
}) {
  const Link = linkComponent ?? 'a';
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        color: 'rgba(255,255,255,.82)',
        p: 1.5,
      }}
    >
      <Box sx={{ px: 1, py: 1.5 }}>
        <Link
          href="/dashboard"
          aria-label="CVForge dashboard"
          style={{ display: 'inline-flex', textDecoration: 'none', color: 'inherit' }}
        >
          <Logo tone="light" />
        </Link>
      </Box>

      <Box component="nav" aria-label="App" sx={{ display: 'grid', gap: 0.5, mt: 1 }}>
        {navItems.map((item) => {
          const active = !item.disabled && isActive(item, pathname);
          const content = (
            <>
              {active && (
                <motion.span
                  layoutId={`${idPrefix}-active`}
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 10,
                    background: 'rgba(255,255,255,.1)',
                    boxShadow: `inset 3px 0 0 ${brand.marigold}`,
                  }}
                />
              )}
              <Box
                component="span"
                sx={{
                  position: 'relative',
                  display: 'inline-flex',
                  color: active ? brand.marigold : 'inherit',
                }}
              >
                {item.icon}
              </Box>
              <Box component="span" sx={{ position: 'relative', flex: 1 }}>
                {item.label}
              </Box>
              {item.badge && (
                <Chip
                  label={item.badge}
                  size="small"
                  sx={{
                    position: 'relative',
                    height: 20,
                    fontSize: 11,
                    bgcolor: 'rgba(255,255,255,.12)',
                    color: 'rgba(255,255,255,.8)',
                  }}
                />
              )}
            </>
          );
          const common = {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            px: 1.5,
            py: 1.1,
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '0.9375rem',
            textDecoration: 'none',
            color: active ? '#fff' : 'inherit',
          } as const;

          return item.disabled ? (
            <Box
              key={item.label}
              aria-disabled="true"
              sx={{ ...common, opacity: 0.5, cursor: 'not-allowed' }}
            >
              {content}
            </Box>
          ) : (
            <Box
              key={item.label}
              component={Link}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              onClick={onNavigate}
              sx={{
                ...common,
                transition: 'background-color .15s',
                '&:hover': { bgcolor: active ? undefined : 'rgba(255,255,255,.06)' },
              }}
            >
              {content}
            </Box>
          );
        })}
      </Box>

      <Box sx={{ mt: 'auto', display: 'grid', gap: 1.25 }}>
        {backLink && (
          <Box
            component={Link}
            href={backLink.href}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              py: 1,
              borderRadius: '10px',
              fontSize: '0.875rem',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': { bgcolor: 'rgba(255,255,255,.06)' },
            }}
          >
            <ArrowLeft size={16} /> {backLink.label}
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            p: 1.25,
            borderRadius: '12px',
            bgcolor: 'rgba(255,255,255,.06)',
          }}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: brand.marigold,
              color: brand.ink,
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            {(userName ?? 'G').charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" noWrap sx={{ color: '#fff', fontWeight: 600 }}>
              {userName ?? 'Guest'}
            </Typography>
            {userNote && (
              <Typography
                variant="caption"
                noWrap
                sx={{ display: 'block', color: 'rgba(255,255,255,.6)' }}
              >
                {userNote}
              </Typography>
            )}
          </Box>
          {onLogout && (
            <IconButton
              aria-label="Log out"
              onClick={onLogout}
              sx={{ color: 'rgba(255,255,255,.75)' }}
            >
              <LogOut size={18} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
}

/** Signed-in layout: fixed sidebar on desktop, drawer on mobile, sticky header, animated page content. */
export function AppShell({
  navItems,
  pathname,
  title,
  headerActions,
  userName,
  userNote,
  onLogout,
  backLink,
  linkComponent,
  children,
}: AppShellProps) {
  const [open, setOpen] = useState(false);
  const sidebarProps = {
    navItems,
    pathname,
    userName,
    userNote,
    onLogout,
    backLink,
    linkComponent,
  };

  return (
    <Box
      className="app-shell-root"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'minmax(0,1fr)', md: `${SIDEBAR_W}px minmax(0,1fr)` },
        minHeight: '100vh',
      }}
    >
      <Box
        component="aside"
        className="no-print"
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'sticky',
          top: 0,
          height: '100vh',
          bgcolor: brand.ink,
        }}
      >
        <SidebarContent {...sidebarProps} idPrefix="desktop" />
      </Box>

      <Drawer
        className="no-print"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: { md: 'none' } }}
        slotProps={{ paper: { sx: { width: 264, bgcolor: brand.ink, backgroundImage: 'none' } } }}
      >
        <SidebarContent {...sidebarProps} idPrefix="mobile" onNavigate={() => setOpen(false)} />
      </Drawer>

      <Box sx={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Box
          component="header"
          className="no-print"
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: (t) => t.zIndex.appBar,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: { xs: 1.5, md: 3 },
            bgcolor: alpha('#ffffff', 0.9),
            backdropFilter: 'saturate(160%) blur(10px)',
            borderBottom: `1px solid ${brand.line}`,
          }}
        >
          <IconButton
            sx={{ display: { md: 'none' } }}
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </IconButton>
          <Typography variant="h5" component="h1" noWrap>
            {title}
          </Typography>
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {headerActions}
          </Box>
        </Box>

        <Box
          component="main"
          className="app-shell-main"
          sx={{ flex: 1, p: { xs: 2, md: 3 }, minWidth: 0 }}
        >
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}
