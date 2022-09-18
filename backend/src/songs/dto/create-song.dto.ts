import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateSongDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumberString()
  authorId: number;
}
