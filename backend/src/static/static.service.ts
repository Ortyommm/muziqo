import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';

const staticPath = [__dirname, '..', '..', 'static'];

@Injectable()
export class StaticService {
  sendFile(res: Response, id: string) {
    // return fs.createReadStream(path.join(...staticPath, 'songs', id)).pipe(res)
    return res.sendFile(path.join(...staticPath, 'songs', id));
  }
}
