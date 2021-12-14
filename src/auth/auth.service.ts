import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/services/user.service';
import { comparePassword } from 'src/utils/bcrypt.password';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findUserByEmailOrUsernameOrStaffId(
      username,
    );

    const passwordMatch = await comparePassword(password, user.password);

    if (!user || !passwordMatch) {
      throw new BadRequestException('Invalid username or password');
    }

    return user;
  }

  async login(user: User) {
    const payload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(userDto: CreateUserDto) {
    const user = await this.userService.create(userDto);
    const payload = { id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
