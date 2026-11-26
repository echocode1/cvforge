'use client';

import Box from '@mui/material/Box';
import type { CvData } from '@cvforge/types';
import { contactItems, formatRange } from '../helpers';
import { CvPaper } from '../CvPaper';

const heading = {
  fontSize: '11pt',
  fontVariant: 'small-caps',
  letterSpacing: '0.08em',
  fontWeight: 700,
  borderBottom: '1.5px solid #1a1a1a',
  mt: '16px',
  mb: '8px',
} as const;

export function ClassicTemplate({ data }: { data: CvData }) {
  const { basics, work, education, skills } = data;
  return (
    <CvPaper fontFamily='Georgia, "Times New Roman", serif'>
      <Box sx={{ p: '16mm 20mm' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box component="h1" sx={{ fontSize: '22pt', fontWeight: 400, letterSpacing: '0.06em' }}>
            {basics.name || 'Your name'}
          </Box>
          {basics.label && <Box sx={{ fontStyle: 'italic', mt: '2px' }}>{basics.label}</Box>}
          <Box sx={{ fontSize: '9.5pt', mt: '4px' }}>{contactItems(basics).join('  •  ')}</Box>
        </Box>

        {basics.summary && (
          <>
            <Box component="h2" sx={heading}>Summary</Box>
            <Box component="p">{basics.summary}</Box>
          </>
        )}

        {work.length > 0 && <Box component="h2" sx={heading}>Professional Experience</Box>}
        {work.map((job) => (
          <Box key={job.id} sx={{ mb: '10px', breakInside: 'avoid' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <b>{job.company}</b>
              <Box component="span" sx={{ whiteSpace: 'nowrap' }}>{formatRange(job.startDate, job.endDate, job.current)}</Box>
            </Box>
            <Box sx={{ fontStyle: 'italic' }}>{job.position}</Box>
            <Box component="ul" sx={{ pl: '18px', mt: '3px' }}>
              {job.highlights.filter(Boolean).map((h, i) => <li key={i}>{h}</li>)}
            </Box>
          </Box>
        ))}

        {education.length > 0 && <Box component="h2" sx={heading}>Education</Box>}
        {education.map((ed) => (
          <Box key={ed.id} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: '4px' }}>
            <span><b>{ed.institution}</b>, {[ed.studyType, ed.area].filter(Boolean).join(' ')}</span>
            <Box component="span" sx={{ whiteSpace: 'nowrap' }}>{formatRange(ed.startDate, ed.endDate)}</Box>
          </Box>
        ))}

        {skills.length > 0 && <Box component="h2" sx={heading}>Skills</Box>}
        {skills.map((group) => (
          <Box key={group.id} sx={{ mb: '3px' }}><b>{group.name}:</b> {group.keywords.join(', ')}</Box>
        ))}
      </Box>
    </CvPaper>
  );
}
