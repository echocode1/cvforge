'use client';

import Box from '@mui/material/Box';
import type { CvData } from '@cvforge/types';
import { formatRange } from '../helpers';
import { CvPaper } from '../CvPaper';

const sideHeading = { fontSize: '9pt', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8fb3ff', mt: '20px', mb: '6px' } as const;
const mainHeading = { fontSize: '12pt', fontWeight: 700, color: '#1f3a8a', mt: '18px', mb: '8px' } as const;

export function ModernTemplate({ data }: { data: CvData }) {
  const { basics, work, education, skills } = data;
  return (
    <CvPaper fontFamily='"Segoe UI", Roboto, Arial, sans-serif'>
      <Box sx={{ display: 'grid', gridTemplateColumns: '68mm 1fr', minHeight: '297mm' }}>
        <Box sx={{ bgcolor: '#14213d', color: '#e8edf7', p: '16mm 8mm', fontSize: '9.5pt' }}>
          <Box component="h1" sx={{ fontSize: '20pt', fontWeight: 700, lineHeight: 1.15, color: '#fff' }}>
            {basics.name || 'Your name'}
          </Box>
          {basics.label && <Box sx={{ mt: '4px', color: '#b8c7e6' }}>{basics.label}</Box>}

          <Box component="h2" sx={sideHeading}>Contact</Box>
          {[basics.email, basics.phone, basics.location, basics.url].filter(Boolean).map((item) => (
            <Box key={item} sx={{ mb: '3px', wordBreak: 'break-word' }}>{item}</Box>
          ))}

          {skills.length > 0 && <Box component="h2" sx={sideHeading}>Skills</Box>}
          {skills.map((group) => (
            <Box key={group.id} sx={{ mb: '8px' }}>
              <Box sx={{ fontWeight: 700, color: '#fff' }}>{group.name}</Box>
              <Box sx={{ color: '#b8c7e6' }}>{group.keywords.join(' · ')}</Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ p: '16mm 12mm 16mm 10mm' }}>
          {basics.summary && (
            <>
              <Box component="h2" sx={{ ...mainHeading, mt: 0 }}>Profile</Box>
              <Box component="p">{basics.summary}</Box>
            </>
          )}

          {work.length > 0 && <Box component="h2" sx={mainHeading}>Experience</Box>}
          {work.map((job) => (
            <Box key={job.id} sx={{ mb: '12px', breakInside: 'avoid' }}>
              <Box sx={{ fontWeight: 700 }}>{job.position}</Box>
              <Box sx={{ color: '#555', fontSize: '9.5pt' }}>
                {[job.company, formatRange(job.startDate, job.endDate, job.current)].filter(Boolean).join('  |  ')}
              </Box>
              <Box component="ul" sx={{ pl: '16px', mt: '3px' }}>
                {job.highlights.filter(Boolean).map((h, i) => <li key={i}>{h}</li>)}
              </Box>
            </Box>
          ))}

          {education.length > 0 && <Box component="h2" sx={mainHeading}>Education</Box>}
          {education.map((ed) => (
            <Box key={ed.id} sx={{ mb: '8px' }}>
              <Box sx={{ fontWeight: 700 }}>{ed.institution}</Box>
              <Box sx={{ color: '#555', fontSize: '9.5pt' }}>
                {[[ed.studyType, ed.area].filter(Boolean).join(' '), formatRange(ed.startDate, ed.endDate)].filter(Boolean).join('  |  ')}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </CvPaper>
  );
}
