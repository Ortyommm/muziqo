import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get()
  findAll(
    @Query('fetch_songs') fetchSongs: string,
    @Query('name') name?: string,
    @Query('page') page?: string,
  ) {
    return this.authorService.findAll(fetchSongs, +page, name);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.authorService.findById(true, +id);
  }

  @Post()
  create(@Body() dto: CreateAuthorDto) {
    return this.authorService.create(dto);
  }
}
