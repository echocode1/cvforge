'use client';

import type { CvData, TemplateId } from '@cvforge/types';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ModernTemplate } from './templates/ModernTemplate';

export const TEMPLATE_LABELS: Record<TemplateId, string> = {
  minimal: 'Minimal',
  modern: 'Modern',
  classic: 'Classic',
};

/** Single entry point: give it data + a template id and it renders the A4 sheet. */
export function CvDocument({ data, templateId }: { data: CvData; templateId: TemplateId }) {
  switch (templateId) {
    case 'modern':
      return <ModernTemplate data={data} />;
    case 'classic':
      return <ClassicTemplate data={data} />;
    default:
      return <MinimalTemplate data={data} />;
  }
}
