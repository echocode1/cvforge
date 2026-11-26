'use client';

import Box from '@mui/material/Box';
import type { CvData } from '@cvforge/types';
import { contactItems, formatRange } from '../helpers';
import { CvPaper } from '../CvPaper';

const heading = {
  fontSize: '9pt',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#555',
  borderBottom: '1px solid #d8d8d8',
  pb: '4px',
  mt: '18px',
  mb: '8px',
} as const;

export function MinimalTemplate({ data }: { data: CvData }) {
  const { basics, work, education, skills } = data;
  return (
    <CvPaper fontFamily='"Helvetica Neue", Arial, sans-serif'>
      <Box sx={{ p: '16mm 18mm' }}>
        <Box component="h1" sx={{ fontSize: '24pt', fontWeight: 700, lineHeight: 1.15 }}>
          {basics.name || 'Your name'}
        </Box>
        {basics.label && <Box sx={{ fontSize: '12pt', color: '#555', mt: '2px' }}>{basics.label}</Box>}
        <Box sx={{ fontSize: '9.5pt', color: '#555', mt: '6px' }}>{contactItems(basics).join('  ·  ')}</Box>

        {basics.summary && <Box component="p" sx={{ mt: '14px' }}>{basics.summary}</Box>}

        {work.length > 0 && <Box component="h2" sx={heading}>Experience</Box>}
        {work.map((job) => (
          <Box key={job.id} sx={{ mb: '10px', breakInside: 'avoid' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, fontWeight: 700 }}>
              <span>{job.position}{job.company && ` · ${job.company}`}</span>
              <Box component="span" sx={{ fontWeight: 400, color: '#555', whiteSpace: 'nowrap' }}>
                {formatRange(job.startDate, job.endDate, job.current)}
              </Box>
            </Box>
            <Box component="ul" sx={{ pl: '18px', mt: '3px' }}>
              {job.highlights.filter(Boolean).map((h, i) => <li key={i}>{h}</li>)}
            </Box>
          </Box>
        ))}

        {education.length > 0 && <Box component="h2" sx={heading}>Education</Box>}
        {education.map((ed) => (
          <Box key={ed.id} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: '6px' }}>
            <span>
              <b>{ed.institution}</b>{(ed.studyType || ed.area) && ` — ${[ed.studyType, ed.area].filter(Boolean).join(' ')}`}
            </span>
            <Box component="span" sx={{ color: '#555', whiteSpace: 'nowrap' }}>{formatRange(ed.startDate, ed.endDate)}</Box>
          </Box>
        ))}

        {skills.length > 0 && <Box component="h2" sx={heading}>Skills</Box>}
        {skills.map((group) => (
          <Box key={group.id} sx={{ mb: '3px' }}>
            <b>{group.name}:</b> {group.keywords.join(', ')}
          </Box>
        ))}
      </Box>
    </CvPaper>
  );
}
