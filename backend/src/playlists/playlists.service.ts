import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistEntity } from './entities/playlist.entity';
import { Repository } from 'typeorm';
import { IUserPayload } from '../auth/types';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlists: Repository<PlaylistEntity>,
  ) {}

  create(req: Request & IUserPayload, dto: CreatePlaylistDto) {}

  findAll(req: Request & IUserPayload) {}

  //Реализовать добавление, удаление и поиск плейлистов
}
