import { BadRequestException, Injectable } from '@nestjs/common';
import { StationType } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePowerTransformerDto } from '../dto/create-power-transformer.dto';
import { UpdatePowerTransformerDto } from '../dto/update-power-transformer.dto';
import { StationService } from './station.service';

@Injectable()
export class PowerTransformerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly stationService: StationService,
  ) {}

  async createPowerTransformer(
    createPowerTransformerDto: CreatePowerTransformerDto,
  ) {
    // check if stationid exist
    const station = this.stationService.findStationById(
      createPowerTransformerDto.stationId,
    );
    if (!station) throw new BadRequestException('station not found');

    // check if name already exist in station
    const powerTransformer = this.prismaService.powerTransformer.findFirst({
      where: {
        name: createPowerTransformerDto.name,
        stationId: createPowerTransformerDto.stationId,
      },
    });

    if (powerTransformer)
      throw new BadRequestException(
        'power transformer name already exist in station',
      );

    return this.prismaService.powerTransformer.create({
      data: createPowerTransformerDto,
    });
  }

  async findAllPowerTransformer(stationType?: StationType) {
    return this.prismaService.powerTransformer.findMany({
      where: { station: { stationType } },
      include: {
        station: true,
        feeder33kv: true,
        feeder: true,
      },
    });
  }

  async findAllStationPowerTransformer(stationId: string) {
    return this.prismaService.powerTransformer.findMany({
      where: { stationId },
      include: {
        station: true,
        feeder33kv: true,
        feeder: true,
      },
    });
  }

  async findPowerTransformerById(id: string) {
    const powerTransformer =
      await this.prismaService.powerTransformer.findUnique({
        where: { id },
        include: {
          station: true,
          feeder33kv: true,
          feeder: true,
        },
      });

    if (!powerTransformer)
      throw new BadRequestException('power transformer not found');

    return powerTransformer;
  }

  async updatePowerTransformer(
    id: string,
    updatePowerTransformerDto: UpdatePowerTransformerDto,
  ) {
    // check if stationid exist
    const station = this.stationService.findStationById(
      updatePowerTransformerDto.stationId,
    );
    if (!station) throw new BadRequestException('station not found');
    const powerTransformer =
      await this.prismaService.powerTransformer.findUnique({
        where: { id },
      });

    if (!powerTransformer)
      throw new BadRequestException('power transformer not found');

    return this.prismaService.powerTransformer.update({
      where: { id },
      data: updatePowerTransformerDto,
    });
  }

  async deletePowerTransformer(id: string) {
    const powerTransformer =
      await this.prismaService.powerTransformer.findUnique({
        where: { id },
      });

    if (!powerTransformer)
      throw new BadRequestException('power transformer not found');

    return this.prismaService.powerTransformer.delete({ where: { id } });
  }
}
