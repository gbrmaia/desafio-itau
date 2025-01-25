import { Controller, Get, Query, Param } from '@nestjs/common';
import { InfoService } from './info.service';
import { TransactionFilters, TransactionStatusENUM } from 'src/types/types';
import { ApiTags, ApiQuery, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Info')
@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get('/cpf=:cpf')
  @ApiParam({ name: 'cpf', description: 'CPF do usuário', type: String })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filtrar por status',
  })
  allTransactionsByCpf(
    @Param('cpf') cpf: string,
    @Query('status') statusFilter?: TransactionStatusENUM,
  ) {
    return this.infoService.allTransactionsByCpf(cpf, statusFilter);
  }

  @Get('/transactions')
  @ApiQuery({
    name: 'startDate',
    required: false,
    default: new Date(),
    description: 'Data de início ISO',
  })
  @ApiQuery({
    name: 'endDate',
    default: new Date(),
    required: false,
    description: 'Data de fim ISO',
  })
  @ApiQuery({
    name: 'minValue',
    required: false,
    description: 'Valor mínimo da transação',
  })
  @ApiQuery({
    name: 'maxValue',
    required: false,
    description: 'Valor máximo da transação',
  })
  @ApiQuery({
    name: 'originCpf',
    required: false,
    description: 'Cpf de origem',
  })
  @ApiQuery({
    name: 'receiverCpf',
    required: false,
    description: 'Cpf de origem',
  })
  allTransactionsWithFilters(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('minValue') minValue?: number,
    @Query('maxValue') maxValue?: number,
    @Query('originCpf') originCpf?: string,
    @Query('receiverCpf') receiverCpf?: string,
  ) {
    const filters: TransactionFilters = {
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      minValue: minValue ? Number(minValue) : undefined,
      maxValue: maxValue ? Number(maxValue) : undefined,
      originCpf: originCpf,
      receiverCpf: receiverCpf,
    };
    return this.infoService.allTransactionsWithFilters(filters);
  }

  @Get('/transactions/summary')
  @ApiQuery({
    name: 'startDate',
    required: false,
    default: new Date(),
    description: 'Data de início ISO',
  })
  @ApiQuery({
    name: 'endDate',
    default: new Date(),
    required: false,
    description: 'Data de fim ISO',
  })
  @ApiQuery({
    name: 'minValue',
    required: false,
    description: 'Valor mínimo da transação',
  })
  @ApiQuery({
    name: 'maxValue',
    required: false,
    description: 'Valor máximo da transação',
  })
  @ApiQuery({
    name: 'originCpf',
    required: false,
    description: 'Cpf de origem',
  })
  @ApiQuery({
    name: 'receiverCpf',
    required: false,
    description: 'Cpf de origem',
  })
  @ApiResponse({
    status: 200,
    description:
      'Retorna as estatísticas e a lista de transações filtradas com base nos critérios fornecidos.',
    schema: {
      type: 'object',
      properties: {
        count: {
          type: 'number',
          description: 'Quantidade total de transações no período selecionado.',
        },
        sum: {
          type: 'number',
          description: 'Soma total do valor transacionado.',
        },
        avg: { type: 'number', description: 'Média do valor transacionado.' },
        min: { type: 'number', description: 'Menor valor transacionado.' },
        max: { type: 'number', description: 'Maior valor transacionado.' },
      },
    },
  })
  getTransactionStatsWithFilters(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('minValue') minValue?: number,
    @Query('maxValue') maxValue?: number,
    @Query('originCpf') originCpf?: string,
    @Query('receiverCpf') receiverCpf?: string,
  ) {
    const filters: TransactionFilters = {
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      minValue: minValue ? Number(minValue) : undefined,
      maxValue: maxValue ? Number(maxValue) : undefined,
      originCpf: originCpf,
      receiverCpf: receiverCpf,
    };
    return this.infoService.getTransactionStatsWithFilters(filters);
  }
}
