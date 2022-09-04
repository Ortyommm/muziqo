import { Module } from '@nestjs/common';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from './entities/playlist.entity';

@Module({
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
  imports: [TypeOrmModule.forFeature([PlaylistEntity]), AuthModule],
})
export class PlaylistsModule {}
