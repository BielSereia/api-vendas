import { Request, Response } from 'express';
import { CreateSessionsService } from '../services/CreateSessionsService';

export class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionsService = new CreateSessionsService();

    const { user, token } = await createSessionsService.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}
