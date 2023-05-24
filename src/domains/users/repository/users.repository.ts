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
      return await this.prismaService.client.user.findFirst({
        where: { id },
        include: {
          posts: true,
          followedBy: true,
          following: true,
        },
      });
    } catch (error) {
      return null;
    }
  }

  async update(id: number, { name, email, followedByIDs }: UserRegisterDto): Promise<User | null> {
    try {
      return await this.prismaService.client.user.update({
        where: { id },
        data: {
          name,
          email,
          followedBy: {
            connect: followedByIDs?.map((id) => ({ id })),
          },
        },
        include: {
          posts: true,
          followedBy: true,
          following: true,
        },
      });
    } catch (err) {
      return null;
    }
  }

  async delete(id: number): Promise<User | null> {
    try {
      await this.prismaService.client.user.update({
        where: { id },
        data: { posts: { deleteMany: {} } },
      });

      return await this.prismaService.client.user.delete({ where: { id } });
    } catch (err) {
      return null;
    }
  }
}
