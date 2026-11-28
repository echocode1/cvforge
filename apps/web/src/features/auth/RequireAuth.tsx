'use client';
import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { SlowServerHint } from '@cvforge/ui';
import { ROUTES } from '@/lib/routes';
import { useAuth } from './AuthProvider';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { status, retry } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (status === 'anonymous') router.replace(ROUTES.signIn);
  }, [status, router]);
  if (status === 'authenticated') return <>{children}</>;
  if (status === 'unreachable')
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 3 }}>
        <Box sx={{ display: 'grid', gap: 2, maxWidth: 420 }}>
          <Alert severity="warning">
            We could not reach the server. Your session is still saved; try again in a moment.
          </Alert>
          <Button variant="contained" onClick={retry}>
            Try again
          </Button>
        </Box>
      </Box>
    );
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 3 }}>
      <Box sx={{ display: 'grid', gap: 2, justifyItems: 'center', maxWidth: 420 }}>
        <CircularProgress aria-label="Checking your session" />
        <SlowServerHint active={status === 'loading'} />
      </Box>
    </Box>
  );
}
