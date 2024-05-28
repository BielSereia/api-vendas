import { diskStorage } from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

const uploadFolder = resolve(__dirname, '..', '..', 'uploads');

export const multerConfig = {
  directory: uploadFolder,
  storage: diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = randomBytes(10).toString('hex');

      const fileName = `${fileHash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
};
