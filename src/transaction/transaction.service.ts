import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import {
  throwErrorAndLog,
  validateFutureDate,
  validateMongoId,
  validatePositiveValue,
  validateSameCpf,
} from 'src/utils/validations.utils';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './schema/transaction.schema';
import { UseCasesMessages } from '../utils/use-cases-messages.utils';
import { UserService } from 'src/user/user.service';
import { TransactionStatusENUM } from 'src/types/types';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    private readonly userService: UserService,
  ) {}

  async create(transaction: CreateTransactionDto): Promise<Transaction> {
    this.logger.debug('Starting transaction storage');
    console.dir(transaction);

    validateFutureDate(transaction?.dateHour || new Date());
    validatePositiveValue(transaction.value);
    validateSameCpf(transaction.originCpf, transaction.receiverCpf);
    await this.userService.findOne(transaction.originCpf);
    await this.userService.findOne(transaction.receiverCpf);

    const savedTransaction = await this.transactionModel.create(transaction);

    await this.userService.addTransactionToUser(
      transaction.originCpf,
      savedTransaction._id,
      TransactionStatusENUM.SENDED,
    );

    await this.userService.addTransactionToUser(
      transaction.receiverCpf,
      savedTransaction._id,
      TransactionStatusENUM.RECEIVED,
    );

    this.logger.debug('End of transaction storage, success');
    return savedTransaction;
  }

  async findById(id: string): Promise<object> {
    this.logger.debug('Searching transaction by ID');
    validateMongoId(id);
    const transaction = await this.transactionModel.findById(id).exec();
    if (!transaction) {
      throwErrorAndLog(
        this.logger,
        UseCasesMessages.NOT_FOUND_MONGODB_ID,
        HttpStatus.NOT_FOUND,
      );
    }

    const user = await this.userService.findOne(transaction.originCpf);

    this.logger.debug('Returning transaction by ID');
    return {
      ...transaction.toObject(),
      originCpf: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        cpf: user.cpf,
      },
    };
  }

  async deleteById(id: string): Promise<HttpStatus> {
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
}
