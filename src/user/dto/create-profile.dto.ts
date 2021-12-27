import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ required: true, description: 'first name of user' })
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  firstName: string;

  @ApiProperty({ required: true, description: 'surname of user' })
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  lastName: string;

  @ApiProperty({ required: false, description: 'middle name of user' })
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  middleName?: string;

  @ApiProperty({
    required: true,
    description: 'sex of user',
    enum: Gender,
    enumName: 'Gender',
  })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ required: false, description: 'date of birth of user' })
  @IsDateString()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({ required: true, description: 'first name of user' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({ required: false, description: 'house number and street name' })
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  addressLine1?: string;

  @ApiProperty({ required: false, description: 'landmark and area' })
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  addressLine2?: string;

  @ApiProperty({ required: false, description: 'city' })
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  city?: string;

  @ApiProperty({ required: false, description: 'state of residence' })
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  state?: string;

  @ApiProperty({ required: false, description: 'state of origin' })
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  stateOfOrigin?: string;

  @ApiProperty({ required: false, description: '' })
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  country?: string;

  @ApiProperty({ required: true, description: 'user id of refernced user' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    required: true,
    description: 'id of referenced area office',
  })
  @IsNotEmpty()
  areaOfficeId: string;
}
