import { inject, injectable } from 'inversify';
import { UserEntity } from '../user.entity';
import { User } from '@prisma/client';
import { UserRegisterDto } from '../dto/user-register.dto';
import { PrismaService } from '../../../database/prisma.service';
import { TYPES } from '../../../types';

@injectable()
export class UsersRepository {
  constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

  async create({ name, email }: UserEntity): Promise<User | null> {
    try {
      return await this.prismaService.client.user.create({
        data: { name, email },
      });
    } catch (err) {
      return null;
    }
  }

  async find(id: number): Promise<User | null> {
    try {
      const findedUser = await this.prismaService.client.user.findFirst({
        where: { id },
        include: { posts: { select: { post: true } } },
      });

      const userWithCorrectPosts = {
        ...findedUser,
        posts: findedUser?.posts.map(({ post }) => post),
      };

      return userWithCorrectPosts as User;
    } catch (error) {
      return null;
    }
  }

  async update(id: number, { name, email }: UserRegisterDto): Promise<User | null> {
    try {
      return await this.prismaService.client.user.update({
        where: { id },
        data: { name, email },
      });
    } catch (err) {
      return null;
    }
  }

  async delete(id: number): Promise<User | null> {
    try {
      return await this.prismaService.client.user.delete({ where: { id } });
    } catch (err) {
      return null;
    }
  }
}
