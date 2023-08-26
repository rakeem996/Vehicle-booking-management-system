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
  Request,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Role } from 'src/user/entities/role.enum';
import { Roles } from 'src/user/roles.decorator';
// import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(AuthenticatedGuard)
  @Post(':userId/:vehicleId')
  create(
    @Request() req,
    @Body(ValidationPipe) createBookingDto: CreateBookingDto,
    @Param('vehicleId') vehicleId: number,
    @Param('userId') userId: number,
  ) {
    return this.bookingService.create(
      createBookingDto,
      Number(vehicleId),
      Number(userId),
    );
  }

  @Roles(Role.ADMIN_MANAGEMENT || Role.ADMIN_INVENTORY)
  @UseGuards(AuthenticatedGuard)
  @Get(':vehicleId')
  findAll(@Param('vehicleId') vehicleId: number) {
    return this.bookingService.findAll(Number(vehicleId));
  }

  @Roles(Role.ADMIN_MANAGEMENT || Role.ADMIN_INVENTORY)
  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
  //   return this.bookingService.update(+id, updateBookingDto);
  // }

  @Roles(Role.ADMIN_MANAGEMENT || Role.ADMIN_INVENTORY)
  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(Number(id));
  }
}
