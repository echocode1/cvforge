import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/figtree';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'CVForge — build a CV that gets read',
  description:
    'Start from scratch or a sample, edit with a live preview, switch templates in one click and download a clean A4 PDF.',
};

export const viewport: Viewport = { themeColor: '#0f1730' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
