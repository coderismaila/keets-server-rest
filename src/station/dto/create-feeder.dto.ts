import { ApiProperty } from '@nestjs/swagger';
import { VoltageLevel } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Length } from 'class-validator';

export class CreateFeederDto {
  @ApiProperty({ type: String, description: 'Feeder name', required: true })
  @IsNotEmpty()
  @Length(3, 50)
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  name: string;

  @ApiProperty({
    enum: VoltageLevel,
    enumName: 'VoltageLevel',
    description: 'Feeder voltage level',
    required: true,
  })
  @IsNotEmpty()
  voltageLevel: VoltageLevel;

  @ApiProperty({ type: String, description: 'Feeder route length' })
  @IsOptional()
  @IsNumber()
  routeLength?: number;

  @ApiProperty({ type: String, description: 'Feeder KAEDCO code' })
  @IsOptional()
  kaedcoCode?: string;

  @ApiProperty({ type: String, description: 'Feeder NERC code' })
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  nercCode?: string;

  @ApiProperty({
    type: String,
    description: 'reference id of power transformer',
  })
  @IsNotEmpty()
  powerTransformerId: string;

  @IsNotEmpty()
  stationId: string;

  @IsNotEmpty()
  areaOfficeId: string;
}
