import { BadRequestException, Injectable } from '@nestjs/common';
import { AreaOffice } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateAreaOfficeDto } from './dto/create-area-office.dto';
import { UpdateAreaOfficeDto } from './dto/update-area-office.dto';

@Injectable()
export class AreaOfficeService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAreaOffice(
    createAreaOfficeDto: CreateAreaOfficeDto,
  ): Promise<AreaOffice> {
    return this.prismaService.areaOffice.create({
      data: createAreaOfficeDto,
      include: { areaManager: true, technicalManager: true },
    });
  }

  async findAllAreaOffice(): Promise<AreaOffice[]> {
    return this.prismaService.areaOffice.findMany({
      include: { areaManager: true, technicalManager: true },
      orderBy: { name: 'asc' },
    });
  }

  async findAreaOfficeById(id: string) {
    // check if area office exists
    const areaOffice = await this.prismaService.areaOffice.findUnique({
      where: {
        id,
      },
      include: { areaManager: true, technicalManager: true },
    });

    if (!areaOffice) {
      throw new BadRequestException('Area office not found');
    }

    return areaOffice;
  }

  async updateAreaOffice(
    id: string,
    updateAreaOfficeDto: UpdateAreaOfficeDto,
  ): Promise<AreaOffice> {
    // check if area office exists
    const areaOffice = await this.prismaService.areaOffice.findUnique({
      where: {
        id,
      },
    });

    if (!areaOffice) {
      throw new BadRequestException('Area office not found');
    }

    return this.prismaService.areaOffice.update({
      where: {
        id,
      },
      data: updateAreaOfficeDto,
      include: { areaManager: true, technicalManager: true },
    });
  }

  deleteAreaOffice(id: string) {
    // check if area office exists
    const areaOffice = this.prismaService.areaOffice.findUnique({
      where: {
        id,
      },
    });

    if (!areaOffice) {
      throw new BadRequestException('Area office not found');
    }

    return this.prismaService.areaOffice.delete({
      where: {
        id,
      },
    });
  }
}
