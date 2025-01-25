import {
  Controller,
  Post,
  Body,
  Delete,
  HttpStatus,
  Param,
  Get,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova transação' })
  @ApiBody({ type: CreateTransactionDto })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    try {
      return this.transactionService.create(createTransactionDto);
    } catch (error) {
      throw HttpStatus.SERVICE_UNAVAILABLE;
    }
  }

  @Get('/find/:id')
  @ApiOperation({ summary: 'Busca uma transação por id' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'O ID da transação no MongoDB',
  })
  findById(@Param('id') id: string) {
    try {
      return this.transactionService.findById(id);
    } catch (error) {
      throw HttpStatus.SERVICE_UNAVAILABLE;
    }
  }

  @Post('/deleteById')
  @ApiOperation({ summary: 'Deleta uma transação por id' })
  @ApiBody({
    description: 'ID da transação a ser deletada',
    schema: { type: 'object', properties: { id: { type: 'string' } } },
  })
  deleteById(@Body('id') id: string) {
    try {
      return this.transactionService.deleteById(id);
    } catch (error) {
      throw HttpStatus.SERVICE_UNAVAILABLE;
    }
  }

  // @Delete()
  // deleteAll() {
  //   return this.transactionService.deleteAll();
  // }
}
