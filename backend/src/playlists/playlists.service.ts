import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistEntity } from './entities/playlist.entity';
import { Repository } from 'typeorm';
import { IAuthorizedUserRequest } from '../auth/types';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UsersService } from '../users/users.service';
import { AddOrDeleteSongToPlaylistDto } from './dto/add-song-to-playlist.dto';
import { SongsService } from '../songs/songs.service';
import { DeletePlaylistDto } from './dto/delete-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlists: Repository<PlaylistEntity>,
    private readonly userService: UsersService,
    private readonly songsService: SongsService,
  ) {}

  async create(req: IAuthorizedUserRequest, dto: CreatePlaylistDto) {
    const playlist = Object.assign(new PlaylistEntity(), dto);
    const user = await this.userService.findUserById(req.user.id, null);
    playlist.user = user;
    return this.playlists.save(playlist);

    // const user = await this.users
    // playlist.user =
  }

  findAll() {
    return this.playlists.find({ relations: ['user', 'songs'] });
  }

  async findUserPlaylists(req: IAuthorizedUserRequest) {
    // const user = await this.userService.findUserById(req.user.id);

    return this.playlists.find({
      where: {
        user: {
          id: req.user.id,
        },
      },
      relations: ['user', 'songs'],
    });
  }

  //Реализовать добавление, удаление и поиск плейлистов
  findById(id: number) {
    return this.playlists.findOne({
      where: { id },
      relations: ['user', 'songs', 'songs.authors'],
    });
  }

  private async getPlaylist(
    req: IAuthorizedUserRequest,
    dto: AddOrDeleteSongToPlaylistDto,
  ) {
    const playlist = await this.findById(dto.playlistId);
    if (playlist.user.id !== req.user.id)
      throw new HttpException('forbidden', 403);
    return playlist;
  }

  async addSongToPlaylist(
    req: IAuthorizedUserRequest,
    dto: AddOrDeleteSongToPlaylistDto,
  ) {
    const playlist = await this.getPlaylist(req, dto);

    const song = await this.songsService.findById(true, dto.songId);
    playlist.songs.push(song);
    return this.playlists.save(playlist);
  }

  async removeSongFromPlaylist(
    req: IAuthorizedUserRequest,
    dto: AddOrDeleteSongToPlaylistDto,
  ) {
    const playlist = await this.getPlaylist(req, dto);

    playlist.songs = playlist.songs.filter((song) => song.id !== dto.songId);
    return this.playlists.save(playlist);
  }

  async deletePlaylist(dto: DeletePlaylistDto) {
    const playlist = await this.playlists.findOne({
      where: { id: dto.playlistId },
    });

    if (!playlist) {
      throw new HttpException('playlist_not_found', HttpStatus.NOT_FOUND);
    }

    await this.playlists.remove(playlist);
    return { message: 'success' };
  }
}
