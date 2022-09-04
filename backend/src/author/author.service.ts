import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthorEntity } from './entities/song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AddSongDto } from './dto/add-song.dto';
import { SongsService } from '../songs/songs.service';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authors: Repository<AuthorEntity>,
    @Inject(forwardRef(() => SongsService))
    private readonly songsService: SongsService,
  ) {}

  findAll(fetchSongs: string | boolean) {
    return this.authors.find({
      relations:
        fetchSongs === true || fetchSongs === 'true' ? ['songs'] : undefined,
    });
  }

  findById(fetchSongs: string | boolean, id: number) {
    return this.authors.findOne({
      where: { id },
      relations:
        fetchSongs === true || fetchSongs === 'true' ? ['songs'] : undefined,
    });
  }

  create(dto: CreateAuthorDto) {
    const author = Object.assign(new AuthorEntity(), dto);
    author.songs = [];
    return this.authors.save(author);
  }

  async addSongToAuthor(dto: AddSongDto) {
    const [author, song] = await Promise.all([
      this.findById(true, dto.authorId),
      this.songsService.findById(true, dto.songId),
    ]);
    author.songs.push(song);
    return this.authors.save(author);
  }
}
