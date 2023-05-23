import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsString({ message: 'Name is wrong!' })
  name: string;

  @IsEmail({}, { message: 'Email is wrong!' })
  email: string;
}
