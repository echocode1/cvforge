import type { ApiResponse, HealthStatus } from '@cvforge/types';
import { getHttp } from '../http';

export const healthService = {
  async get(): Promise<HealthStatus> {
    const { data } = await getHttp().get<ApiResponse<HealthStatus>>('/health');
    return data.data;
  },
};
