import { Prisma } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

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

    // create user
    const user = await this.prismaService.user.create({
      data: createUserDto,
      select: {
        id: true,
        username: true,
        email: true,
        staffId: true,
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
      },
    });
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
      },
    });
  }
}
