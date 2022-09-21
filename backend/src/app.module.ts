import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/user.entity';
import { RolesModule } from './roles/roles.module';
import { RoleEntity } from './roles/entities/user.entity';
import { SongsModule } from './songs/songs.module';
import { StaticModule } from './static/static.module';
import { SongEntity } from './songs/entities/song.entity';
import { AuthorModule } from './author/author.module';
import { AuthorEntity } from './author/entities/song.entity';
import { PlaylistsModule } from './playlists/playlists.module';
import { PlaylistEntity } from './playlists/entities/playlist.entity';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      // envFilePath: path.resolve(__dirname, '..', '..', '.env'),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: +config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        logging: process.env.NODE_ENV == 'development',
        entities: [
          UserEntity,
          RoleEntity,
          SongEntity,
          AuthorEntity,
          PlaylistEntity,
        ],
        synchronize: true,
      }),
    }),
    UsersModule,
    RolesModule,
    SongsModule,
    // ServeStaticModule.forRoot({
    //   rootPath: path.join(__dirname, '..', 'static'),
    //   serveRoot: '/static',
    //   serveStaticOptions: { index: false },
    // }),
    StaticModule,
    AuthorModule,
    PlaylistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
