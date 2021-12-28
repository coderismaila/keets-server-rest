import { ApiProperty } from '@nestjs/swagger';
import { StationType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

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
  areaOfficeId: string;

  @ApiProperty({
    required: true,
    description: 'statio type',
    enum: StationType,
    enumName: 'stationType',
  })
  @IsNotEmpty()
  stationType: StationType;
}
