import { OutageType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOutageDto {
  @IsNotEmpty()
  feederId: string;

  @IsNotEmpty()
  @Transform(({ value }) => (value ? new Date(value).toISOString() : null))
  timeOut: Date;

  @Transform(({ value }) => (value ? new Date(value).toISOString() : null))
  timeIn?: Date;

  @IsNotEmpty()
  outageType: OutageType;

  @IsNotEmpty()
  relayIndication?: string;

  @IsOptional()
  @IsNumber()
  loadLoss: number;

  @IsOptional()
  tagNumber?: number;

  @IsOptional()
  @Transform(({ value }) => (value === '' ? null : value))
  tagHolderId?: string;

  @IsOptional()
  thirdPartyName?: string;

  @Transform(({ value }) => (value ? new Date(value).toISOString() : null))
  @IsOptional()
  tagInTime?: Date;

  @Transform(({ value }) => (value ? new Date(value).toISOString() : null))
  @IsOptional()
  tagOutTime?: Date;

  @Transform(({ value }) => (value ? value.toLowerCase() : value))
  @IsOptional()
  cause?: string;

  @Transform(({ value }) => (value ? value.toLowerCase() : value))
  @IsOptional()
  resolution?: string;

  @Transform(({ value }) => (value ? value.toLowerCase() : value))
  @IsOptional()
  staffNameTCN?: string;

  @IsOptional()
  staffId: string;
}
