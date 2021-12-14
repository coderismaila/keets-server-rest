import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

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

    if (user && user.password === password) {
      delete user.password;

      return user;
    }

    return null;
  }

  async login(user: User) {
    const payload = { user, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
