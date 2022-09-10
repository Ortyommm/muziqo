import { Module } from '@nestjs/common';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from './entities/playlist.entity';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
  imports: [
    TypeOrmModule.forFeature([PlaylistEntity]),
    AuthModule,
    UsersModule,
  ],
})
export class PlaylistsModule {}
