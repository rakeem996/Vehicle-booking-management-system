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
// import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Vehicle } from './entities/vehicle.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Vehicle')
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':userId')
  @ApiCreatedResponse({
    description: 'it returns a object of vehicle created',
    type: Vehicle,
  })
  create(
    @Body(ValidationPipe) createVehicleDto: CreateVehicleDto,
    @Param('userId') userId: string,
  ) {
    return this.vehicleService.create(createVehicleDto, userId);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':userId')
  @ApiCreatedResponse({
    description: 'it returns array of object of all vehicles with user id: id',
    type: [Vehicle],
  })
  findAll(@Param('userId') userId: string) {
    return this.vehicleService.findAll(userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.vehicleService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
  //   return this.vehicleService.update(+id, updateVehicleDto);
  // }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiCreatedResponse({
    description: 'it returns a object of vehicle deleted',
    type: Vehicle,
  })
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(Number(id));
  }
}
