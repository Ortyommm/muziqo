import { Controller, Get, Next, Param, Res, UseGuards } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StaticService } from './static.service';

@Controller('static')
export class StaticController {
  constructor(private staticService: StaticService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('songs/:id')
  fetchSong(@Res() res: Response, @Param('id') id: string) {
    return this.staticService.sendFile(res, id);
  }
}
