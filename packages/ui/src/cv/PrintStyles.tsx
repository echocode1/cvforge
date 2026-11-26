'use client';

import GlobalStyles from '@mui/material/GlobalStyles';

/**
 * Mount once on the editor page. When printing ("Save as PDF"), everything marked
 * `.no-print` (sidebar, header, forms, toolbar) disappears and the A4 sheet prints at full size.
 */
export function PrintStyles() {
  return (
    <GlobalStyles
      styles={{
        '@page': { size: 'A4', margin: 0 },
        '@media print': {
          'html, body': { background: '#fff !important' },
          '.no-print': { display: 'none !important' },
          '.app-shell-root': { display: 'block !important' },
          '.app-shell-main': { padding: '0 !important' },
          '.cv-editor-root': { padding: '0 !important', display: 'block !important' },
          '.cv-editor-grid': { display: 'block !important' },
          '.cv-preview-col': {
            padding: '0 !important',
            background: 'none !important',
            overflow: 'visible !important',
            position: 'static !important',
            display: 'block !important',
          },
          '.cv-preview-scale': { zoom: '1 !important' },
          '.cv-print-area': { boxShadow: 'none !important', margin: '0 !important' },
        },
      }}
    />
  );
}
