import type { TemplateId } from '@cvforge/types';

export const NAV_LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Templates', href: '#templates' },
  { label: 'FAQ', href: '#faq' },
];

export const STEPS = [
  {
    title: 'Start your way',
    text: 'Begin from a blank page or a ready-made sample. Uploading an existing CV is on the way.',
  },
  {
    title: 'Edit with a live preview',
    text: 'Fill in each section and watch the A4 page update as you type. Every change is saved automatically.',
  },
  {
    title: 'Download your PDF',
    text: 'Pick a template, press Download PDF and send it. Your CV stays in your dashboard for next time.',
  },
];

export const TEMPLATES: { id: TemplateId; description: string }[] = [
  { id: 'minimal', description: 'Clean single column with fine rules. Safe for any industry.' },
  { id: 'modern', description: 'Dark sidebar for contact and skills, roomy main column.' },
  { id: 'classic', description: 'Centered serif header. Traditional and formal.' },
];

export const FAQS = [
  {
    q: 'Do I need an account?',
    a: 'Yes. An account keeps your CVs saved in your dashboard so you can come back later, edit them and download them again.',
  },
  {
    q: 'Can I upload my existing CV?',
    a: 'Upload with automatic parsing is being built next. For now you can start blank or from a sample and type or paste your details in.',
  },
  {
    q: 'Will the PDF work with applicant tracking systems?',
    a: 'The PDF is generated from real text, not an image, so it can be selected and searched. Templates use plain single-flow structure to stay readable by parsers.',
  },
  {
    q: 'Can I change the template after writing my CV?',
    a: 'Any time. Your content is stored separately from the design, so switching template re-lays out the same information instantly.',
  },
  {
    q: 'Will AI help write my CV?',
    a: 'It is planned: rewriting bullet points, tailoring a CV to a job description and checking keyword coverage. These will be marked clearly when they ship.',
  },
];
