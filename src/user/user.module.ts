import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { PrismaService } from 'src/prisma.service';
import { UserController } from './controllers/user.controller';
import { JobDescriptionService } from './services/job-description.service';
import { JobDescriptionController } from './controllers/job-description.controller';

@Module({
  controllers: [JobDescriptionController, UserController],
  providers: [JobDescriptionService, UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
