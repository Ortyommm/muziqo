import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthorEntity } from '../../author/entities/song.entity';

@Entity('songs')
export class SongEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ type: 'varchar', length: 100 })
  name: string;

  //song file location
  @Column('varchar')
  file: string;

  @ManyToMany(() => AuthorEntity)
  @JoinTable()
  authors: AuthorEntity[];

  @Column('varchar')
  duration: number;

  //img file location
  @Column('varchar', { nullable: true })
  img: string;
}
