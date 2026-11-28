'use client';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
export function SlowServerHint({ active, delayMs = 4000 }: { active: boolean; delayMs?: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!active) {
      setShow(false);
      return;
    }
    const timer = setTimeout(() => setShow(true), delayMs);
    return () => clearTimeout(timer);
  }, [active, delayMs]);
  if (!show) return null;
  return (
    <Alert severity="info" role="status">
      The free server is waking up. The first request after a quiet period can take up to a minute.
      Thanks for waiting.
    </Alert>
  );
}
