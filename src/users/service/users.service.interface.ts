import { User } from '@prisma/client';
import { UserRegisterDto } from '../dto/user-register.dto';

export interface IUsersService {
  create: (dto: UserRegisterDto) => Promise<User | null>;
  find: (id: number) => Promise<User | null>;
  update: (id: number, dto: UserRegisterDto) => Promise<User | null>;
  delete: (id: number) => Promise<User | null>;
}
