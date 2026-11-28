import { NotFoundException } from '@nestjs/common';
import { sampleCvData } from '@cvforge/types';
import type { PrismaService } from '../prisma/prisma.service';
import { CvsService } from './cvs.service';

const row = (over: Partial<Record<string, unknown>> = {}) => ({
  id: 'cv1',
  userId: 'u1',
  title: 'My CV',
  templateId: 'minimal',
  data: sampleCvData,
  createdAt: new Date('2026-01-01T00:00:00Z'),
  updatedAt: new Date('2026-01-02T00:00:00Z'),
  ...over,
});

function setup() {
  const cv = {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    deleteMany: jest.fn(),
  };
  const service = new CvsService({ cv } as unknown as PrismaService);
  return { cv, service };
}

describe('CvsService', () => {
  it("lists only the given user's CVs, newest first", async () => {
    const { cv, service } = setup();
    cv.findMany.mockResolvedValue([row()]);
    const result = await service.list('u1');
    expect(cv.findMany).toHaveBeenCalledWith({
      where: { userId: 'u1' },
      orderBy: { updatedAt: 'desc' },
    });
    expect(result[0]?.updatedAt).toBe('2026-01-02T00:00:00.000Z');
  });

  it('creates a CV for the user with defaults', async () => {
    const { cv, service } = setup();
    cv.create.mockImplementation(({ data }: { data: Record<string, unknown> }) =>
      Promise.resolve(row(data)),
    );
    const created = await service.create('u1', { title: 'New' });
    expect(created.templateId).toBe('minimal');
    expect(cv.create.mock.calls[0][0].data.userId).toBe('u1');
  });

  it('refuses to read a CV that belongs to someone else', async () => {
    const { cv, service } = setup();
    cv.findFirst.mockResolvedValue(null);
    await expect(service.get('u2', 'cv1')).rejects.toBeInstanceOf(NotFoundException);
    expect(cv.findFirst).toHaveBeenCalledWith({ where: { id: 'cv1', userId: 'u2' } });
  });

  it('updates only the fields provided', async () => {
    const { cv, service } = setup();
    cv.findFirst.mockResolvedValue(row());
    cv.update.mockResolvedValue(row({ templateId: 'modern' }));
    const updated = await service.update('u1', 'cv1', { templateId: 'modern' });
    expect(cv.update).toHaveBeenCalledWith({
      where: { id: 'cv1' },
      data: { templateId: 'modern' },
    });
    expect(updated.templateId).toBe('modern');
  });

  it('falls back to the minimal template for unknown stored values', async () => {
    const { cv, service } = setup();
    cv.findFirst.mockResolvedValue(row({ templateId: 'retired-template' }));
    expect((await service.get('u1', 'cv1')).templateId).toBe('minimal');
  });

  it('delete is scoped to the owner and reports unknown ids', async () => {
    const { cv, service } = setup();
    cv.deleteMany.mockResolvedValueOnce({ count: 1 }).mockResolvedValueOnce({ count: 0 });
    await expect(service.remove('u1', 'cv1')).resolves.toEqual({ id: 'cv1' });
    await expect(service.remove('u2', 'cv1')).rejects.toBeInstanceOf(NotFoundException);
    expect(cv.deleteMany).toHaveBeenLastCalledWith({ where: { id: 'cv1', userId: 'u2' } });
  });
});
