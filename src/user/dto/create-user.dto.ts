import { IsString, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(0, 50)
  name: string;

  @IsString()
  @Length(0, 20)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}
