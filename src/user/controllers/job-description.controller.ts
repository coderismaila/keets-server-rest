import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateJobDescriptionDto } from '../dto/create-job-description.dto';
import { JobDescriptionService } from '../services/job-description.service';

@Controller('job-description')
export class JobDescriptionController {
  constructor(private readonly jobDescriptionService: JobDescriptionService) {}

  @Post('')
  createJobDescription(
    @Body() createJobDescriptionDto: CreateJobDescriptionDto,
  ) {
    return this.jobDescriptionService.createJobDescription(
      createJobDescriptionDto,
    );
  }

  @Get('')
  findJobDescriptions() {
    return this.jobDescriptionService.findJobDescriptions();
  }
}
