import { Request, Response } from 'express';
import { CreateSessionsService } from '../services/CreateSessionsService';
import { classToClass } from 'class-transformer';

export class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionsService = new CreateSessionsService();

    const { user, token } = await createSessionsService.execute({
      email,
      password,
    });

    const parsedUser = classToClass(user);

    return response.json({ parsedUser, token });
  }
}
