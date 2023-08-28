import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Booking {
  @ApiProperty({
    description: 'the ID provided',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'the date of the booking made',
    example: '12/01/2012',
  })
  @Column()
  bookingDate: string;

  @ApiProperty({
    description: 'the user booking desc',
    type: () => User,
    example: {
      user: {
        id: 5,
        name: 'user5',
        username: 'user5',
        password: '123',
        roles: ['admin-manage', 'admin-inventory'],
      },
    },
  })
  @ManyToOne(() => User, (user) => user.booking)
  user: User;

  @ApiProperty({
    description: 'the vehicle selected by user',
    type: () => Vehicle,
    example: {
      vehicle: {
        id: 1,
        wheels: 4,
        vehicleType: 'sports',
        vehicleModel: 'mustang',
      },
    },
  })
  @ManyToOne(() => Vehicle, (vehicle) => vehicle.booking)
  vehicle: Vehicle;
}
