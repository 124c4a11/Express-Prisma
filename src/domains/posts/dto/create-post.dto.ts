import { ArrayNotEmpty, IsArray, IsIn, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Post title is wrong!' })
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  authorIds: number[];
}
