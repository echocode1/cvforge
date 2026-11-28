import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { CurrentUser, JwtAuthGuard, type RequestUser } from './jwt-auth.guard';

const STRICT = { default: { limit: 10, ttl: 60_000 } };
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Throttle(STRICT) @Post('signup') signUp(@Body() dto: SignUpDto) {
    return this.auth.signUp(dto);
  }
  @Throttle(STRICT) @HttpCode(200) @Post('login') login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }
  @ApiBearerAuth() @UseGuards(JwtAuthGuard) @Get('me') me(@CurrentUser() user: RequestUser) {
    return this.auth.me(user.id);
  }
}
