import { Controller, Get, Query } from '@nestjs/common';
import type { SearchSuggestionsResponse } from '@eyesoul/shared';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly search: SearchService) {}

  @Get('suggestions')
  suggestions(@Query('q') q: unknown): Promise<SearchSuggestionsResponse> {
    // A repeated `?q=` arrives as an array: treat anything but a single string as no query.
    return this.search.suggest(typeof q === 'string' ? q : '');
  }
}
