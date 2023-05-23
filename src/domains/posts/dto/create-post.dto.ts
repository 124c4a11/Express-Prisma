import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Post title is wrong!' })
  title: string;

  @IsNumber()
  authorId: number;
}
