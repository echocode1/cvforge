import axios, { type AxiosInstance } from 'axios';
import type { ApiError } from '@cvforge/types';

let instance: AxiosInstance | null = null;

/** Thrown for every failed request so callers deal with one error shape. */
export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

export interface HttpOptions {
  baseURL?: string;
  /** Return the current access token (or null). Called before every request. */
  getToken?: () => string | null;
}

export function createHttp({ baseURL, getToken }: HttpOptions = {}): AxiosInstance {
  const http = axios.create({
    baseURL: baseURL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api',
    timeout: 15_000,
    headers: { 'Content-Type': 'application/json' },
  });

  http.interceptors.request.use((config) => {
    const token = getToken?.();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  http.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (axios.isAxiosError<ApiError>(error)) {
        throw new ApiRequestError(
          error.response?.data?.message ?? error.message,
          error.response?.status ?? 0,
          error.response?.data?.details,
        );
      }
      throw error;
    },
  );

  return http;
}

/** Shared singleton used by the service functions. Call `configureHttp` once at app start to customise. */
export function configureHttp(options: HttpOptions): AxiosInstance {
  instance = createHttp(options);
  return instance;
}

export function getHttp(): AxiosInstance {
  instance ??= createHttp();
  return instance;
}
