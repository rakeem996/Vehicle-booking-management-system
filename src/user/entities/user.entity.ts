import { Booking } from 'src/booking/entities/booking.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({
    description: 'Unique ID provided to the user',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'name of the User', example: 'John Doe' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Unique name of User', example: 'User123' })
  @Column()
  username: string;

  @ApiProperty({ description: 'password of User', example: 'Password@123' })
  @Column()
  password: string;

  @ApiProperty({
    description: 'the suthority provided to user',
    example: 'user',
  })
  @Column('text', { array: true, default: [Role.USER] })
  roles: string[];

  @OneToMany(() => Booking, (booking) => booking.user)
  booking: Booking[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[];
}
