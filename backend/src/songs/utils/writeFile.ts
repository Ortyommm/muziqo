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

export function generateFilePath(dest, file) {
  return path.join(dest, generateFileName(file));
}

export function writeMulterFile(filePath: string, file: Express.Multer.File) {
  return util
    .promisify(fs.writeFile)(filePath, file.buffer)
    .then(() => filePath);
}
