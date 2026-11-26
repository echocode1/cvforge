import { Injectable } from '@nestjs/common';
import type { HealthStatus } from '@cvforge/types';

@Injectable()
export class HealthService {
  check(): HealthStatus {
    return {
      message: 'This is my service',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
