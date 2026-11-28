'use client';
import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ApiRequestError } from '@cvforge/api-client';
import { ROUTES } from '@/lib/routes';
import { useAuth } from './AuthProvider';

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const router = useRouter();
  const { status, login, signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (status === 'authenticated') router.replace(ROUTES.dashboard);
  }, [status, router]);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError('Enter a valid email address.');
    if (mode === 'signup' && password.length < 8)
      return setError('Use at least 8 characters for your password.');
    setBusy(true);
    try {
      if (mode === 'login') await login({ email, password });
      else await signUp({ email, password, ...(name.trim() ? { name: name.trim() } : {}) });
      router.replace(ROUTES.dashboard);
    } catch (e) {
      setError(
        e instanceof ApiRequestError ? e.message : 'Something went wrong. Please try again.',
      );
      setBusy(false);
    }
  }
  const signup = mode === 'signup';
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
      <Box
        component="form"
        onSubmit={submit}
        sx={{
          width: '100%',
          maxWidth: 420,
          display: 'grid',
          gap: 2,
          p: 3,
          border: 1,
          borderColor: 'divider',
          borderRadius: 3,
        }}
      >
        <Typography variant="h3" component="h1">
          {signup ? 'Create your account' : 'Welcome back'}
        </Typography>
        <Typography color="text.secondary">
          {signup ? 'Your CVs are saved to your dashboard.' : 'Sign in to open your CVs.'}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {signup && (
          <TextField
            label="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        )}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={signup ? 'new-password' : 'current-password'}
          helperText={signup ? 'At least 8 characters' : undefined}
          required
        />
        <Button type="submit" variant="contained" size="large" disabled={busy}>
          {busy ? 'Please wait...' : signup ? 'Create account' : 'Sign in'}
        </Button>
        <Typography variant="body2" textAlign="center">
          {signup ? 'Already have an account?' : 'New here?'}{' '}
          <Link href={signup ? ROUTES.signIn : ROUTES.signUp}>
            {signup ? 'Sign in' : 'Create an account'}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
