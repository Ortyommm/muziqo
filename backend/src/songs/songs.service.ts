import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { SongEntity } from './entities/song.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteSongDto } from './dto/delete-song.dto';
import { AuthorService } from '../author/author.service';
import * as fs from 'fs';
import { writeMulterFile } from './utils/writeFile';
import { songsDest } from './utils/multer-settings';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(SongEntity)
    private readonly songs: Repository<SongEntity>,
    @Inject(forwardRef(() => AuthorService))
    private readonly authorService: AuthorService,
  ) {}

  async addSong(
    dto: CreateSongDto,
    file?: Express.Multer.File,
    img?: Express.Multer.File,
  ) {
    if (!file) throw new HttpException('miss_music_file', 400);

    const toCommonPathFormat = (oldPath: string) =>
      oldPath ? '/' + oldPath.replace(/\\/g, '/') : null;

    const song = Object.assign(new SongEntity(), { name: dto.name });
    const [songFilePath, imgFilePath] = await Promise.all([
      writeMulterFile(songsDest, file),
      img ? writeMulterFile(songsDest, img) : null,
    ]);
    song.file = toCommonPathFormat(songFilePath);
    song.img = toCommonPathFormat(imgFilePath);
    song.authors = [];

    if (dto.authorId) {
      const author = await this.authorService.findById(false, dto.authorId);
      if (author) {
        song.authors.push(author);
        await this.songs.save(song);
        await this.authorService.addSongToAuthor({
          authorId: author.id,
          songId: song.id,
        });
        return song;
      } else {
        return this.songs.save(song);
      }
    }
  }

  findAll() {
    return this.songs.find({ relations: ['authors'] });
  }

  async deleteSong(dto: DeleteSongDto) {
    const song = await this.songs.findOneBy({ id: dto.songId });

    if (!song) {
      throw new HttpException('song_not_found', HttpStatus.NOT_FOUND);
    }

    await this.songs.remove(song);
    return { message: 'success' };
  }

  findById(fetchAuthors: string | boolean, id: number) {
    return this.songs.findOne({
      where: { id },
      relations:
        fetchAuthors === true || fetchAuthors === 'true'
          ? ['authors']
          : undefined,
    });
  }
}
