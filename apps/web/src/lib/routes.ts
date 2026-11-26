/**
 * Central route map. Until auth exists, sign-in and sign-up both go straight to the dashboard;
 * point them at /signup and /login when those pages are built.
 */
export const ROUTES = {
  home: '/',
  signUp: '/dashboard',
  signIn: '/dashboard',
  dashboard: '/dashboard',
} as const;
