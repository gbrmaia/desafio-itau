import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionSchema } from './schemas/transaction.schema';
import { randomUUID } from 'crypto';
import { ErrorMessages } from './constants/error-messages';

@Injectable()
export class TransactionService {
  private memory: TransactionSchema[] = [];
  private readonly logger = new Logger(TransactionService.name);

  async create(transaction: CreateTransactionDto) {
    this.logger.debug('Starting transaction storage')
    const id = randomUUID()
    const insertInto = new Date()

    this.validateDate(transaction.dateHour)
    this.validateValue(transaction.value)

    const includedIdTransaction: TransactionSchema = {
      id,
      ...transaction,
      insertInto
    }

    this.memory.push(includedIdTransaction)
    this.logger.debug('End of transaction storage')
    console.log(this.memory)
    return includedIdTransaction
  }

  deleteById(id: string) {
    this.logger.debug('Starting removal steps')
    const isValidId = this.memory.findIndex((transaction) => {
      return String(transaction.id).trim() === String(id).trim();
    });

    this.validateId(isValidId)
    
    this.memory.splice(isValidId, 1)
    this.logger.debug('End of removal steps')
    console.log(this.memory)
    return HttpStatus.OK
  }

  deleteAll() {
    this.logger.debug('Starting removal')
    const hasDataInMemory = this.memory.length > 0

    if(!hasDataInMemory) {
      this.logger.warn(ErrorMessages.NO_DATA_IN_MEMORY)
      throw new HttpException(ErrorMessages.NO_DATA_IN_MEMORY, HttpStatus.NOT_FOUND)
    }

    this.logger.debug('End of removal steps')
    this.memory = []
    console.log(this.memory)
    return 'All data deleted.'
  }

  private validateId(index: number) {
    this.logger.debug('Starting validation of id')
    if(index === -1){
      this.logger.warn(ErrorMessages.INVALID_ID)
      throw new HttpException(ErrorMessages.INVALID_ID, HttpStatus.NOT_FOUND)
    }
    this.logger.debug('Is a valid id')
  }

  private validateDate(dateHour: Date): void {
    const currentDate = new Date()

    if(new Date(dateHour) > currentDate) {
      this.logger.warn(ErrorMessages.INVALID_DATE_FUTURE)
      throw new HttpException(ErrorMessages.INVALID_DATE_FUTURE, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  private validateValue(value: number): void {

    if(value <= 0) {
      this.logger.warn(ErrorMessages.INVALID_VALUE)
      throw new HttpException(ErrorMessages.INVALID_VALUE, HttpStatus.UNPROCESSABLE_ENTITY)
    } 

  }
}
