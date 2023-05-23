import { User } from '@prisma/client';
import { UserEntity } from '../user.entity';
import { UserRegisterDto } from '../dto/user-register.dto';

export interface IUsersRepository {
  create: (user: UserEntity) => Promise<User | null>;
  find: (id: number) => Promise<User | null>;
  update: (id: number, user: UserRegisterDto) => Promise<User | null>;
  delete: (id: number) => Promise<User | null>;
}
