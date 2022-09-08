import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User now found.');
    }

    user.name = name;
    user.password = password;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
