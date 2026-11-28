import type { ApiResponse, AuthResponse, AuthUser, LoginInput, SignUpInput } from '@cvforge/types';
import { getHttp } from '../http';
export const authService = {
  async signUp(input: SignUpInput): Promise<AuthResponse> {
    const { data } = await getHttp().post<ApiResponse<AuthResponse>>('/auth/signup', input);
    return data.data;
  },
  async login(input: LoginInput): Promise<AuthResponse> {
    const { data } = await getHttp().post<ApiResponse<AuthResponse>>('/auth/login', input);
    return data.data;
  },
  async me(): Promise<AuthUser> {
    const { data } = await getHttp().get<ApiResponse<AuthUser>>('/auth/me');
    return data.data;
  },
};
