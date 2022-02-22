import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateOutageDto } from './dto/create-outage.dto';
import { UpdateOutageDto } from './dto/update-outage.dto';

@Injectable()
export class OutageService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOutage(createOutageDto: CreateOutageDto) {
    return this.prismaService.outage.create({
      data: createOutageDto,
      include: {
        feeder: {
          include: {
            areaOffice: true,
            station: true,
          },
        },
        staff: true,
      },
    });
  }

  async findAllOutages(user, startDate?, endDate?) {
    return this.prismaService.outage.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        // feeder: {
        //   areaOfficeId: user.areaOfficeId,
        // },
      },
      include: {
        tagHolderName: true,
        feeder: {
          include: {
            areaOffice: true,
            station: true,
          },
        },
        staff: true,
      },
    });
  }

  async findAllStationOutages(user: User) {
    if (
      !user.stationId &&
      (user.role === Role.ADMIN || user.role === Role.SUPER)
    ) {
      return this.findAllOutages(user);
    }

    if (
      !user.stationId &&
      (user.role === Role.MOD || user.role === Role.USER)
    ) {
      throw new UnauthorizedException();
    }

    const outages = await this.prismaService.outage.findMany({
      where: {
        feeder: { stationId: user.stationId },
      },
      include: { feeder: { include: { areaOffice: true } } },
      orderBy: [{ createdAt: 'asc' }],
    });

    return outages;
  }

  async findOutageById(id: string) {
    // check if outage exists
    const outage = await this.prismaService.outage.findFirst({
      where: { id },
      include: { feeder: { include: { areaOffice: true } } },
    });
    if (!outage)
      throw new BadRequestException(`Outage with id ${id} does not exist`);

    return outage;
  }

  async updateOutage(id: string, updateOutageDto: UpdateOutageDto) {
    // check if outage exists
    const outage = await this.prismaService.outage.findFirst({
      where: { id },
    });
    if (!outage)
      throw new BadRequestException(`Outage with id ${id} does not exist`);

    return this.prismaService.outage.update({
      where: { id },
      data: updateOutageDto,
      include: { feeder: { include: { areaOffice: true } } },
    });
  }

  async deleteOutage(id: string) {
    // check if outage exists
    const outage = await this.prismaService.outage.findFirst({
      where: { id },
    });
    if (!outage)
      throw new BadRequestException(`Outage with id ${id} does not exist`);

    return this.prismaService.outage.delete({
      where: { id },
      include: { feeder: { include: { areaOffice: true } } },
    });
  }
}
