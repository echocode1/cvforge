import { NotFoundException } from '@nestjs/common';
import { sampleCvData } from '@cvforge/types';
import { CvsService } from './cvs.service';

describe('CvsService', () => {
  let service: CvsService;
  beforeEach(() => {
    service = new CvsService();
  });

  it('creates a CV with defaults', () => {
    const cv = service.create({ title: 'My CV' });
    expect(cv.templateId).toBe('minimal');
    expect(cv.data.work).toEqual([]);
    expect(service.list()).toHaveLength(1);
  });

  it('updates only the fields provided', () => {
    const cv = service.create({ title: 'My CV', data: sampleCvData });
    const updated = service.update(cv.id, { templateId: 'modern' });
    expect(updated.templateId).toBe('modern');
    expect(updated.title).toBe('My CV');
    expect(updated.data.basics.name).toBe('Ada Okafor');
  });

  it('throws NotFound for unknown ids', () => {
    expect(() => service.get('nope')).toThrow(NotFoundException);
    expect(() => service.remove('nope')).toThrow(NotFoundException);
  });

  it('removes a CV', () => {
    const cv = service.create({ title: 'Temp' });
    service.remove(cv.id);
    expect(service.list()).toHaveLength(0);
  });
});
