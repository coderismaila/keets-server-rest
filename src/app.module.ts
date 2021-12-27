import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AreaOfficeModule } from './area-office/area-office.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot(), AreaOfficeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
