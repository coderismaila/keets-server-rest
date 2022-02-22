import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OutageService } from './outage.service';
import { CreateOutageDto } from './dto/create-outage.dto';
import { UpdateOutageDto } from './dto/update-outage.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('outage')
export class OutageController {
  constructor(private readonly outageService: OutageService) {}

  @Post('')
  createOutage(@Body() data: CreateOutageDto) {
    return this.outageService.createOutage(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllOutages(
    @Request() req: any,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.outageService.findAllOutages(req.user, startDate, endDate);
  }

  @Get('station')
  findAllStationOutages(@Request() req: any) {
    return this.outageService.findAllStationOutages(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outageService.findOutageById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOutageDto: UpdateOutageDto) {
    return this.outageService.updateOutage(id, updateOutageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.outageService.deleteOutage(id);
  }
}
