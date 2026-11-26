import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.validation';
import { CvsModule } from './cvs/cvs.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    HealthModule,
    CvsModule,
    // Add feature modules here, one folder per domain (auth, ai, ...)
  ],
})
export class AppModule {}
