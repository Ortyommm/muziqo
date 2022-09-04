import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as crypto from 'crypto';

const generateFileName = (file: Express.Multer.File) => {
  const newFileName = crypto.randomUUID();
  const extension =
    file.originalname.split('.')[file.originalname.split('.').length - 1];
  return `${newFileName}.${extension}`;
};

export function writeMulterFile(dest: string, file: Express.Multer.File) {
  const filePath = path.join(dest, generateFileName(file));

  return util
    .promisify(fs.writeFile)(filePath, file.buffer)
    .then(() => filePath);
}
