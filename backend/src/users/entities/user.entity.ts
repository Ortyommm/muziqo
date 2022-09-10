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

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles: RoleEntity[];

  //TODO сделать (проверить связи)
  @OneToMany(() => PlaylistEntity, (playlistEntity) => playlistEntity.user)
  @JoinTable()
  playlists: PlaylistEntity[];

  @CreateDateColumn()
  created: Date;
}
