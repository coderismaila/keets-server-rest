import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateJobDescriptionDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;
}
