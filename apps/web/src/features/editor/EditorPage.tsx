'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useCv } from '@cvforge/api-client';
import { CvEditor } from './CvEditor';

export function EditorPage() {
  const params = useParams<{ id: string }>();
  const { data: cv, isPending, error } = useCv(params.id);

  if (isPending) {
    return (
      <Box sx={{ p: 6, display: 'grid', placeItems: 'center' }}>
        <CircularProgress aria-label="Loading CV" />
      </Box>
    );
  }
  if (error || !cv) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">
          This CV could not be loaded. It may have been deleted, or the API restarted (data is stored in memory for now).
        </Alert>
      </Box>
    );
  }
  // key = id so local draft state resets only when switching CVs
  return (
    <Suspense fallback={null}>
      <CvEditor key={cv.id} cv={cv} />
    </Suspense>
  );
}
