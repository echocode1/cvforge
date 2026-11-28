import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import type { LoginInput, SignUpInput } from '@cvforge/types';

const normalizeEmail = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim().toLowerCase() : value;

export class SignUpDto implements SignUpInput {
  @Transform(normalizeEmail) @IsEmail() @MaxLength(254) email: string;
  @IsString() @MinLength(8) @MaxLength(72) password: string;
  @IsOptional() @IsString() @MaxLength(80) name?: string;
}

export class LoginDto implements LoginInput {
  @Transform(normalizeEmail) @IsEmail() email: string;
  @IsString() @MaxLength(72) password: string;
}
