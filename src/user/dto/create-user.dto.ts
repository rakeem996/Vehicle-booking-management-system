import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Unique name of User', example: 'User123' })
  @IsNotEmpty({
    message: 'Username is required',
  })
  username: string;

  @ApiProperty({
    description: 'Unique email of User',
    example: 'user1@gmail.com',
  })
  @IsString({
    message: 'Email must be a string',
  })
  email: string;

  @ApiProperty({ description: 'password of User', example: 'Password@123' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    description: 'the authority provided to user',
    example: 'user',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Role is required',
  })
  role: string;
}