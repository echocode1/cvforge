'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, LayoutTemplate, Settings, Upload } from 'lucide-react';
import { AppShell, type ShellNavItem } from '@cvforge/ui';
import { ROUTES } from '@/lib/routes';
import { NewCvButton } from './NewCvButton';

const NAV_ITEMS: ShellNavItem[] = [
  { label: 'My CVs', href: ROUTES.dashboard, icon: <FileText size={18} />, match: ['/dashboard', '/cvs'] },
  { label: 'Templates', href: '#', icon: <LayoutTemplate size={18} />, disabled: true, badge: 'Soon' },
  { label: 'Upload CV', href: '#', icon: <Upload size={18} />, disabled: true, badge: 'Soon' },
  { label: 'Settings', href: '#', icon: <Settings size={18} />, disabled: true, badge: 'Soon' },
];

function titleFor(pathname: string) {
  return pathname.startsWith('/cvs/') ? 'Editor' : 'My CVs';
}

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <AppShell
      navItems={NAV_ITEMS}
      pathname={pathname}
      title={titleFor(pathname)}
      headerActions={<NewCvButton />}
      userName="Guest"
      userNote="Sign-in coming soon"
      backLink={{ label: 'Back to website', href: ROUTES.home }}
      linkComponent={Link}
    >
      {children}
    </AppShell>
  );
}
