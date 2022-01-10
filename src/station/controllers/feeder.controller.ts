import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFeederDto } from '../dto/create-feeder.dto';
import { FeederService } from '../services/feeder.service';

@Controller()
export class FeederController {
  constructor(private readonly feederService: FeederService) {}

  @Post('feeder')
  createFeeder(@Body() createFeederDto: CreateFeederDto) {
    return this.feederService.createFeeder(createFeederDto);
  }

  @Get('power-transformer/:powertxid/feeder')
  findAllFeederOnPowerTransformer(@Param('powertxid') powertxid: string) {
    return this.feederService.findAllFeederOnPowerTransformer(powertxid);
  }

  @Get('feeder')
  findAllFeeder() {
    return this.feederService.findAllFeeder();
  }

  @Get('feeder/:id')
  findFeederById(@Param('id') id: string) {
    return this.feederService.findFeederById(id);
  }

  @Patch('feeder/:id')
  updateFeeder(
    @Param('id') id: string,
    @Body() updateFeederDto: CreateFeederDto,
  ) {
    return this.feederService.updateFeeder(id, updateFeederDto);
  }

  @Delete('feeder/:id')
  deleteFeeder(@Param('id') id: string) {
    return this.feederService.deleteFeeder(id);
  }
}
