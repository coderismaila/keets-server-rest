import { Prisma, User as FullUser } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { hashPassword } from 'src/utils/bcrypt.password';
import { PrismaService } from '../../prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../user.model';

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
      select: {
        id: true,
        username: true,
        email: true,
        staffId: true,
        role: true,
      },
    });

    return user;
  }

  async findUsers(): Promise<User[]> {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        staffId: true,
        role: true,
      },
    });
  }

  findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    //check if user exists
    const user = this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        username: true,
        email: true,
        staffId: true,
      },
    });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        username: true,
        email: true,
        staffId: true,
        role: true,
      },
    });
  }

  async findUserByEmailOrUsernameOrStaffId(identifier): Promise<FullUser> {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { username: identifier },
          { staffId: identifier },
          { email: identifier },
        ],
      },
    });

    if (!user) throw new BadRequestException('user does not exist');

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
      select: {
        id: true,
        username: true,
        email: true,
        staffId: true,
        role: true,
      },
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
      select: {
        id: true,
        username: true,
        email: true,
        staffId: true,
        role: true,
      },
    });
  }
}
