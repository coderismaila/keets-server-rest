import { Module } from '@nestjs/common';
import { StationService } from './services/station.service';
import { StationController } from './controllers/station.controller';
import { PrismaService } from 'src/prisma.service';
import { PowerTransformerService } from './services/power-transformer.service';
import { PowerTransformerController } from './controllers/power-transformer.controller';
import { FeederController } from './controllers/feeder.controller';
import { FeederService } from './services/feeder.service';

@Module({
  controllers: [
    StationController,
    PowerTransformerController,
    FeederController,
  ],
  providers: [
    StationService,
    PowerTransformerService,
    FeederService,
    PrismaService,
  ],
})
export class StationModule {}
