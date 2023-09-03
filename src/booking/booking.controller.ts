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
// import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Role } from 'src/user/entities/role.enum';
import { Roles } from 'src/user/roles.decorator';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Booking } from './entities/booking.entity';
// import { UpdateBookingDto } from './dto/update-booking.dto';

@ApiTags('Bookings')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post(':userId/:vehicleId')
  @ApiCreatedResponse({
    description: 'returns the booking object',
    type: Booking,
  })
  @ApiBadRequestResponse({ description: 'loggin before using this resource' })
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
  @Get(':vehicleId')
  @ApiCreatedResponse({
    description: 'returns all the booking made with vehicle id as an array',
    type: [Booking],
  })
  @ApiBadRequestResponse({ description: 'loggin before using this resource' })
  findAll(@Param('vehicleId') vehicleId: number) {
    return this.bookingService.findAll(Number(vehicleId));
  }

  @Roles(Role.ADMIN_MANAGEMENT || Role.ADMIN_INVENTORY)
  @Get(':id')
  @ApiCreatedResponse({
    description: 'returns the booking with the provided booking id',
    type: Booking,
  })
  @ApiBadRequestResponse({ description: 'loggin before using this resource' })
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
  //   return this.bookingService.update(+id, updateBookingDto);
  // }

  @Roles(Role.ADMIN_MANAGEMENT || Role.ADMIN_INVENTORY)
  @Delete(':id')
  @ApiCreatedResponse({
    description:
      'deletes and returns the booking object with booking id provided',
    type: Booking,
  })
  @ApiBadRequestResponse({ description: 'loggin before using this resource' })
  remove(@Param('id') id: string) {
    return this.bookingService.remove(Number(id));
  }
}
