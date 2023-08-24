import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post(':userId')
  create(
    @Body(ValidationPipe) createVehicleDto: CreateVehicleDto,
    @Param('userId') userId: number,
  ) {
    return this.vehicleService.create(createVehicleDto, Number(userId));
  }

  @Get(':userId')
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(Number(id));
  }
}
