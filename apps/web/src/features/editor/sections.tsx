'use client';

import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { CvBasics, CvEducation, CvSkillGroup, CvWork } from '@cvforge/types';
import { Field, KeywordsField } from './fields';

const newId = () => crypto.randomUUID();

function ItemCard({ children, onRemove, removeLabel }: { children: ReactNode; onRemove: () => void; removeLabel: string }) {
  return (
    <Box sx={{ display: 'grid', gap: 1.5, p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}>
      {children}
      <Box>
        <Button size="small" color="error" onClick={onRemove}>
          {removeLabel}
        </Button>
      </Box>
    </Box>
  );
}

export function BasicsSection({ value, onChange }: { value: CvBasics; onChange: (next: CvBasics) => void }) {
  const set = (key: keyof CvBasics) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [key]: e.target.value });
  return (
    <Box sx={{ display: 'grid', gap: 1.5 }}>
      <Field label="Full name" value={value.name} onChange={set('name')} />
      <Field label="Job title" value={value.label} onChange={set('label')} />
      <Field label="Email" type="email" value={value.email} onChange={set('email')} />
      <Field label="Phone" value={value.phone} onChange={set('phone')} />
      <Field label="Location" value={value.location} onChange={set('location')} />
      <Field label="Website" value={value.url} onChange={set('url')} />
      <Field label="Summary" value={value.summary} onChange={set('summary')} multiline minRows={3} />
    </Box>
  );
}

export function WorkSection({ value, onChange }: { value: CvWork[]; onChange: (next: CvWork[]) => void }) {
  const patch = (id: string, changes: Partial<CvWork>) =>
    onChange(value.map((item) => (item.id === id ? { ...item, ...changes } : item)));
  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      {value.map((job) => (
        <ItemCard key={job.id} removeLabel="Remove job" onRemove={() => onChange(value.filter((j) => j.id !== job.id))}>
          <Field label="Company" value={job.company} onChange={(e) => patch(job.id, { company: e.target.value })} />
          <Field label="Position" value={job.position} onChange={(e) => patch(job.id, { position: e.target.value })} />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            <Field label="Start" placeholder="2022-03" value={job.startDate} onChange={(e) => patch(job.id, { startDate: e.target.value })} />
            <Field label="End" placeholder="2024-01" value={job.endDate} disabled={job.current} onChange={(e) => patch(job.id, { endDate: e.target.value })} />
          </Box>
          <FormControlLabel
            control={<Checkbox size="small" checked={job.current} onChange={(e) => patch(job.id, { current: e.target.checked })} />}
            label="I currently work here"
          />
          <Field
            label="Highlights"
            helperText="One achievement per line"
            multiline
            minRows={3}
            value={job.highlights.join('\n')}
            onChange={(e) => patch(job.id, { highlights: e.target.value.split('\n') })}
          />
        </ItemCard>
      ))}
      <Box>
        <Button
          variant="outlined"
          size="small"
          onClick={() =>
            onChange([...value, { id: newId(), company: '', position: '', startDate: '', endDate: '', current: false, highlights: [''] }])
          }
        >
          Add job
        </Button>
      </Box>
    </Box>
  );
}

export function EducationSection({ value, onChange }: { value: CvEducation[]; onChange: (next: CvEducation[]) => void }) {
  const patch = (id: string, changes: Partial<CvEducation>) =>
    onChange(value.map((item) => (item.id === id ? { ...item, ...changes } : item)));
  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      {value.map((ed) => (
        <ItemCard key={ed.id} removeLabel="Remove education" onRemove={() => onChange(value.filter((e) => e.id !== ed.id))}>
          <Field label="School" value={ed.institution} onChange={(e) => patch(ed.id, { institution: e.target.value })} />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            <Field label="Degree" value={ed.studyType} onChange={(e) => patch(ed.id, { studyType: e.target.value })} />
            <Field label="Field of study" value={ed.area} onChange={(e) => patch(ed.id, { area: e.target.value })} />
            <Field label="Start" value={ed.startDate} onChange={(e) => patch(ed.id, { startDate: e.target.value })} />
            <Field label="End" value={ed.endDate} onChange={(e) => patch(ed.id, { endDate: e.target.value })} />
          </Box>
        </ItemCard>
      ))}
      <Box>
        <Button
          variant="outlined"
          size="small"
          onClick={() => onChange([...value, { id: newId(), institution: '', studyType: '', area: '', startDate: '', endDate: '' }])}
        >
          Add education
        </Button>
      </Box>
    </Box>
  );
}

export function SkillsSection({ value, onChange }: { value: CvSkillGroup[]; onChange: (next: CvSkillGroup[]) => void }) {
  const patch = (id: string, changes: Partial<CvSkillGroup>) =>
    onChange(value.map((item) => (item.id === id ? { ...item, ...changes } : item)));
  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      {value.map((group) => (
        <ItemCard key={group.id} removeLabel="Remove group" onRemove={() => onChange(value.filter((g) => g.id !== group.id))}>
          <Field label="Group name" value={group.name} onChange={(e) => patch(group.id, { name: e.target.value })} />
          <KeywordsField label="Skills" value={group.keywords} onChange={(keywords) => patch(group.id, { keywords })} />
        </ItemCard>
      ))}
      <Box>
        <Button variant="outlined" size="small" onClick={() => onChange([...value, { id: newId(), name: '', keywords: [] }])}>
          Add skill group
        </Button>
      </Box>
    </Box>
  );
}
