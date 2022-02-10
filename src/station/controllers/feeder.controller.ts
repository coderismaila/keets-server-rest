import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateFeederDto } from '../dto/create-feeder.dto';
import { FeederService } from '../services/feeder.service';

@Controller()
export class FeederController {
  constructor(private readonly feederService: FeederService) {}

  @Auth(Role.SUPER, Role.ADMIN)
  @Post('feeder')
  createFeeder(@Body() createFeederDto: CreateFeederDto) {
    return this.feederService.createFeeder(createFeederDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('power-transformer/:powertxid/feeder')
  findAllFeederOnPowerTransformer(@Param('powertxid') powertxid: string) {
    return this.feederService.findAllFeederOnPowerTransformer(powertxid);
  }

  @UseGuards(JwtAuthGuard)
  @Get('feeder')
  findAllFeeder() {
    return this.feederService.findAllFeeder();
  }

  @UseGuards(JwtAuthGuard)
  @Get('feeder/:id')
  findFeederById(@Param('id') id: string) {
    return this.feederService.findFeederById(id);
  }

  @Auth(Role.SUPER, Role.ADMIN)
  @Patch('feeder/:id')
  updateFeeder(
    @Param('id') id: string,
    @Body() updateFeederDto: CreateFeederDto,
  ) {
    return this.feederService.updateFeeder(id, updateFeederDto);
  }

  @Auth(Role.SUPER, Role.ADMIN)
  @Delete('feeder/:id')
  deleteFeeder(@Param('id') id: string) {
    return this.feederService.deleteFeeder(id);
  }
}
