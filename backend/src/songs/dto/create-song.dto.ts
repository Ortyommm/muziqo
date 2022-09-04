import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateSongDto {
  @IsString()
  name: string;

  @IsNumberString()
  authorId: number;
}
