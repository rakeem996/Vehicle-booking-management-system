import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
// import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    private userService: UserService,
  ) {}

  async create(createVehicleDto: CreateVehicleDto, userId: string) {
    const vehicle: Vehicle = new Vehicle();
    vehicle.user = await this.userService.findOneId(userId);
    vehicle.wheels = createVehicleDto.wheel;
    vehicle.vehicleType = createVehicleDto.vehicleType;
    vehicle.vehicleModel = createVehicleDto.vehicleModel;
    return this.vehicleRepository.save(vehicle);
  }

  findAll(userId: string) {
    return this.vehicleRepository.find({
      relations: ['user'],
      where: { id: Number(userId) },
    });
  }

  findOne(id: number) {
    return this.vehicleRepository.findOne({ where: { id } });
  }

  // update(id: number, updateVehicleDto: UpdateVehicleDto) {
  //   const vehicle: Vehicle = new Vehicle();
  //   vehicle.user = updateVehicleDto.user;
  //   vehicle.wheels = updateVehicleDto.wheel;
  //   vehicle.vehicleType = updateVehicleDto.vehicleType;
  //   vehicle.vehicleModel = updateVehicleDto.vehicleModel;
  //   return this.vehicleRepository.save(vehicle);
  // }

  remove(id: number) {
    return this.vehicleRepository.delete(id);
  }
}
