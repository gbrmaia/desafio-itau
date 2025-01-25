import {
  ConflictException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schema/user.schema';
import { throwErrorAndLog, validateCpf } from 'src/utils/validations.utils';
import { UseCasesMessages } from 'src/utils/use-cases-messages.utils';
import { TransactionStatusENUM } from 'src/types/types';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    this.logger.debug('Starting User storage');
    const cpfExists = await this.findByCpf(user.cpf);

    if (cpfExists) {
      throw new ConflictException('User with this CPF already exists');
    }

    const savedUser = await this.userModel.create(user);
    this.logger.debug('End of User storage, success');
    return savedUser;
  }

  async update(cpf: string, updateFields: UpdateUserDto): Promise<User> {
    const cpfExists = await this.findByCpf(cpf);
    if (!cpfExists) {
      throwErrorAndLog(
        this.logger,
        UseCasesMessages.NOT_FOUND_CPF,
        HttpStatus.NOT_FOUND,
      );
    }

    updateFields = Object.keys(updateFields).reduce((fields, key) => {
      if (updateFields[key] !== undefined) {
        fields[key] = updateFields[key];
      }
      return fields;
    }, {});

    const updatedUser = await this.userModel.findByIdAndUpdate(
      cpfExists._id,
      { $set: updateFields },
      { new: true, runValidators: true },
    );

    return updatedUser as User;
  }

  async findOne(cpf: string): Promise<User> {
    const cpfExists = await this.findByCpf(cpf);
    if (!cpfExists) {
      throwErrorAndLog(
        this.logger,
        UseCasesMessages.NOT_FOUND_CPF,
        HttpStatus.NOT_FOUND,
      );
    }
    return cpfExists;
  }

  async findAll(): Promise<User[]> {
    this.logger.debug('Returning All User storage');
    return await this.userModel.find().exec();
  }

  async removeByCpf(cpf: string): Promise<{ message: string }> {
    this.logger.debug('Starting removal steps');
    const cpfExists = await this.findByCpf(cpf);
    if (!cpfExists) {
      throwErrorAndLog(
        this.logger,
        UseCasesMessages.NOT_FOUND_CPF,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.userModel.deleteOne({ cpf }).exec();
    this.logger.debug('End of removal steps');
    return { message: 'User successfully deleted' };
  }

  async findByCpf(cpf: string) {
    this.logger.debug('Starting search by CPF');
    validateCpf(cpf);
    const cpfExists = await this.userModel.findOne({ cpf }).exec();
    if (!cpfExists) {
      this.logger.warn('CPF not found');
      return false;
    }
    this.logger.debug('CPF found');
    return cpfExists;
  }

  async addTransactionToUser(
    cpf: string,
    transactionId: Types.ObjectId,
    status: TransactionStatusENUM,
  ): Promise<void> {
    this.logger.debug(`Inserting transactions in CPF: ${cpf}`);
    await this.userModel.findOneAndUpdate(
      { cpf },
      {
        $push: {
          transactions: { transactionId, status },
        },
      },
    );
  }
}
