import { PartialType } from '@nestjs/swagger';
import { CreateFeederDto } from './create-feeder.dto';

export class UpdateFeederDto extends PartialType(CreateFeederDto) {}
