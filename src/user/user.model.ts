import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  staffId: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: Role;
}
