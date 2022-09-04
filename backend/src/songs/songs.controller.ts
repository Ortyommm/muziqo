import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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
  findAll() {
    return this.songsService.findAll();
  }

  @Delete()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  deleteSong(@Body() dto: DeleteSongDto) {
    return this.songsService.deleteSong(dto);
  }
}
