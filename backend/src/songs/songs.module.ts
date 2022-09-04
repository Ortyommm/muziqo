import { forwardRef, HttpException, Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import * as crypto from 'crypto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from './entities/song.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthorModule } from '../author/author.module';
import { getMulterSettings, songsDest } from './utils/multer-settings';

fs.mkdirSync(songsDest, { recursive: true });

@Module({
  providers: [SongsService],
  controllers: [SongsController],
  imports: [
    TypeOrmModule.forFeature([SongEntity]),
    MulterModule.register(getMulterSettings()),
    AuthModule,
    forwardRef(() => AuthorModule),
  ],
  exports: [SongsService],
})
export class SongsModule {}
