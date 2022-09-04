import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SongEntity } from '../../songs/entities/song.entity';

@Entity('authors')
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ type: 'varchar', length: 100 })
  name: string;

  @ManyToMany(() => SongEntity)
  @JoinTable()
  songs: SongEntity[];
}
