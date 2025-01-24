import { Controller, Post, Body, Delete, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova transação' })
  @ApiBody({ type: CreateTransactionDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Transação criada com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Data futura ou valor inválido.',
  })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    try {
      return this.transactionService.create(createTransactionDto);
    } catch (error) {
      throw HttpStatus.SERVICE_UNAVAILABLE;
    }
  }

  @Post('/deleteById')
  @ApiOperation({ summary: 'Deleta uma transação por ID' })
  @ApiBody({
    description: 'ID da transação a ser deletada',
    schema: { type: 'object', properties: { id: { type: 'string' } } },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transação deletada com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'ID inválido ou não existente.',
  })
  deleteById(@Body('id') id: string) {
    try {
      return this.transactionService.deleteById(id);
    } catch (error) {
      throw HttpStatus.SERVICE_UNAVAILABLE;
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta todas as transações' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Todas as transações deletadas com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não há dados na memória.',
  })
  deleteAll() {
    return this.transactionService.deleteAll();
  }
}
