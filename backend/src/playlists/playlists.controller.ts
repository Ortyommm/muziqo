import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlaylistsService } from './playlists.service';
import { IAuthorizedUserRequest } from '../auth/types';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { AddOrDeleteSongToPlaylistDto } from './dto/add-song-to-playlist.dto';
import { DeletePlaylistDto } from './dto/delete-playlist.dto';

@Controller('playlists')
export class PlaylistsController {
  constructor(private playlistsService: PlaylistsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: IAuthorizedUserRequest, @Body() dto: CreatePlaylistDto) {
    return this.playlistsService.create(req, dto);
  }

  @Post('song')
  @UseGuards(JwtAuthGuard)
  addSongToPlaylist(
    @Req() req: IAuthorizedUserRequest,
    @Body() dto: AddOrDeleteSongToPlaylistDto,
  ) {
    return this.playlistsService.addSongToPlaylist(req, dto);
  }

  @Delete('song')
  @UseGuards(JwtAuthGuard)
  removeSongFromPlaylist(
    @Req() req: IAuthorizedUserRequest,
    @Body() dto: AddOrDeleteSongToPlaylistDto,
  ) {
    return this.playlistsService.removeSongFromPlaylist(req, dto);
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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findById(@Param('id') id) {
    return this.playlistsService.findById(+id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deletePlaylist(@Body() dto: DeletePlaylistDto) {
    return this.playlistsService.deletePlaylist(dto);
  }
}
