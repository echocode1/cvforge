'use client';

import type { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { QueryProvider, configureHttp } from '@cvforge/api-client';
import { AppThemeProvider } from '@cvforge/ui';

// Runs once on the client. Swap in a token getter here when you add auth.
configureHttp({ baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api' });

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <AppThemeProvider>
        <QueryProvider>{children}</QueryProvider>
      </AppThemeProvider>
    </AppRouterCacheProvider>
  );
}
