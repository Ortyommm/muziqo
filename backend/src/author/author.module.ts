import { forwardRef, Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/song.entity';
import { SongEntity } from '../songs/entities/song.entity';
import { SongsModule } from '../songs/songs.module';

@Module({
  controllers: [AuthorController],
  providers: [AuthorService],
  imports: [
    TypeOrmModule.forFeature([AuthorEntity, SongEntity]),
    forwardRef(() => SongsModule),
  ],
  exports: [AuthorService],
})
export class AuthorModule {}
