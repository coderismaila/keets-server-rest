import { BadRequestException, Injectable } from '@nestjs/common';
import { JobDescription } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateJobDescriptionDto } from '../dto/create-job-description.dto';

@Injectable()
export class JobDescriptionService {
  constructor(private readonly prismaService: PrismaService) {}

  async createJobDescription(
    createJobDescriptionDto: CreateJobDescriptionDto,
  ): Promise<JobDescription> {
    // check if job description name exists
    const nameExists = await this.prismaService.jobDescription.findUnique({
      where: { name: createJobDescriptionDto.name },
    });
    if (nameExists)
      throw new BadRequestException(
        `job description with name ${createJobDescriptionDto.name} already exists`,
      );

    return this.prismaService.jobDescription.create({
      data: createJobDescriptionDto,
    });
  }

  async findJobDescriptions(): Promise<JobDescription[]> {
    return this.prismaService.jobDescription.findMany({
      orderBy: [{ name: 'asc' }],
    });
  }
}
