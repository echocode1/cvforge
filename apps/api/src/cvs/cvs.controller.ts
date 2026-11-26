import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CvsService } from './cvs.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@ApiTags('cvs')
@Controller('cvs')
export class CvsController {
  constructor(private readonly cvs: CvsService) {}

  @Get()
  list() {
    return this.cvs.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.cvs.get(id);
  }

  @Post()
  create(@Body() dto: CreateCvDto) {
    return this.cvs.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCvDto) {
    return this.cvs.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvs.remove(id);
  }
}
