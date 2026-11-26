'use client';

import type { ReactNode } from 'react';
import Container from '@mui/material/Container';

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <Container maxWidth="md" component="main" sx={{ py: 8, display: 'grid', gap: 3 }}>
      {children}
    </Container>
  );
}
