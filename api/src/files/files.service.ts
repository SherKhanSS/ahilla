import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { log } from 'util';

@Injectable()
export class FilesService {
  async createFile(file): Promise<{
    path: string;
    name: string;
    category: string;
  }> {
    try {
      const { originalname } = file;
      const nameArr = originalname.split('.');
      const type = nameArr[nameArr.length - 1];
      let fileName;
      let category;

      if (
        type === 'jpg' ||
        type === 'jpeg' ||
        type === 'png' ||
        type === 'webp'
      ) {
        fileName = uuid.v4() + `.${type}`;
        category = 'image';
      } else {
        fileName = originalname;
        category = 'other';
      }

      const filePath = path.resolve(
        __dirname,
        '..',
        'static/wp-content/uploads',
      );

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      await fs.writeFile(path.join(filePath, fileName), file.buffer, (err) => {
        if (err) {
          throw new HttpException(
            'Произошла ошибка при записи файла',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      });

      return {
        path: `${process.env.PART_FILE_PATH}${fileName}`,
        name: originalname,
        category,
      };
    } catch (err) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFile(fullPath: string) {
    const currentPath = fullPath.split('/').slice(3).join('/');
    const filePath = path.resolve(__dirname, '..', 'static');
    const pathForDelete = filePath + '/' + currentPath;

    try {
      console.log(pathForDelete);
      await fs.unlink(pathForDelete, (e) => {
        console.log(e);
      });
    } catch (e) {
      console.log(e);
    }
  }
}
