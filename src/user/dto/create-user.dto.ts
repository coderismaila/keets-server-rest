import { ApiProperty } from '@nestjs/swagger';
import { Designation, Gender, Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'Email address of user',
    example: 'user@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    description: 'unique username of user',
    example: 'user',
  })
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  @Length(4, 25)
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    required: true,
    description: 'unique staff id of user',
    example: '12345',
  })
  @IsNotEmpty()
  @IsNumberString()
  staffId: string;

  @ApiProperty({
    required: false,
    description: 'Role of user',
    example: Role.ADMIN,
    enum: Role,
    enumName: 'Role',
  })
  @IsOptional()
  role?: Role;

  @ApiProperty({
    required: true,
    description: 'minimum 8 character password of user',
  })
  @Length(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: true, description: 'first name of user' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: true, description: 'surname of user' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ required: false, description: 'middle name of user' })
  @IsOptional()
  middleName?: string;

  @ApiProperty({ required: true, description: 'reference id of are office' })
  @IsNotEmpty()
  jobDescriptionId: string;

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
  @Transform(({ value }) => new Date(value).toISOString())
  birthDate?: Date;

  @ApiProperty({ required: true, description: 'first name of user' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({ required: false, description: 'house number and street name' })
  @IsOptional()
  addressLine1?: string;

  @ApiProperty({ required: false, description: 'landmark and area' })
  @IsOptional()
  addressLine2?: string;

  @ApiProperty({ required: false, description: 'city' })
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false, description: 'state of residence' })
  @IsOptional()
  state?: string;

  @ApiProperty({ required: false, description: 'state of origin' })
  @IsOptional()
  stateOfOrigin?: string;

  @ApiProperty({ required: false, description: '' })
  @IsOptional()
  country?: string;

  @ApiProperty({
    required: true,
    description: 'id of referenced area office',
  })
  @IsNotEmpty()
  areaOfficeId: string;

  @IsNotEmpty()
  designation: Designation;
}
