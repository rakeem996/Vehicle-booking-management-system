import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  @ApiProperty({
    description: 'select the number of wheels',
    example: 4,
  })
  @IsNumber()
  @IsNotEmpty()
  wheel: number;

  @ApiProperty({
    description: 'select the type of vehicle',
    example: 'SUV',
  })
  @IsString()
  @IsNotEmpty()
  vehicleType: string;

  @ApiProperty({
    description: 'select the vehicle model',
    example: 'Urus',
  })
  @IsString()
  @IsNotEmpty()
  vehicleModel: string;
}
