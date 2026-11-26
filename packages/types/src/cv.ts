/**
 * CV data model. Loosely follows the open JSON Resume schema so imports/exports
 * to other tools stay easy. Templates render this shape and nothing else.
 */
export type TemplateId = 'minimal' | 'modern' | 'classic';

export const TEMPLATE_IDS: readonly TemplateId[] = ['minimal', 'modern', 'classic'];

export interface CvBasics {
  name: string;
  label: string;
  email: string;
  phone: string;
  location: string;
  url: string;
  summary: string;
}

export interface CvWork {
  id: string;
  company: string;
  position: string;
  startDate: string; // free text or YYYY-MM
  endDate: string;
  current: boolean;
  highlights: string[];
}

export interface CvEducation {
  id: string;
  institution: string;
  studyType: string;
  area: string;
  startDate: string;
  endDate: string;
}

export interface CvSkillGroup {
  id: string;
  name: string;
  keywords: string[];
}

export interface CvData {
  basics: CvBasics;
  work: CvWork[];
  education: CvEducation[];
  skills: CvSkillGroup[];
}

export interface Cv {
  id: string;
  title: string;
  templateId: TemplateId;
  data: CvData;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCvInput {
  title: string;
  templateId?: TemplateId;
  data?: CvData;
}

export interface UpdateCvInput {
  title?: string;
  templateId?: TemplateId;
  data?: CvData;
}

export const emptyCvData: CvData = {
  basics: { name: '', label: '', email: '', phone: '', location: '', url: '', summary: '' },
  work: [],
  education: [],
  skills: [],
};

export const sampleCvData: CvData = {
  basics: {
    name: 'Ada Okafor',
    label: 'Product Designer',
    email: 'ada@example.com',
    phone: '+234 800 000 0000',
    location: 'Lagos, Nigeria',
    url: 'ada.design',
    summary:
      'Product designer with six years of experience turning messy workflows into simple, accessible interfaces for fintech and logistics teams.',
  },
  work: [
    {
      id: 'w1',
      company: 'Northwind Logistics',
      position: 'Senior Product Designer',
      startDate: '2022-03',
      endDate: '',
      current: true,
      highlights: [
        'Redesigned the dispatcher dashboard, cutting average task time by 31%.',
        'Built a shared component library used by four product squads.',
      ],
    },
    {
      id: 'w2',
      company: 'Paystack Labs',
      position: 'Product Designer',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      highlights: ['Led the onboarding flow redesign that lifted activation by 18%.'],
    },
  ],
  education: [
    {
      id: 'e1',
      institution: 'University of Lagos',
      studyType: 'B.Sc.',
      area: 'Computer Science',
      startDate: '2014',
      endDate: '2018',
    },
  ],
  skills: [
    { id: 's1', name: 'Design', keywords: ['Figma', 'Prototyping', 'Design systems'] },
    { id: 's2', name: 'Research', keywords: ['User interviews', 'Usability testing'] },
  ],
};
