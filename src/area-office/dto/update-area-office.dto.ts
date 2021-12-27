import { PartialType } from '@nestjs/swagger';
import { CreateAreaOfficeDto } from './create-area-office.dto';

export class UpdateAreaOfficeDto extends PartialType(CreateAreaOfficeDto) {}
