import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePowerTransformerDto {
  @ApiProperty({ required: true, description: 'power transformer name' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  name: string;

  @ApiProperty({
    required: true,
    description: 'capacity of power transformer in kva',
  })
  @IsNotEmpty()
  @IsNumber()
  capacityKVA: number;

  @IsOptional()
  @IsString()
  voltageRating?: string;

  @IsOptional()
  @IsString()
  ratedCurrent?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value === '' ? undefined : value))
  transformerPeakLoadMW: number;

  @IsOptional()
  @IsString()
  sourceStationId?: string;

  @IsOptional()
  @IsString()
  sourcePowerTransformerId?: string;

  @IsOptional()
  @IsString()
  feeder33kvId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: true, description: 'reference id of station' })
  stationId?: string;
}
