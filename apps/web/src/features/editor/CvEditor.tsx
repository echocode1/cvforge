'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { useUpdateCv } from '@cvforge/api-client';
import { TEMPLATE_IDS, type Cv, type CvData, type TemplateId } from '@cvforge/types';
import { CvDocument, PrintStyles, TEMPLATE_LABELS } from '@cvforge/ui';
import { Field } from './fields';
import { BasicsSection, EducationSection, SkillsSection, WorkSection } from './sections';

type SaveStatus = 'saved' | 'unsaved' | 'saving' | 'error';

const STATUS_TEXT: Record<SaveStatus, string> = {
  saved: 'All changes saved',
  unsaved: 'Unsaved changes',
  saving: 'Saving...',
  error: 'Could not save. Retrying on your next edit.',
};

const PREVIEW_ZOOM = 0.64;

export function CvEditor({ cv }: { cv: Cv }) {
  const [title, setTitle] = useState(cv.title);
  const [templateId, setTemplateId] = useState<TemplateId>(cv.templateId);
  const [data, setData] = useState<CvData>(cv.data);
  const [status, setStatus] = useState<SaveStatus>('saved');
  const dirty = useRef(false);
  const update = useUpdateCv(cv.id);
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  // Arriving from the dashboard's Download button (?download=1): open the print dialog once.
  useEffect(() => {
    if (search.get('download') !== '1') return;
    const timer = setTimeout(() => {
      router.replace(pathname);
      window.print();
    }, 900);
    return () => clearTimeout(timer);
    // run once on arrival
  }, []);

  // Debounced autosave: 800ms after the last edit.
  useEffect(() => {
    if (!dirty.current) return;
    setStatus('unsaved');
    const timer = setTimeout(() => {
      setStatus('saving');
      update.mutate(
        { title: title.trim() || 'Untitled CV', templateId, data },
        { onSuccess: () => setStatus('saved'), onError: () => setStatus('error') },
      );
    }, 800);
    return () => clearTimeout(timer);
  }, [title, templateId, data]);

  const edit = <T,>(setter: (value: T) => void) => (value: T) => {
    dirty.current = true;
    setter(value);
  };
  const patchData = <K extends keyof CvData>(key: K) => edit((value: CvData[K]) => setData((prev) => ({ ...prev, [key]: value })));

  return (
    <Box className="cv-editor-root" sx={{ display: 'grid', gap: 2 }}>
      <PrintStyles />

      <Box className="no-print" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
        <Button component={Link} href="/dashboard">
          All CVs
        </Button>
        <Box sx={{ flex: '1 1 220px', maxWidth: 360 }}>
          <Field label="CV name" value={title} onChange={(e) => edit(setTitle)(e.target.value)} />
        </Box>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={templateId}
          aria-label="Template"
          onChange={(_, next: TemplateId | null) => next && edit(setTemplateId)(next)}
        >
          {TEMPLATE_IDS.map((id) => (
            <ToggleButton key={id} value={id}>
              {TEMPLATE_LABELS[id]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Typography variant="body2" color={status === 'error' ? 'error' : 'text.secondary'} role="status" sx={{ ml: 'auto' }}>
          {STATUS_TEXT[status]}
        </Typography>
        <Button variant="contained" onClick={() => window.print()}>
          Download PDF
        </Button>
      </Box>

      <Box
        className="cv-editor-grid"
        sx={{ display: 'grid', gap: 3, alignItems: 'start', gridTemplateColumns: { xs: '1fr', lg: 'minmax(340px, 400px) minmax(0, 1fr)' } }}
      >
        <Box className="no-print">
          <Section title="Basics" defaultExpanded>
            <BasicsSection value={data.basics} onChange={patchData('basics')} />
          </Section>
          <Section title="Experience">
            <WorkSection value={data.work} onChange={patchData('work')} />
          </Section>
          <Section title="Education">
            <EducationSection value={data.education} onChange={patchData('education')} />
          </Section>
          <Section title="Skills">
            <SkillsSection value={data.skills} onChange={patchData('skills')} />
          </Section>
        </Box>

        <Box
          className="cv-preview-col"
          sx={{ position: { lg: 'sticky' }, top: 72, overflow: 'auto', bgcolor: 'action.hover', borderRadius: 2, p: 2, display: 'flex', justifyContent: 'center' }}
        >
          <Box className="cv-preview-scale" sx={{ zoom: PREVIEW_ZOOM, flexShrink: 0, boxShadow: 3 }}>
            <CvDocument data={data} templateId={templateId} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Section({ title, children, defaultExpanded = false }: { title: string; children: React.ReactNode; defaultExpanded?: boolean }) {
  return (
    <Accordion defaultExpanded={defaultExpanded} disableGutters variant="outlined">
      <AccordionSummary>
        <Typography fontWeight={600}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
