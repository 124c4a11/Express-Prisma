import { inject, injectable } from 'inversify';
import { IUsersService } from './users.service.interface';
import { User } from '@prisma/client';
import { UserRegisterDto } from '../dto/user-register.dto';
import { UserEntity } from '../user.entity';
import { IUsersRepository } from '../repository/users.repository.interface';
import { TYPES } from '../../../types';

@injectable()
export class UsersService implements IUsersService {
  constructor(@inject(TYPES.UsersRepository) private readonly usersRepository: IUsersRepository) {}

  async create({ name, email, successorId }: UserRegisterDto): Promise<User | null> {
    const newUser = new UserEntity(name, email, successorId);

    return await this.usersRepository.create(newUser);
  }

  async find(id: number): Promise<User | null> {
    return await this.usersRepository.find(id);
  }

  async update(id: number, { name, email, successorId }: UserRegisterDto): Promise<User | null> {
    return await this.usersRepository.update(id, { name, email, successorId });
  }

  async delete(id: number): Promise<User | null> {
    return await this.usersRepository.delete(id);
  }
}
