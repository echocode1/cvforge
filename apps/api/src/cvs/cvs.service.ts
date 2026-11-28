import { Injectable, NotFoundException } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import {
  emptyCvData,
  TEMPLATE_IDS,
  type CreateCvInput,
  type Cv,
  type CvData,
  type TemplateId,
  type UpdateCvInput,
} from '@cvforge/types';
import { PrismaService } from '../prisma/prisma.service';

interface CvRow {
  id: string;
  title: string;
  templateId: string;
  data: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
}
const toJson = (value: unknown): Prisma.InputJsonValue =>
  JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
const toTemplateId = (value: string): TemplateId =>
  (TEMPLATE_IDS as readonly string[]).includes(value) ? (value as TemplateId) : 'minimal';
function toCv(row: CvRow): Cv {
  return {
    id: row.id,
    title: row.title,
    templateId: toTemplateId(row.templateId),
    data: row.data as unknown as CvData,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

@Injectable()
export class CvsService {
  constructor(private readonly prisma: PrismaService) {}
  async list(userId: string): Promise<Cv[]> {
    return (
      await this.prisma.cv.findMany({ where: { userId }, orderBy: { updatedAt: 'desc' } })
    ).map(toCv);
  }
  async get(userId: string, id: string): Promise<Cv> {
    const row = await this.prisma.cv.findFirst({ where: { id, userId } });
    if (!row) throw new NotFoundException(`CV ${id} not found`);
    return toCv(row);
  }
  async create(userId: string, input: CreateCvInput): Promise<Cv> {
    return toCv(
      await this.prisma.cv.create({
        data: {
          userId,
          title: input.title,
          templateId: input.templateId ?? 'minimal',
          data: toJson(input.data ?? emptyCvData),
        },
      }),
    );
  }
  async update(userId: string, id: string, input: UpdateCvInput): Promise<Cv> {
    await this.get(userId, id);
    const row = await this.prisma.cv.update({
      where: { id },
      data: {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.templateId !== undefined && { templateId: input.templateId }),
        ...(input.data !== undefined && { data: toJson(input.data) }),
      },
    });
    return toCv(row);
  }
  async remove(userId: string, id: string): Promise<{ id: string }> {
    const result = await this.prisma.cv.deleteMany({ where: { id, userId } });
    if (!result.count) throw new NotFoundException(`CV ${id} not found`);
    return { id };
  }
}
