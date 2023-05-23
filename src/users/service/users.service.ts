import { inject, injectable } from 'inversify';
import { IUsersService } from './users.service.interface';
import { User } from '@prisma/client';
import { UserRegisterDto } from '../dto/user-register.dto';
import { UserEntity } from '../user.entity';
import { TYPES } from '../../types';
import { IUsersRepository } from '../repository/users.repository.interface';

@injectable()
export class UsersService implements IUsersService {
  constructor(@inject(TYPES.UsersRepository) private readonly usersRepository: IUsersRepository) {}

  async create({ name, email }: UserRegisterDto): Promise<User | null> {
    const newUser = new UserEntity(name, email);

    return await this.usersRepository.create(newUser);
  }

  async find(id: number): Promise<User | null> {
    return await this.usersRepository.find(id);
  }

  async update(id: number, { name, email }: UserRegisterDto): Promise<User | null> {
    return await this.usersRepository.update(id, { name, email });
  }

  async delete(id: number): Promise<User | null> {
    return await this.usersRepository.delete(id);
  }
}
