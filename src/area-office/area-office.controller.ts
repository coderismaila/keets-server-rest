import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AreaOfficeService } from './area-office.service';
import { CreateAreaOfficeDto } from './dto/create-area-office.dto';
import { UpdateAreaOfficeDto } from './dto/update-area-office.dto';

@Controller('area-office')
export class AreaOfficeController {
  constructor(private readonly areaOfficeService: AreaOfficeService) {}

  @Post()
  create(@Body() createAreaOfficeDto: CreateAreaOfficeDto) {
    return this.areaOfficeService.createAreaOffice(createAreaOfficeDto);
  }

  @Get()
  findAll() {
    return this.areaOfficeService.findAllAreaOffice();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areaOfficeService.findAreaOfficeById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAreaOfficeDto: UpdateAreaOfficeDto,
  ) {
    return this.areaOfficeService.updateAreaOffice(id, updateAreaOfficeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areaOfficeService.deleteAreaOffice(id);
  }
}
