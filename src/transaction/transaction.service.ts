import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import {
  throwErrorAndLog,
  validateFutureDate,
  validateMongoId,
  validatePositiveValue,
} from 'src/common/utils/validations.utils';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './schemas/transaction.schema';
import { UseCasesMessages } from './constants/use-cases-messages';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  async create(transaction: CreateTransactionDto): Promise<Transaction> {
    this.logger.debug('Starting transaction storage');

    validateFutureDate(transaction.dateHour);
    validatePositiveValue(transaction.value);

    const savedTransaction = await this.transactionModel.create(transaction);

    this.logger.debug('End of transaction storage, success');
    return savedTransaction;
  }

  async deleteById(id: string) {
    this.logger.debug('Starting removal steps');
    validateMongoId(id);
    await this.findById(id);
    await this.transactionModel.findByIdAndDelete(id).exec();
    this.logger.debug('End of removal steps, success');
    return HttpStatus.OK;
  }

  deleteAll() {
    this.logger.debug('Starting removal');
    this.logger.debug('End of removal steps');
    return 'All data deleted.';
  }

  private async findById(id: string) {
    this.logger.debug('Starting search by id');
    const idExists = await this.transactionModel.findById(id).exec();
    if (!idExists) {
      throwErrorAndLog(
        this.logger,
        UseCasesMessages.NOT_FOUND_MONGODB_ID,
        HttpStatus.NOT_FOUND,
      );
    }
    this.logger.debug('Id found');
    return true;
  }
}
