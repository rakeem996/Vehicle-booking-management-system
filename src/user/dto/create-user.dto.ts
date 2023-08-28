import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'the name of the user',
    example: 'John Doe',
  })
  @IsString()
  @Length(0, 50)
  name: string;

  @ApiProperty({
    description: 'the unique username of the user',
    example: 'User123',
  })
  @IsString()
  @Length(0, 20)
  username: string;

  @ApiProperty({
    description:
      'the password with contains alphabets,number and special characters',
    example: 'user@123',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
