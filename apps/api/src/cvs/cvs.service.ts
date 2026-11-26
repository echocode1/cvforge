import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { emptyCvData, type CreateCvInput, type Cv, type UpdateCvInput } from '@cvforge/types';

/**
 * In-memory store for now: data resets when the API restarts.
 * Swap this Map for Prisma calls once the database is wired (same method signatures).
 */
@Injectable()
export class CvsService {
  private readonly store = new Map<string, Cv>();

  list(): Cv[] {
    return [...this.store.values()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  get(id: string): Cv {
    const cv = this.store.get(id);
    if (!cv) throw new NotFoundException(`CV ${id} not found`);
    return cv;
  }

  create(input: CreateCvInput): Cv {
    const now = new Date().toISOString();
    const cv: Cv = {
      id: randomUUID(),
      title: input.title,
      templateId: input.templateId ?? 'minimal',
      data: input.data ?? structuredClone(emptyCvData),
      createdAt: now,
      updatedAt: now,
    };
    this.store.set(cv.id, cv);
    return cv;
  }

  update(id: string, input: UpdateCvInput): Cv {
    const current = this.get(id);
    const next: Cv = {
      ...current,
      title: input.title ?? current.title,
      templateId: input.templateId ?? current.templateId,
      data: input.data ?? current.data,
      updatedAt: new Date().toISOString(),
    };
    this.store.set(id, next);
    return next;
  }

  remove(id: string): { id: string } {
    this.get(id);
    this.store.delete(id);
    return { id };
  }
}
