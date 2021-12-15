import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { PrismaService } from 'src/prisma.service';
import { UserController } from './controllers/user.controller';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';

@Module({
  controllers: [UserController, ProfileController],
  providers: [UserService, ProfileService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
