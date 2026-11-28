'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ApiRequestError, authService } from '@cvforge/api-client';
import type { AuthResponse, AuthUser, LoginInput, SignUpInput } from '@cvforge/types';
import { clearToken, getToken, setToken } from '@/lib/token';

type Status = 'loading' | 'authenticated' | 'anonymous' | 'unreachable';
interface AuthState {
  user: AuthUser | null;
  status: Status;
  login: (input: LoginInput) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  logout: () => void;
  retry: () => void;
}
const AuthContext = createContext<AuthState | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!getToken()) {
      setStatus('anonymous');
      return;
    }
    let cancelled = false;
    setStatus('loading');
    authService
      .me()
      .then((me) => {
        if (!cancelled) {
          setUser(me);
          setStatus('authenticated');
        }
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        if (error instanceof ApiRequestError && error.statusCode === 401) {
          clearToken();
          setStatus('anonymous');
        } else setStatus('unreachable');
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);
  const complete = useCallback(
    (response: AuthResponse) => {
      setToken(response.token);
      queryClient.clear();
      setUser(response.user);
      setStatus('authenticated');
    },
    [queryClient],
  );
  const login = useCallback(
    async (input: LoginInput) => complete(await authService.login(input)),
    [complete],
  );
  const signUp = useCallback(
    async (input: SignUpInput) => complete(await authService.signUp(input)),
    [complete],
  );
  const logout = useCallback(() => {
    clearToken();
    queryClient.clear();
    setUser(null);
    setStatus('anonymous');
  }, [queryClient]);
  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  const value = useMemo(
    () => ({ user, status, login, signUp, logout, retry }),
    [user, status, login, signUp, logout, retry],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
  return context;
}
