import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateStationDto } from '../dto/create-station.dto';
import { UpdateStationDto } from '../dto/update-station.dto';

@Injectable()
export class StationService {
  constructor(private readonly prismaService: PrismaService) {}

  async createStation(createStationDto: CreateStationDto) {
    // check if name already exist
    const station = this.prismaService.station.findUnique({
      where: { name: createStationDto.name },
    });
    if (station) throw new BadRequestException('station name already exist');

    return this.prismaService.station.create({ data: createStationDto });
  }

  findAllStation() {
    return this.prismaService.station.findMany({});
  }

  async findStationById(id: string) {
    const station = await this.prismaService.station.findUnique({
      where: { id },
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
      data: updateStationDto,
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
