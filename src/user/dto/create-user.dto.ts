import { MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsOptional()
  lastName?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  birthday?: Date;

  @ApiProperty()
  @IsString()
  @MaxLength(11)
  @MinLength(11)
  @IsNotEmpty()
  cpf: string;
}
