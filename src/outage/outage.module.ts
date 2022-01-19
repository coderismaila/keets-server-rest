import { Module } from '@nestjs/common';
import { OutageService } from './outage.service';
import { OutageController } from './outage.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [OutageController],
  providers: [OutageService, PrismaService],
})
export class OutageModule {}
