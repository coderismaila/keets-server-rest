import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../user.model';
import { UserService } from '../services/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Auth(Role.ADMIN)
  @Get()
  findUsers() {
    return this.userService.findUsers();
  }

  @Auth(Role.ADMIN, Role.MOD)
  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.userService.findUser({ id });
  }

  @Auth(Role.ADMIN, Role.MOD)
  @Get('byemail/:email')
  findUserByEmail(@Param('email') email: string) {
    return this.userService.findUser({ email });
  }

  @Auth(Role.ADMIN, Role.MOD)
  @Get('/byusername/:username')
  findUserByUsername(@Param('username') username: string) {
    return this.userService.findUser({ username });
  }

  @Auth(Role.ADMIN, Role.MOD)
  @Get('/bystaffid/:staffid')
  findUserByStaffId(@Param('staffid') staffId: string) {
    return this.userService.findUser({ staffId });
  }

  @Auth(Role.ADMIN, Role.MOD)
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
