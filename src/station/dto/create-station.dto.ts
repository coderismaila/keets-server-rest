import { ApiProperty } from '@nestjs/swagger';
import { StationType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

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
    description: 'statio type',
    enum: StationType,
    enumName: 'stationType',
  })
  @IsNotEmpty()
  stationType: StationType;

  @IsOptional()
  powerTransformer?: Array<PowerTxDto>;
}

class PowerTxDto {
  id?: string;
  name: string;
  capacityKVA: number;
}
