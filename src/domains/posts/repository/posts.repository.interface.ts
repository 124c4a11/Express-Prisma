import { Post } from '@prisma/client';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../post.entity';

export interface IPostsRepository {
  create: (post: PostEntity) => Promise<Post | null>;
  find: (id: number) => Promise<Post | null>;
  update: (id: number, dto: CreatePostDto) => Promise<Post | null>;
  delete: (id: number) => Promise<Post | null>;
}
