import { IsArray, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsString({ message: 'Name is wrong!' })
  name: string;

  @IsEmail({}, { message: 'Email is wrong!' })
  email: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true, message: 'Followed By is wrong!' })
  followedByIDs?: number[];
}
