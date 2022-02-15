import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePowerTransformerDto {
  @ApiProperty({ required: true, description: 'power transformer name' })
  @IsNotEmpty()
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
  voltageRating?: string;

  @IsOptional()
  ratedCurrent?: string;

  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? parseFloat(value) : parseFloat(value),
  )
  transformerPeakLoadMW: number;

  @IsOptional()
  sourceStationId?: string;

  @IsOptional()
  sourcePowerTransformerId?: string;

  @IsOptional()
  feeder33kvId?: string;

  @IsOptional()
  @ApiProperty({ required: true, description: 'reference id of station' })
  stationId?: string;
}
