import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlaylistsService } from './playlists.service';
import { IAuthorizedUserRequest } from '../auth/types';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Controller('playlists')
export class PlaylistsController {
  constructor(private playlistsService: PlaylistsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: IAuthorizedUserRequest, @Body() dto: CreatePlaylistDto) {
    return this.playlistsService.create(req, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.playlistsService.findAll();
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  find(@Req() req: IAuthorizedUserRequest) {
    return this.playlistsService.findUserPlaylists(req);
  }
}
