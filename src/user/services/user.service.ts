import { Prisma, User } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { comparePassword, hashPassword } from 'src/utils/bcrypt.password';
import { PrismaService } from '../../prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // check if user exists
    const isUser = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.email },
          { username: createUserDto.username },
          { staffId: createUserDto.staffId },
        ],
      },
    });

    if (isUser) {
      throw new BadRequestException('User already exists');
    }

    createUserDto.password = await hashPassword(createUserDto.password);

    // create user
    const user = await this.prismaService.user.create({
      data: createUserDto,
    });

    return user;
  }

  async findUsers(): Promise<User[]> {
    return this.prismaService.user.findMany({
      include: { areaOffice: true, jobDescription: true },
    });
  }

  findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    //check if user exists
    const user = this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });
    if (!user) {
      throw new BadRequestException('Invalid user details provided');
    }
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
      include: { areaOffice: true, jobDescription: true },
    });
  }

  async findUserByEmailOrUsernameOrStaffId(identifier: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { username: identifier },
          { staffId: identifier },
          { email: identifier },
        ],
      },
      include: { jobDescription: true, areaOffice: true },
    });

    if (!user) throw new BadRequestException('Invalid user credentials');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // check if user is valid
    const isUser = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!isUser) throw new BadRequestException('user does not exist');

    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
      include: { jobDescription: true, areaOffice: true },
    });
  }

  async deleteUser(id: string): Promise<User> {
    // check if user is valid
    const isUser = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (isUser) throw new BadRequestException('user does not exist');

    return this.prismaService.user.delete({
      where: { id },
    });
  }

  async updatePassword(
    id: string,
    updatePasswordDto: { password: string; newPassword: string },
  ): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    const passwordMatch = await comparePassword(
      updatePasswordDto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new BadRequestException('Invalid credential provided');
    }

    // hash new password
    const hashedPassword = await hashPassword(updatePasswordDto.newPassword);

    this.update(id, { password: hashedPassword });

    return user;
  }
}
