import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get()
  findUsers() {
    return this.userService.findUsers();
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.userService.findUser({ id });
  }

  @Get('byemail/:email')
  findUserByEmail(@Param('email') email: string) {
    return this.userService.findUser({ email });
  }

  @Get('/byusername/:username')
  findUserByUsername(@Param('username') username: string) {
    return this.userService.findUser({ username });
  }

  @Get('/bystaffid/:staffid')
  findUserByStaffId(@Param('staffid') staffId: string) {
    return this.userService.findUser({ staffId });
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
