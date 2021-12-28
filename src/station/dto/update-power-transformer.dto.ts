import { PartialType } from '@nestjs/swagger';
import { CreatePowerTransformerDto } from './create-power-transformer.dto';

export class UpdatePowerTransformerDto extends PartialType(
  CreatePowerTransformerDto,
) {}
