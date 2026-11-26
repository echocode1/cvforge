import type { ApiResponse, CreateCvInput, Cv, UpdateCvInput } from '@cvforge/types';
import { getHttp } from '../http';

export const cvsService = {
  async list(): Promise<Cv[]> {
    const { data } = await getHttp().get<ApiResponse<Cv[]>>('/cvs');
    return data.data;
  },
  async get(id: string): Promise<Cv> {
    const { data } = await getHttp().get<ApiResponse<Cv>>(`/cvs/${id}`);
    return data.data;
  },
  async create(input: CreateCvInput): Promise<Cv> {
    const { data } = await getHttp().post<ApiResponse<Cv>>('/cvs', input);
    return data.data;
  },
  async update(id: string, input: UpdateCvInput): Promise<Cv> {
    const { data } = await getHttp().patch<ApiResponse<Cv>>(`/cvs/${id}`, input);
    return data.data;
  },
  async remove(id: string): Promise<{ id: string }> {
    const { data } = await getHttp().delete<ApiResponse<{ id: string }>>(`/cvs/${id}`);
    return data.data;
  },
};
