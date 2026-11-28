import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import type { AuthResponse, AuthUser } from '@cvforge/types';
import { PrismaService } from '../prisma/prisma.service';
import type { LoginDto, SignUpDto } from './dto/auth.dto';

const BCRYPT_ROUNDS = 10;
const DUMMY_HASH = '$2a$10$CwTycUXWue0Thq9StjUM0uJ8.5KZxZ1H0m5QJp3WZ5bX0b0y1Qm9G';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}
  async signUp(dto: SignUpDto): Promise<AuthResponse> {
    if (await this.prisma.user.findUnique({ where: { email: dto.email } }))
      throw new ConflictException('An account with this email already exists');
    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);
    try {
      return this.issue(
        await this.prisma.user.create({
          data: { email: dto.email, name: dto.name?.trim() || null, passwordHash },
        }),
      );
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        (error as { code?: string }).code === 'P2002'
      )
        throw new ConflictException('An account with this email already exists');
      throw error;
    }
  }
  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    const ok = await bcrypt.compare(dto.password, user?.passwordHash ?? DUMMY_HASH);
    if (!user || !ok) throw new UnauthorizedException('Invalid email or password');
    return this.issue(user);
  }
  async me(userId: string): Promise<AuthUser> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Account no longer exists');
    return this.toAuthUser(user);
  }
  private issue(user: { id: string; email: string; name: string | null }): AuthResponse {
    return {
      token: this.jwt.sign({ sub: user.id, email: user.email }),
      user: this.toAuthUser(user),
    };
  }
  private toAuthUser(user: { id: string; email: string; name: string | null }): AuthUser {
    return { id: user.id, email: user.email, name: user.name };
  }
}
