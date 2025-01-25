import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  dateHour?: Date;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  originCpf: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  receiverCpf: string;
}
