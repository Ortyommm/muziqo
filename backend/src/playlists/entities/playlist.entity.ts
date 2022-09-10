import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SongEntity } from '../../songs/entities/song.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('playlists')
export class PlaylistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  description: string;

  @ManyToMany(() => SongEntity)
  @JoinTable()
  songs: SongEntity[];

  //img file location
  @Column('varchar', { nullable: true })
  img: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.playlists)
  @JoinTable()
  user: UserEntity;
}
