import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class UserService {
  //inject user repo
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User();
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);
      user.username = createUserDto.username;
      user.email = createUserDto.email;
      user.password = hashPassword;
      user.role = createUserDto.role;
      return this.userRepository.save(user);
    } catch (err) {
      throw new Error(`Error creating ${err} user ${err.message}`);
    }
  }


  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneId(id: string) {
    return this.userRepository.findOneOrFail({ where: { id } });
  }

  async findOne(email: string, password: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (user && isMatch) {
        return user;
      } else {
        throw new Error(`User not found`);
      }
    } catch (err) {
      throw new Error(`Error finding ${err} user ${err.message}`);
    }
  }

  async findOneUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username: username } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user: User = new User();
    // user.name = updateUserDto.name;
    user.username = updateUserDto.username;
    user.id = id;
    return this.userRepository.save(user);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
