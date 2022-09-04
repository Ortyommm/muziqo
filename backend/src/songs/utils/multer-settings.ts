import { HttpException } from '@nestjs/common';
import * as crypto from 'crypto';
import { diskStorage, memoryStorage } from 'multer';
import { MulterModuleOptions } from '@nestjs/platform-express/multer/interfaces/files-upload-module.interface';
import { Request } from 'express';

export const getMulterSettings: () => MulterModuleOptions = () => ({
  storage: memoryStorage() /*{
    destination(req, file, callback) {
      console.log(req.body.name);
      callback(null, dest);
    },

    filename(
      req: Express.Request,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void,
    ) {
      let error = null;

      const checkMimeType = (mimeType: string) => {
        if (file.mimetype.split('/')[0] !== mimeType)
          error = new HttpException(`not_${mimeType}`, 400);
      };

      const generateFileName = () => {
        const newFileName = crypto.randomUUID();
        const extension =
          file.originalname.split('.')[file.originalname.split('.').length - 1];
        return `${newFileName}.${extension}`;
      };

      if (['file', 'img'].includes(file.fieldname)) {
        if (file.fieldname === 'file') {
          checkMimeType('audio');
          if (error) return callback(error, null);
        } else if (file.fieldname === 'img') {
          checkMimeType('image');
        }
        callback(error, generateFileName());
      } else {
        throw new HttpException('unexpected_field', 400);
      }
    },
  }*/,
});

export const songsDest = './static/songs';
