import { Transform } from "class-transformer"; 
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTransactionDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    value: number;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    dateHour: Date;
}
