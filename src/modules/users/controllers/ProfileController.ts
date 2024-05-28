import { Request, Response } from 'express';
import { ShowProfileService } from '../services/ShowProfileService';
import { UpdateProfileService } from '../services/UpdateProfileService';
import { classToClass } from 'class-transformer';

export class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfileService = new ShowProfileService();

    const { id: user_id } = request.user;

    const user = await showProfileService.sexecute({ user_id });

    const parsedUser = classToClass(user);

    return response.json({ parsedUser });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { name, email, password, old_password } = request.body;

    const updateProfileService = new UpdateProfileService();

    const user = await updateProfileService.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    const parsedUser = classToClass(user);

    return response.json({ parsedUser });
  }
}
