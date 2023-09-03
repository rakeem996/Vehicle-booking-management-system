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
// import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('register')
  // @ApiCreatedResponse({
  //   description: 'Created user object as response',
  //   type: User,
  // })
  // @ApiBadRequestResponse({ description: 'User cannot register, try again.' })
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Roles(Role.ADMIN_MANAGEMENT || Role.ADMIN_INVENTORY)
  @Get('all')
  @ApiCreatedResponse({
    description: 'find the array of all user objects',
    type: [User],
  })
  @ApiBadRequestResponse({
    description: 'cannot access this part of site with your role',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Roles(Role.ADMIN_MANAGEMENT || Role.ADMIN_INVENTORY)
  @Get(':id')
  @ApiCreatedResponse({
    description: 'find one user object as response',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'loggin before accessing this part of site.',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  @Roles(Role.ADMIN_MANAGEMENT || Role.ADMIN_INVENTORY)
  @Patch(':id')
  @ApiCreatedResponse({
    description: 'update one user object and send it as a response',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'loggin before accessing this part of site.',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Roles(Role.ADMIN_MANAGEMENT)
  @Delete(':id')
  @ApiCreatedResponse({
    description: 'delete one user object and send it as a response',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'loggin before accessing this part of site.',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
