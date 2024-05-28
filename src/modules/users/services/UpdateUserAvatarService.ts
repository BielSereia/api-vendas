import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';
import { join } from 'path';
import { multerConfig } from '@config/upload';
import { stat, unlink } from 'fs/promises';
import { User } from '../typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

export class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.avatar) {
      const userAvatarFilePath = join(multerConfig.directory, user.avatar);

      const userAvatarFileExists = await stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}
