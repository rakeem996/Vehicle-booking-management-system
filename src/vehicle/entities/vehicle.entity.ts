import { Booking } from 'src/booking/entities/booking.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  // OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Vehicle {
  @ApiProperty({
    description: 'the ID provided',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'select the number of wheels',
    example: 4,
  })
  @Column()
  wheels: number;

  @ApiProperty({
    description: 'select the type of vehicle',
    example: 'SUV',
  })
  @Column()
  vehicleType: string;

  @ApiProperty({
    description: 'select the vehicle model',
    example: 'Urus',
  })
  @Column()
  vehicleModel: string;

  @OneToMany(() => Booking, (booking) => booking.vehicle)
  booking: Booking[];

  @ApiProperty({
    description: 'the user which selected the car',
    type: () => User,
    example: {
      user: {
        id: 5,
        name: 'user5',
        username: 'user5',
        password: '123',
        roles: ['admin'],
      },
    },
  })
  @ManyToOne(() => User, (user) => user.vehicles)
  user: User;
}
