import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
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
}
