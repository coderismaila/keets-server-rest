import { BadRequestException, Injectable } from '@nestjs/common';
import { Station } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateStationDto } from '../dto/create-station.dto';
import { UpdateStationDto } from '../dto/update-station.dto';

@Injectable()
export class StationService {
  constructor(private readonly prismaService: PrismaService) {}

  async createStation(createStationDto: CreateStationDto): Promise<Station> {
    // check if name already exist
    const station = await this.prismaService.station.findUnique({
      where: { name: createStationDto.name },
    });
    if (station) throw new BadRequestException('station name already exist');

    console.log(createStationDto.powerTransformer);

    return this.prismaService.station.create({
      data: {
        name: createStationDto.name,
        stationType: createStationDto.stationType,
        areaOffice: { connect: { name: createStationDto.areaOfficeName } },
        powerTransformer: {
          createMany: {
            data: createStationDto.powerTransformer,
          },
        },
      },
      include: { areaOffice: true, powerTransformer: true },
    });
  }

  findAllStation() {
    return this.prismaService.station.findMany({
      include: { areaOffice: true, powerTransformer: true },
    });
  }

  async findStationById(id: string) {
    const station = await this.prismaService.station.findUnique({
      where: { id },
      include: { areaOffice: true, powerTransformer: true },
    });

    if (!station) throw new BadRequestException('station not found');

    return station;
  }

  async updateStation(id: string, updateStationDto: UpdateStationDto) {
    const station = await this.prismaService.station.findUnique({
      where: { id },
    });

    if (!station) throw new BadRequestException('station not found');

    return this.prismaService.station.update({
      where: { id },
      data: {
        name: updateStationDto.name,
        stationType: updateStationDto.stationType,
        areaOffice: { connect: { name: updateStationDto.areaOfficeName } },
      },
      include: { areaOffice: true, powerTransformer: true },
    });
  }

  async deleteStation(id: string) {
    const station = await this.prismaService.station.findUnique({
      where: { id },
    });

    if (!station) throw new BadRequestException('station not found');

    return this.prismaService.station.delete({ where: { id } });
  }
}
