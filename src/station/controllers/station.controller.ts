import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StationService } from '../services/station.service';
import { CreateStationDto } from '../dto/create-station.dto';
import { UpdateStationDto } from '../dto/update-station.dto';

@Controller('station')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Post()
  createStation(@Body() createStationDto: CreateStationDto) {
    return this.stationService.createStation(createStationDto);
  }

  @Get()
  findAllStation() {
    return this.stationService.findAllStation();
  }

  @Get(':id')
  findStationById(@Param('id') id: string) {
    return this.stationService.findStationById(id);
  }

  @Patch(':id')
  updateStation(
    @Param('id') id: string,
    @Body() updateStationDto: UpdateStationDto,
  ) {
    console.log(updateStationDto.powerTransformer);
    return this.stationService.updateStation(id, updateStationDto);
  }

  @Delete(':id')
  deleteStation(@Param('id') id: string) {
    return this.stationService.deleteStation(id);
  }
}
