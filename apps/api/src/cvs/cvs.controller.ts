import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser, JwtAuthGuard, type RequestUser } from '../auth/jwt-auth.guard';
import { CvsService } from './cvs.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@ApiTags('cvs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cvs')
export class CvsController {
  constructor(private readonly cvs: CvsService) {}
  @Get() list(@CurrentUser() user: RequestUser) {
    return this.cvs.list(user.id);
  }
  @Get(':id') get(@CurrentUser() user: RequestUser, @Param('id') id: string) {
    return this.cvs.get(user.id, id);
  }
  @Post() create(@CurrentUser() user: RequestUser, @Body() dto: CreateCvDto) {
    return this.cvs.create(user.id, dto);
  }
  @Patch(':id') update(
    @CurrentUser() user: RequestUser,
    @Param('id') id: string,
    @Body() dto: UpdateCvDto,
  ) {
    return this.cvs.update(user.id, id, dto);
  }
  @Delete(':id') remove(@CurrentUser() user: RequestUser, @Param('id') id: string) {
    return this.cvs.remove(user.id, id);
  }
}
