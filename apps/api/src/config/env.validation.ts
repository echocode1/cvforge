export interface Env {
  PORT: number;
  CORS_ORIGIN: string;
  DATABASE_URL: string;
  DIRECT_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
}

function required(raw: Record<string, unknown>, key: string): string {
  const value = raw[key];
  if (typeof value !== 'string' || value.trim() === '')
    throw new Error(`Missing required environment variable ${key} (see apps/api/.env.example)`);
  return value;
}

export function validateEnv(raw: Record<string, unknown>): Env {
  const port = Number(raw.PORT ?? 4000);
  if (!Number.isInteger(port) || port <= 0) throw new Error('PORT must be a positive integer');
  const secret = required(raw, 'JWT_SECRET');
  if (secret.length < 16) throw new Error('JWT_SECRET must be at least 16 characters');
  const databaseUrl = required(raw, 'DATABASE_URL');
  return {
    PORT: port,
    CORS_ORIGIN: String(raw.CORS_ORIGIN ?? 'http://localhost:3000'),
    DATABASE_URL: databaseUrl,
    DIRECT_URL: typeof raw.DIRECT_URL === 'string' && raw.DIRECT_URL ? raw.DIRECT_URL : databaseUrl,
    JWT_SECRET: secret,
    JWT_EXPIRES_IN: String(raw.JWT_EXPIRES_IN ?? '7d'),
  };
}
