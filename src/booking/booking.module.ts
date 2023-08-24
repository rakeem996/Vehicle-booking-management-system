import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), VehicleModule, UserModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
