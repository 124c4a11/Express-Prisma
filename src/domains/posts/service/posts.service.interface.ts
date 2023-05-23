import { Post } from '@prisma/client';
import { CreatePostDto } from '../dto/create-post.dto';

export interface IPostsService {
  create: (dto: CreatePostDto) => Promise<Post | null>;
  find: (id: number) => Promise<Post | null>;
  update: (id: number, dto: CreatePostDto) => Promise<Post | null>;
  delete: (id: number) => Promise<Post | null>;
}
