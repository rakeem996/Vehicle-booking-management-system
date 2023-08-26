import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from './roles.decorator';
import { Role } from './entities/role.enum';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(Role.ADMIN_MANAGEMENT || Role.ADMIN_INVENTORY)
  @UseGuards(AuthenticatedGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Roles(Role.ADMIN_MANAGEMENT || Role.ADMIN_INVENTORY)
  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  @Roles(Role.ADMIN_MANAGEMENT || Role.ADMIN_INVENTORY)
  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Roles(Role.ADMIN_MANAGEMENT)
  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
