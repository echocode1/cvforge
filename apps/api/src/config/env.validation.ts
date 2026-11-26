export interface Env {
  PORT: number;
  CORS_ORIGIN: string;
  DATABASE_URL?: string;
  JWT_SECRET?: string;
}

export function validateEnv(raw: Record<string, unknown>): Env {
  const port = Number(raw.PORT ?? 4000);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error('PORT must be a positive integer');
  }
  return {
    PORT: port,
    CORS_ORIGIN: String(raw.CORS_ORIGIN ?? 'http://localhost:3000'),
    DATABASE_URL: raw.DATABASE_URL ? String(raw.DATABASE_URL) : undefined,
    JWT_SECRET: raw.JWT_SECRET ? String(raw.JWT_SECRET) : undefined,
  };
}
