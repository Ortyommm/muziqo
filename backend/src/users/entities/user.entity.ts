import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from '../../roles/entities/user.entity';
import { PlaylistEntity } from '../../playlists/entities/playlist.entity';
import { SongEntity } from '../../songs/entities/song.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    select: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    select: false,
    nullable: true
  })
  resetPassword: string;

  @Column({
    type: 'varchar',
    select: false,
    nullable: true
  })
  resetPasswordTimestamp: number;

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles: RoleEntity[];

  @OneToMany(() => PlaylistEntity, (playlistEntity) => playlistEntity.user)
  @JoinTable()
  playlists: PlaylistEntity[];

  @ManyToMany(() => SongEntity)
  @JoinTable()
  favorites: SongEntity[];

  @CreateDateColumn()
  created: Date;
}
