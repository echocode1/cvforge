import { ConflictException, UnauthorizedException } from '@nestjs/common';
import type { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import type { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

function setup() {
  const user = { findUnique: jest.fn(), create: jest.fn() };
  const jwt = { sign: jest.fn().mockReturnValue('signed-token') };
  const service = new AuthService(
    { user } as unknown as PrismaService,
    jwt as unknown as JwtService,
  );
  return { user, jwt, service };
}

describe('AuthService', () => {
  it('signs a user up, storing a hash and never the password', async () => {
    const { user, service } = setup();
    user.findUnique.mockResolvedValue(null);
    user.create.mockImplementation(
      ({ data }: { data: { email: string; name: string | null; passwordHash: string } }) =>
        Promise.resolve({ id: 'u1', ...data }),
    );
    const result = await service.signUp({
      email: 'a@b.com',
      password: 'correct horse',
      name: ' Ada ',
    });
    const stored = user.create.mock.calls[0][0].data;
    expect(stored.passwordHash).not.toBe('correct horse');
    expect(await bcrypt.compare('correct horse', stored.passwordHash)).toBe(true);
    expect(stored.name).toBe('Ada');
    expect(result).toEqual({
      token: 'signed-token',
      user: { id: 'u1', email: 'a@b.com', name: 'Ada' },
    });
    expect(JSON.stringify(result)).not.toContain('passwordHash');
  });

  it('rejects a duplicate email', async () => {
    const { user, service } = setup();
    user.findUnique.mockResolvedValue({ id: 'u1' });
    await expect(
      service.signUp({ email: 'a@b.com', password: 'correct horse' }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('logs in with the right password and rejects the wrong one with the same message as an unknown email', async () => {
    const { user, service } = setup();
    const passwordHash = await bcrypt.hash('correct horse', 4);
    user.findUnique.mockResolvedValue({ id: 'u1', email: 'a@b.com', name: null, passwordHash });
    await expect(
      service.login({ email: 'a@b.com', password: 'correct horse' }),
    ).resolves.toMatchObject({ token: 'signed-token' });

    const wrong = await service
      .login({ email: 'a@b.com', password: 'nope nope' })
      .catch((e: unknown) => e);
    user.findUnique.mockResolvedValue(null);
    const unknown = await service
      .login({ email: 'x@y.com', password: 'nope nope' })
      .catch((e: unknown) => e);
    expect(wrong).toBeInstanceOf(UnauthorizedException);
    expect(unknown).toBeInstanceOf(UnauthorizedException);
    expect((wrong as Error).message).toBe((unknown as Error).message);
  });
});
