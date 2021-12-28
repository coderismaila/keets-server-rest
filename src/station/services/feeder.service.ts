import { BadRequestException, Injectable } from '@nestjs/common';
import { Feeder } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateFeederDto } from '../dto/create-feeder.dto';
import { UpdateFeederDto } from '../dto/update-feeder.dto';

@Injectable()
export class FeederService {
  constructor(private readonly prismaService: PrismaService) {}

  async createFeeder(createFeederDto: CreateFeederDto): Promise<Feeder> {
    // check if feeder name already exist
    const feeder = await this.prismaService.feeder.findUnique({
      where: { name: createFeederDto.name },
    });
    if (feeder) throw new BadRequestException('feeder name already exist');

    return this.prismaService.feeder.create({
      data: createFeederDto,
    });
  }

  async findAllFeeder(): Promise<Feeder[]> {
    return this.prismaService.feeder.findMany({});
  }

  async findAllFeederOnPowerTransformer(
    powerTransformerId: string,
  ): Promise<Feeder[]> {
    // check if power transformer exist
    const powerTransformer =
      await this.prismaService.powerTransformer.findUnique({
        where: { id: powerTransformerId },
      });

    if (!powerTransformer)
      throw new BadRequestException('power transformer not found');

    return this.prismaService.feeder.findMany({
      where: { powerTransformerId },
    });
  }

  async findFeederById(id: string) {
    const feeder = await this.prismaService.feeder.findUnique({
      where: { id },
    });

    if (!feeder) throw new BadRequestException('feeder not found');

    return feeder;
  }

  async updateFeeder(
    id: string,
    updateFeederDto: UpdateFeederDto,
  ): Promise<Feeder> {
    // check if feeder exist
    const feeder = await this.prismaService.feeder.findUnique({
      where: { id },
    });

    if (!feeder) throw new BadRequestException('feeder not found');

    return this.prismaService.feeder.update({
      where: { id },
      data: updateFeederDto,
    });
  }

  async deleteFeeder(id: string): Promise<Feeder> {
    // check if feeder exist
    const feeder = await this.prismaService.feeder.findUnique({
      where: { id },
    });

    if (!feeder) throw new BadRequestException('feeder not found');

    return this.prismaService.feeder.delete({
      where: { id },
    });
  }
}
