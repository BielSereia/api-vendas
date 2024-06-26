import { Request, Response } from 'express';
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService';
import { AppError } from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';

export class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarService = new UpdateUserAvatarService();

    if (!request.file) {
      throw new AppError('Arquivo nao encontrado');
    }

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    const parsedUser = classToClass(user);

    return response.json({ parsedUser });
  }
}
