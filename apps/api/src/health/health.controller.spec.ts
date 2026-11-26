import { Test } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  it('returns the demo service message', async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    const result = moduleRef.get(HealthController).check();
    expect(result.message).toBe('This is my service');
    expect(result.status).toBe('ok');
  });
});
