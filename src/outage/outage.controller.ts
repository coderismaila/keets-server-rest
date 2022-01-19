import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OutageService } from './outage.service';
import { CreateOutageDto } from './dto/create-outage.dto';
import { UpdateOutageDto } from './dto/update-outage.dto';

@Controller('outage')
export class OutageController {
  constructor(private readonly outageService: OutageService) {}

  @Post('')
  createOutage(@Body() data: CreateOutageDto) {
    console.log(data);
    return this.outageService.createOutage(data);
  }

  @Get()
  findAllOutages() {
    return this.outageService.findAllOutages();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outageService.findOutageById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOutageDto: UpdateOutageDto) {
    console.log(updateOutageDto);
    return this.outageService.updateOutage(id, updateOutageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.outageService.deleteOutage(id);
  }
}
