import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { DeleteSongDto } from './dto/delete-song.dto';
import { Roles } from '../auth/roles-auth.decorator';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'img', maxCount: 1 },
    ]),
  )
  uploadFile(
    @UploadedFiles()
    files: { file: [Express.Multer.File]; img?: [Express.Multer.File] },
    @Body() dto: CreateSongDto,
  ) {
    return this.songsService.addSong(dto, files.file?.[0], files.img?.[0]);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query('name') name?: string, @Query('page') page?: string) {
    return this.songsService.findAll(name, +page);
  }

  @Delete()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  deleteSong(@Body() dto: DeleteSongDto) {
    return this.songsService.deleteSong(dto);
  }
}
