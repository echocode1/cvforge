import type { ReactNode } from 'react';
import { AppLayout } from '@/features/shell/AppLayout';
import { RequireAuth } from '@/features/auth/RequireAuth';

export default function AppGroupLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <AppLayout>{children}</AppLayout>
    </RequireAuth>
  );
}
