import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StationService } from '../services/station.service';
import { CreateStationDto } from '../dto/create-station.dto';
import { UpdateStationDto } from '../dto/update-station.dto';
import { Role } from '@prisma/client';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('station')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Auth(Role.SUPER, Role.ADMIN)
  @Post()
  createStation(@Body() createStationDto: CreateStationDto) {
    return this.stationService.createStation(createStationDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAllStation() {
    return this.stationService.findAllStation();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findStationById(@Param('id') id: string) {
    return this.stationService.findStationById(id);
  }

  @Auth(Role.SUPER, Role.ADMIN)
  @Patch(':id')
  updateStation(
    @Param('id') id: string,
    @Body() updateStationDto: UpdateStationDto,
  ) {
    return this.stationService.updateStation(id, updateStationDto);
  }

  @Auth(Role.SUPER, Role.ADMIN)
  @Delete(':id')
  deleteStation(@Param('id') id: string) {
    return this.stationService.deleteStation(id);
  }
}
