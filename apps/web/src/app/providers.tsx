'use client';
import type { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { QueryProvider, configureHttp } from '@cvforge/api-client';
import { AppThemeProvider } from '@cvforge/ui';
import { AuthProvider } from '@/features/auth/AuthProvider';
import { clearToken, getToken } from '@/lib/token';

configureHttp({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api',
  getToken,
  onUnauthorized: () => {
    clearToken();
    if (!['/login', '/signup'].includes(window.location.pathname)) window.location.assign('/login');
  },
});
export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <AppThemeProvider>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </AppThemeProvider>
    </AppRouterCacheProvider>
  );
}
