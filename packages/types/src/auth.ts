export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
}
export interface SignUpInput {
  email: string;
  password: string;
  name?: string;
}
export interface LoginInput {
  email: string;
  password: string;
}
export interface AuthResponse {
  token: string;
  user: AuthUser;
}
