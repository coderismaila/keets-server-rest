import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePowerTransformerDto {
  @ApiProperty({ required: true, description: 'power transformer name' })
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  name: string;

  @ApiProperty({ required: true, description: 'reference id of station' })
  @IsNotEmpty()
  stationId: string;

  @ApiProperty({
    required: true,
    description: 'capacity of power transformer in kva',
  })
  @IsNotEmpty()
  @IsNumber()
  capacityKVA: number;

  @IsOptional()
  feeder33kvId?: string;

  @IsOptional()
  voltageRating: string;

  @IsOptional()
  ratedCurrent: number;

  @IsOptional()
  transformerPeakLoadMW?: number;

  @IsOptional()
  sourcePowerTransformerId?: string;

  @IsOptional()
  sourceStationId?: string;
}
