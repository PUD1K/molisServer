import { FileArray, UploadedFile } from 'express-fileupload';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

export default async function (files: FileArray): Promise<string> {
  const img = files.img as UploadedFile;
  const fileName = uuidv4() + '.jpg';
  const currentDir = path.dirname(fileURLToPath(import.meta.url));

  img.mv(path.resolve(currentDir, '..', 'static', fileName));
  return fileName;
}
