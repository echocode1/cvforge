'use client';

import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import { Plus } from 'lucide-react';
import { useCreateCv } from '@cvforge/api-client';

/** Creates an empty CV and opens it in the editor. */
export function NewCvButton() {
  const router = useRouter();
  const create = useCreateCv();
  return (
    <Button
      variant="contained"
      size="small"
      startIcon={<Plus size={16} />}
      disabled={create.isPending}
      onClick={() => create.mutate({ title: 'Untitled CV' }, { onSuccess: (cv) => router.push(`/cvs/${cv.id}`) })}
    >
      New CV
    </Button>
  );
}
