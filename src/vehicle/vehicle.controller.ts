import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  UseGuards,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Role } from 'src/user/entities/role.enum';
import { Roles } from 'src/user/roles.decorator';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Vehicle } from './entities/vehicle.entity';

@ApiTags('Vehicle')
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Roles(Role.ADMIN_INVENTORY)
  @UseGuards(AuthenticatedGuard)
  @Post(':userId')
  @ApiCreatedResponse({
    description: 'it returns a object of vehicle created',
    type: Vehicle,
  })
  create(
    @Body(ValidationPipe) createVehicleDto: CreateVehicleDto,
    @Param('userId') userId: number,
  ) {
    return this.vehicleService.create(createVehicleDto, Number(userId));
  }

  @Roles(Role.ADMIN_INVENTORY)
  @UseGuards(AuthenticatedGuard)
  @Get(':userId')
  @ApiCreatedResponse({
    description: 'it returns array of object of all vehicles',
    type: [Vehicle],
  })
  findAll(@Param('userId') userId: number) {
    return this.vehicleService.findAll(Number(userId));
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.vehicleService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
  //   return this.vehicleService.update(+id, updateVehicleDto);
  // }

  @Roles(Role.ADMIN_INVENTORY)
  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  @ApiCreatedResponse({
    description: 'it returns a object of vehicle deleted',
    type: Vehicle,
  })
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(Number(id));
  }
}
