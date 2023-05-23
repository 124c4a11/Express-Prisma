import { inject, injectable } from 'inversify';
import { IPostsService } from './posts.service.interface';
import { Post } from '@prisma/client';
import { CreatePostDto } from '../dto/create-post.dto';
import { TYPES } from '../../../types';
import { IPostsRepository } from '../repository/posts.repository.interface';
import { PostEntity } from '../post.entity';

@injectable()
export class PostsService implements IPostsService {
  constructor(@inject(TYPES.PostsRepository) private readonly postsRepository: IPostsRepository) {}

  async create({ title, authorId }: CreatePostDto): Promise<Post | null> {
    const newPost = new PostEntity(title, authorId);

    return await this.postsRepository.create(newPost);
  }

  async find(id: number): Promise<Post | null> {
    return await this.postsRepository.find(id);
  }

  async update(id: number, dto: CreatePostDto): Promise<Post | null> {
    return null;
  }

  async delete(id: number): Promise<Post | null> {
    return null;
  }
}
