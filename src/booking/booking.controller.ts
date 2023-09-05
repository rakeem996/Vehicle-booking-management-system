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
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Booking } from './entities/booking.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
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
  
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(
    @Request() req,
    @Body(ValidationPipe) createBookingDto: CreateBookingDto,
    @Param('vehicleId') vehicleId: number,
    @Param('userId') userId: string,
  ) {
    return this.bookingService.create(
      createBookingDto,
      Number(vehicleId),
      userId,
    );
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':vehicleId')
  @ApiCreatedResponse({
    description: 'returns all the booking made with vehicle id as an array',
    type: [Booking],
  })
  @ApiBadRequestResponse({ description: 'loggin before using this resource' })
  findAll(@Param('vehicleId') vehicleId: number) {
    return this.bookingService.findAll(Number(vehicleId));
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
