import {
  Column,
  Entity,
  Index,
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

  @Index({ fulltext: true })
  @PrimaryColumn({ type: 'varchar', length: 100 })
  name: string;

  @ManyToMany(() => SongEntity)
  @JoinTable()
  songs: SongEntity[];
}
