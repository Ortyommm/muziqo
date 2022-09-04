import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get()
  findAll(@Query('fetch_songs') fetchSongs: string) {
    return this.authorService.findAll(fetchSongs);
  }

  @Post()
  create(@Body() dto: CreateAuthorDto) {
    return this.authorService.create(dto);
  }
}
