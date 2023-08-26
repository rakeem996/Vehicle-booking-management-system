import { Booking } from 'src/booking/entities/booking.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column('text', { array: true, default: [Role.USER] })
  roles: string[];

  @OneToMany(() => Booking, (booking) => booking.user)
  booking: Booking[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[];
}
