import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateVehicleDto {
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
