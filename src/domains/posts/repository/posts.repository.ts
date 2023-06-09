import { Post } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { CreatePostDto } from '../dto/create-post.dto';
import { IPostsRepository } from './posts.repository.interface';
import { TYPES } from '../../../types';
import { PrismaService } from '../../../database/prisma.service';
import { PostEntity } from '../post.entity';

@injectable()
export class PostsRepository implements IPostsRepository {
  constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}

  async create({ title, authorIds }: PostEntity): Promise<Post | null> {
    try {
      return await this.prismaService.client.post.create({
        data: {
          title,
          authors: {
            connect: authorIds.map((id) => ({ id })),
          },
        },
      });
    } catch (err) {
      return null;
    }
  }

  async find(id: number): Promise<Post | null> {
    try {
      return await this.prismaService.client.post.findFirst({
        where: { id },
        include: { authors: true },
      });
    } catch (error) {
      return null;
    }
  }

  async update(id: number, dto: CreatePostDto): Promise<Post | null> {
    return null;
  }

  async delete(id: number): Promise<Post | null> {
    try {
      return await this.prismaService.client.post.delete({ where: { id } });
    } catch (error) {
      return null;
    }
  }
}
