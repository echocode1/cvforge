import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsString, ValidateNested } from 'class-validator';
import type { CvBasics, CvData, CvEducation, CvSkillGroup, CvWork } from '@cvforge/types';

class BasicsDto implements CvBasics {
  @IsString() name: string;
  @IsString() label: string;
  @IsString() email: string;
  @IsString() phone: string;
  @IsString() location: string;
  @IsString() url: string;
  @IsString() summary: string;
}

class WorkDto implements CvWork {
  @IsString() id: string;
  @IsString() company: string;
  @IsString() position: string;
  @IsString() startDate: string;
  @IsString() endDate: string;
  @IsBoolean() current: boolean;
  @IsArray() @IsString({ each: true }) highlights: string[];
}

class EducationDto implements CvEducation {
  @IsString() id: string;
  @IsString() institution: string;
  @IsString() studyType: string;
  @IsString() area: string;
  @IsString() startDate: string;
  @IsString() endDate: string;
}

class SkillGroupDto implements CvSkillGroup {
  @IsString() id: string;
  @IsString() name: string;
  @IsArray() @IsString({ each: true }) keywords: string[];
}

export class CvDataDto implements CvData {
  @ValidateNested() @Type(() => BasicsDto) basics: BasicsDto;
  @IsArray() @ValidateNested({ each: true }) @Type(() => WorkDto) work: WorkDto[];
  @IsArray() @ValidateNested({ each: true }) @Type(() => EducationDto) education: EducationDto[];
  @IsArray() @ValidateNested({ each: true }) @Type(() => SkillGroupDto) skills: SkillGroupDto[];
}
