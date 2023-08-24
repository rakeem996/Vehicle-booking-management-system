import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
// import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private vehicleService: VehicleService,
    private userService: UserService,
  ) {}

  async create(
    createBookingDto: CreateBookingDto,
    vehicleId: number,
    userId: number,
  ) {
    const booking: Booking = new Booking();
    booking.bookingDate = new Date().toLocaleDateString();
    booking.user = await this.userService.findOne(userId);
    booking.vehicle = await this.vehicleService.findOne(vehicleId);

    return this.bookingRepository.save(booking);
  }

  findAll(vehicleId: number) {
    return this.bookingRepository.find({
      relations: ['vehicle'],
      where: { id: vehicleId },
    });
  }

  findOne(id: number) {
    return this.bookingRepository.findOne({ where: { id } });
  }

  // update(id: number, updateBookingDto: UpdateBookingDto) {
  //   const booking: Booking = new Booking();
  //   booking.bookingDate = updateBookingDto.bookingDate;
  //   return this.bookingRepository.save(booking);
  // }

  remove(id: number) {
    return this.bookingRepository.delete(id);
  }
}
