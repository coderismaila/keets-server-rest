import { BadRequestException, Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProfile(data: CreateProfileDto): Promise<Profile> {
    // check if user already has a profile
    const profile = await this.prismaService.profile.findFirst({
      where: { userId: data.userId },
    });

    if (profile) throw new BadRequestException('user already has a profile');

    // check if phone number is taken
    const phoneTaken = await this.prismaService.profile.findFirst({
      where: { phoneNumber: data.phoneNumber },
    });

    if (phoneTaken)
      throw new BadRequestException(
        `phone number already registered with a different user`,
      );

    return this.prismaService.profile.create({ data, include: { user: true } });
  }

  async getProfileById(id: string): Promise<Profile> {
    const profile = await this.prismaService.profile.findUnique({
      where: { id },
    });

    if (!profile) throw new BadRequestException('invalid profile');

    return profile;
  }

  async updateProfile(
    id: string,
    profileDto: UpdateProfileDto,
  ): Promise<Profile> {
    // check if profile exist
    const profile = await this.prismaService.profile.findUnique({
      where: { id },
    });

    if (!profile) throw new BadRequestException('invalid profile');

    return this.prismaService.profile.update({
      where: { id },
      data: profileDto,
      include: { user: true },
    });
  }

  async deleteProfile(id: string): Promise<Profile> {
    const profile = await this.prismaService.profile.findUnique({
      where: { id },
    });

    if (!profile) throw new BadRequestException('invalid profile');

    return this.prismaService.profile.delete({ where: { id } });
  }
}
