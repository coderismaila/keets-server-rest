import { PartialType } from '@nestjs/swagger';
import { CreateJobDescriptionDto } from './create-job-description.dto';

export class UpdateJobDescriptionDto extends PartialType(
  CreateJobDescriptionDto,
) {}
