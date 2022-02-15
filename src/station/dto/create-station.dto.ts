import { ApiProperty } from '@nestjs/swagger';
import { StationType } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { CreatePowerTransformerDto } from './create-power-transformer.dto';

export class CreateStationDto {
  @ApiProperty({
    required: true,
    description: 'transmission or distribution station name',
  })
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  name: string;

  @ApiProperty({
    required: true,
    description: 'id of area office',
  })
  @IsNotEmpty()
  areaOfficeName: string;

  @ApiProperty({
    required: true,
    description: 'station type',
    enum: StationType,
    enumName: 'stationType',
  })
  @IsNotEmpty()
  @IsEnum({ enum: StationType })
  stationType: StationType;

  @IsOptional()
  @Type(() => CreatePowerTransformerDto)
  powerTransformer?: CreatePowerTransformerDto;
}
