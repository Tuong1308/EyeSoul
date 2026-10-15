import { Controller, Get } from '@nestjs/common';
import type { HomepageResponse } from '@eyesoul/shared';
import { HomepageService } from './homepage.service';

@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepage: HomepageService) {}

  @Get()
  get(): Promise<HomepageResponse> {
    return this.homepage.getHomepage();
  }
}
