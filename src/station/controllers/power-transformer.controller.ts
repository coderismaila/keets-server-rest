import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePowerTransformerDto } from '../dto/create-power-transformer.dto';
import { PowerTransformerService } from '../services/power-transformer.service';

@Controller()
export class PowerTransformerController {
  constructor(
    private readonly powerTransformerService: PowerTransformerService,
  ) {}

  @Post('station/:stationid/power-transformer')
  createPowerTransformer(
    @Param('stationid') stationid: string,
    @Body() createPowerTransformerDto: CreatePowerTransformerDto,
  ) {
    createPowerTransformerDto.stationId = stationid;
    return this.powerTransformerService.createPowerTransformer(
      createPowerTransformerDto,
    );
  }

  @Get('station/:stationid/power-transformer')
  findAllStationPowerTransformer(@Param('stationid') stationid: string) {
    return this.powerTransformerService.findAllStationPowerTransformer(
      stationid,
    );
  }

  @Get('power-transformer')
  findAllPowerTransformer() {
    return this.powerTransformerService.findAllPowerTransformer();
  }

  @Get('power-transformer/:id')
  findPowerTransformerById(@Param('id') id: string) {
    return this.powerTransformerService.findPowerTransformerById(id);
  }

  @Patch('power-transformer/:id')
  updatePowerTransformer(
    @Param('id') id: string,
    @Body() updatePowerTransformerDto: CreatePowerTransformerDto,
  ) {
    return this.powerTransformerService.updatePowerTransformer(
      id,
      updatePowerTransformerDto,
    );
  }

  @Delete('power-transformer/:id')
  deletePowerTransformer(@Param('id') id: string) {
    return this.powerTransformerService.deletePowerTransformer(id);
  }
}
