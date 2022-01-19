import { PartialType } from '@nestjs/swagger';
import { CreateOutageDto } from './create-outage.dto';

export class UpdateOutageDto extends PartialType(CreateOutageDto) {}
