import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateAreaOfficeDto {
  // @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  name: string;

  @ApiProperty({ required: false, description: 'area manager id' })
  @IsOptional()
  areaManagerId: string;

  @ApiProperty({ required: false, description: 'technical manager id' })
  @IsOptional()
  technicalManagerId: string;
}
