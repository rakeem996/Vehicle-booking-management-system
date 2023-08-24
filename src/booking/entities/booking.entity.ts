import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookingDate: string;

  @ManyToOne(() => User, (user) => user.booking)
  user: User;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.booking)
  vehicle: Vehicle;
}
