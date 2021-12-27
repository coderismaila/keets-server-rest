import { Module } from '@nestjs/common';
import { AreaOfficeService } from './area-office.service';
import { AreaOfficeController } from './area-office.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AreaOfficeController],
  providers: [AreaOfficeService, PrismaService],
})
export class AreaOfficeModule {}
