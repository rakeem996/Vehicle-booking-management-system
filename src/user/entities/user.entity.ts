import { Booking } from 'src/booking/entities/booking.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from 'src/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  // @ApiProperty({
  //   description: 'Unique ID provided to the user',
  //   example: 1,
  // })
  // @PrimaryGeneratedColumn()
  // id: number;

  // @ApiProperty({ description: 'name of the User', example: 'John Doe' })
  // @Column()
  // name: string;

  // @ApiProperty({ description: 'Unique name of User', example: 'User123' })
  // @Column()
  // username: string;

  // @ApiProperty({ description: 'password of User', example: 'Password@123' })
  // @Column()
  // password: string;

  // @ApiProperty({
  //   description: 'the suthority provided to user',
  //   example: 'user',
  // })
  // @Column('text', { array: true, default: [Role.USER] })
  // roles: string[];

  @ApiProperty({
    description: 'Unique ID provided to the user',
    example: 1,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Unique name of User', example: 'User123' })
  @Column({ nullable: false })
  username: string;

  @ApiProperty({
    description: 'Unique email of User',
    example: 'user1@gmail.com',
  })
  @Column({ nullable: false, unique: true })
  email: string;

  @ApiProperty({ description: 'password of User', example: 'Password@123' })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({
    description: 'the authority provided to user',
    example: 'user',
  })
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: string;

  @ApiProperty({
    description: 'the date of creation of user profile',
    example: '12/10/2022',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'the date of updation of user profile',
    example: '12/10/2022',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Booking, (booking) => booking.user)
  booking: Booking[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[];
}
