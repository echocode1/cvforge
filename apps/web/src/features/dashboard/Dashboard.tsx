'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Copy, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useCreateCv, useCvs, useDeleteCv, useUpdateCvById } from '@cvforge/api-client';
import { sampleCvData, type Cv } from '@cvforge/types';
import { CvCard, EmptyState, RevealGroup, RevealItem, TEMPLATE_LABELS } from '@cvforge/ui';
import { timeAgo } from '@cvforge/utils';
import { DeleteDialog } from './DeleteDialog';
import { RenameDialog } from './RenameDialog';

const GRID = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 2 } as const;

export function Dashboard() {
  const router = useRouter();
  const { data: cvs, isPending, error } = useCvs();
  const create = useCreateCv();
  const update = useUpdateCvById();
  const remove = useDeleteCv();

  const [query, setQuery] = useState('');
  const [renaming, setRenaming] = useState<Cv | null>(null);
  const [deleting, setDeleting] = useState<Cv | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cvs?.filter((cv) => cv.title.toLowerCase().includes(q)) ?? [];
  }, [cvs, query]);

  const openNew = (title: string, withSample: boolean) =>
    create.mutate(
      { title, ...(withSample ? { data: sampleCvData } : {}) },
      { onSuccess: (cv) => router.push(`/cvs/${cv.id}`) },
    );

  const duplicate = (cv: Cv) =>
    create.mutate(
      { title: `${cv.title} (copy)`, templateId: cv.templateId, data: cv.data },
      { onSuccess: () => setNotice('CV duplicated') },
    );

  return (
    <Box sx={{ display: 'grid', gap: 2.5 }}>
      {create.isError && <Alert severity="error">Could not create the CV. Check that the API is running.</Alert>}
      {error && (
        <Alert severity="error">
          Could not reach the API. Start it with <code>pnpm dev</code> and check NEXT_PUBLIC_API_URL.
        </Alert>
      )}

      {isPending && !error && (
        <Box sx={GRID} aria-busy="true" aria-label="Loading your CVs">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} variant="rounded" height={352} />
          ))}
        </Box>
      )}

      {cvs && cvs.length === 0 && (
        <EmptyState
          title="Create your first CV"
          text="Start from a blank page, or load a sample to see how the templates look. Everything you make shows up here."
          actions={
            <>
              <Button variant="contained" startIcon={<Plus size={18} />} disabled={create.isPending} onClick={() => openNew('Untitled CV', false)}>
                Blank CV
              </Button>
              <Button variant="outlined" disabled={create.isPending} onClick={() => openNew('Sample CV', true)}>
                Start from sample
              </Button>
            </>
          }
        />
      )}

      {cvs && cvs.length > 0 && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search your CVs"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ width: { xs: '100%', sm: 320 } }}
              slotProps={{
                htmlInput: { 'aria-label': 'Search your CVs' },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mr: 'auto' }}>
              {filtered.length === cvs.length ? `${cvs.length} ${cvs.length === 1 ? 'CV' : 'CVs'}` : `${filtered.length} of ${cvs.length}`}
            </Typography>
            <Button variant="outlined" size="small" disabled={create.isPending} onClick={() => openNew('Sample CV', true)}>
              New from sample
            </Button>
          </Box>

          {filtered.length === 0 ? (
            <Typography color="text.secondary">No CV matches “{query}”.</Typography>
          ) : (
            <RevealGroup stagger={0.07} sx={GRID}>
              {filtered.map((cv) => (
                <RevealItem key={cv.id}>
                  <CvCard
                    title={cv.title}
                    meta={`${TEMPLATE_LABELS[cv.templateId]} · edited ${timeAgo(cv.updatedAt)}`}
                    templateId={cv.templateId}
                    data={cv.data}
                    href={`/cvs/${cv.id}`}
                    linkComponent={Link}
                    onDownload={() => router.push(`/cvs/${cv.id}?download=1`)}
                    menuActions={[
                      { label: 'Rename', icon: <Pencil size={16} />, onClick: () => setRenaming(cv) },
                      { label: 'Duplicate', icon: <Copy size={16} />, onClick: () => duplicate(cv) },
                      { label: 'Delete', icon: <Trash2 size={16} />, onClick: () => setDeleting(cv), danger: true },
                    ]}
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </>
      )}

      <RenameDialog
        open={renaming !== null}
        initialTitle={renaming?.title ?? ''}
        busy={update.isPending}
        onClose={() => setRenaming(null)}
        onSave={(title) => {
          if (!renaming) return;
          update.mutate(
            { id: renaming.id, input: { title } },
            {
              onSuccess: () => {
                setRenaming(null);
                setNotice('CV renamed');
              },
            },
          );
        }}
      />
      <DeleteDialog
        title={deleting?.title ?? null}
        busy={remove.isPending}
        onClose={() => setDeleting(null)}
        onConfirm={() => {
          if (!deleting) return;
          remove.mutate(deleting.id, {
            onSuccess: () => {
              setDeleting(null);
              setNotice('CV deleted');
            },
          });
        }}
      />
      <Snackbar open={notice !== null} autoHideDuration={2800} onClose={() => setNotice(null)} message={notice} />
    </Box>
  );
}
