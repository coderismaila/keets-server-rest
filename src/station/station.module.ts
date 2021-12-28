import { Module } from '@nestjs/common';
import { StationService } from './services/station.service';
import { StationController } from './controllers/station.controller';
import { PrismaService } from 'src/prisma.service';
import { PowerTransformerService } from './services/power-transformer.service';
import { PowerTransformerController } from './controllers/power-transformer.controller.dto';

@Module({
  controllers: [StationController, PowerTransformerController],
  providers: [StationService, PowerTransformerService, PrismaService],
})
export class StationModule {}
