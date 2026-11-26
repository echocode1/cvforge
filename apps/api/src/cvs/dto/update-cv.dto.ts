import { Type } from 'class-transformer';
import { IsIn, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { TEMPLATE_IDS, type TemplateId, type UpdateCvInput } from '@cvforge/types';
import { CvDataDto } from './cv-data.dto';

export class UpdateCvDto implements UpdateCvInput {
  @IsOptional() @IsString() @MinLength(1) @MaxLength(120) title?: string;

  @IsOptional() @IsIn([...TEMPLATE_IDS]) templateId?: TemplateId;

  @IsOptional() @ValidateNested() @Type(() => CvDataDto) data?: CvDataDto;
}
