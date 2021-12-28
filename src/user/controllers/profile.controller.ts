import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfileService } from '../services/profile.service';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  createProfile(@Body() profileDto: CreateProfileDto) {
    return this.profileService.createProfile(profileDto);
  }

  @Get(':id')
  getUserProfileById(@Param('id') id: string) {
    return this.profileService.getProfileById(id);
  }

  @Get('user')
  getUserProfileByUserId(@Request() req: any) {
    return this.profileService.getProfileByUserId(req.user.id);
  }

  @Patch(':id')
  updateProfile(@Param('id') id: string, @Body() profileDto: UpdateProfileDto) {
    return this.profileService.updateProfile(id, profileDto);
  }

  @Delete(':id')
  deleteProfile(@Param('id') id: string) {
    return this.profileService.deleteProfile(id);
  }
}
