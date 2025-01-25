import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from 'src/transaction/schema/transaction.schema';
import { TransactionService } from 'src/transaction/transaction.service';
import {
  InfoTransactions,
  TransactionFilters,
  TransactionStatusENUM,
} from 'src/types/types';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import {
  validateFutureDate,
  validatePositiveValue,
  validateStartDateGreaterThanEndDate,
} from 'src/utils/validations.utils';

@Injectable()
export class InfoService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly userService: UserService,
    private readonly transactionService: TransactionService,
  ) {}

  private buildTransactionQuery(
    filters?: TransactionFilters,
  ): Record<string, any> {
    const query: Record<string, any> = {};

    validateFutureDate(filters?.endDate || new Date());
    validateStartDateGreaterThanEndDate(
      filters?.startDate || new Date(),
      filters?.endDate || new Date(),
    );
    validatePositiveValue(filters?.minValue || 1);
    validatePositiveValue(filters?.maxValue || 1);

    if (filters?.startDate || filters?.endDate) {
      query.dateHour = {};
      if (filters.startDate) {
        query.dateHour.$gte = filters.startDate;
      }
      if (filters.endDate) {
        query.dateHour.$lte = filters.endDate;
      }
    }

    if (filters?.minValue !== undefined || filters?.maxValue !== undefined) {
      query.value = {};
      if (filters.minValue !== undefined) {
        query.value.$gte = filters.minValue;
      }
      if (filters.maxValue !== undefined) {
        query.value.$lte = filters.maxValue;
      }
    }

    if (filters?.originCpf) {
      query.originCpf = filters.originCpf;
    }

    if (filters?.receiverCpf) {
      query.receiverCpf = filters.receiverCpf;
    }

    return query;
  }

  async allTransactionsByCpf(
    cpf: string,
    statusFilter?: TransactionStatusENUM,
  ) {
    const transactions = await this.userModel.findOne(
      { cpf },
      { transactions: 1, _id: 0 },
    );

    const filteredTransactions = transactions?.transactions.filter(
      (transaction) => !statusFilter || transaction.status === statusFilter,
    );

    const detailedTransactions = await Promise.all(
      filteredTransactions?.map(async (transaction) => {
        const transactionId = transaction.transactionId.toString();
        const details = await this.transactionService.findById(transactionId);

        return {
          status: transaction.status,
          ...details,
        };
      }) || [],
    );

    return detailedTransactions;
  }

  async allTransactionsWithFilters(filters?: TransactionFilters) {
    const query = this.buildTransactionQuery(filters);

    const transactions = await this.transactionModel.find(query).exec();
    return transactions;
  }

  async getTransactionStatsWithFilters(
    filters?: TransactionFilters,
  ): Promise<InfoTransactions> {
    const transactions = await this.allTransactionsWithFilters(filters);

    const count = transactions.length;

    const sum = transactions.reduce(
      (acc, transaction) => acc + transaction.value,
      0,
    );

    const avg = count > 0 ? sum / count : 0;

    const min = transactions.reduce((acc, transaction) => {
      return transaction.value < acc ? transaction.value : acc;
    }, transactions[0]?.value || 0);

    const max = transactions.reduce((acc, transaction) => {
      return transaction.value > acc ? transaction.value : acc;
    }, transactions[0]?.value || 0);

    return {
      count,
      sum,
      avg: parseFloat(avg.toFixed(2)),
      min,
      max,
    };
  }
}
