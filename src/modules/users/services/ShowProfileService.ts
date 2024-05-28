import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { User } from '../typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

export class ShowProfileService {
  public async sexecute({ user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}
