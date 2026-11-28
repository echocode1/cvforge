'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FileText, LayoutTemplate, Settings, Upload } from 'lucide-react';
import { AppShell, type ShellNavItem } from '@cvforge/ui';
import { ROUTES } from '@/lib/routes';
import { NewCvButton } from './NewCvButton';
import { useAuth } from '../auth/AuthProvider';

const NAV_ITEMS: ShellNavItem[] = [
  {
    label: 'My CVs',
    href: ROUTES.dashboard,
    icon: <FileText size={18} />,
    match: ['/dashboard', '/cvs'],
  },
  {
    label: 'Templates',
    href: '#',
    icon: <LayoutTemplate size={18} />,
    disabled: true,
    badge: 'Soon',
  },
  { label: 'Upload CV', href: '#', icon: <Upload size={18} />, disabled: true, badge: 'Soon' },
  { label: 'Settings', href: '#', icon: <Settings size={18} />, disabled: true, badge: 'Soon' },
];

function titleFor(pathname: string) {
  return pathname.startsWith('/cvs/') ? 'Editor' : 'My CVs';
}

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  return (
    <AppShell
      navItems={NAV_ITEMS}
      pathname={pathname}
      title={titleFor(pathname)}
      headerActions={<NewCvButton />}
      userName={user?.name || user?.email || 'Account'}
      userNote={user?.name ? user.email : undefined}
      onLogout={() => {
        logout();
        router.replace(ROUTES.signIn);
      }}
      backLink={{ label: 'Back to website', href: ROUTES.home }}
      linkComponent={Link}
    >
      {children}
    </AppShell>
  );
}
