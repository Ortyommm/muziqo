import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistEntity } from './entities/playlist.entity';
import { Repository } from 'typeorm';
import { IAuthorizedUserRequest } from '../auth/types';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlists: Repository<PlaylistEntity>,
    private readonly userService: UsersService,
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
}
