import { BadRequestException, Injectable } from '@nestjs/common';
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

  findAllOutages() {
    return this.prismaService.outage.findMany({
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

  async findOutageById(id: string) {
    // check if outage exists
    const outage = await this.prismaService.outage.findFirst({
      where: { id },
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
    });
  }
}
