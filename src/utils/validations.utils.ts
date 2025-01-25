import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { UseCasesMessages } from 'src/utils/use-cases-messages.utils';
import * as path from 'path';

export function throwErrorAndLog(
  logger: Logger,
  message: string,
  status: HttpStatus,
): never {
  logger.warn(message);
  throw new HttpException(message, status);
}

const logger = new Logger(path.basename(__filename));

export function validateFutureDate(dateHour: Date): void {
  const currentDate = new Date();

  if (dateHour > currentDate) {
    throwErrorAndLog(
      logger,
      UseCasesMessages.INVALID_DATE_FUTURE,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export function validatePositiveValue(value: number): void {
  if (value <= 0) {
    throwErrorAndLog(
      logger,
      UseCasesMessages.INVALID_VALUE,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export function validateMongoId(id: string): void {
  if (typeof id !== 'string' || !id.match(/^[0-9a-fA-F]{24}$/)) {
    throwErrorAndLog(
      logger,
      UseCasesMessages.INVALID_ID,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export function validateCpf(cpf: string): void {
  const cpfRegex = /^\d{11}$/;
  if (typeof cpf !== 'string' || !cpfRegex.test(cpf)) {
    throwErrorAndLog(
      logger,
      UseCasesMessages.INVALID_CPF,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export function validateSameCpf(originCpf: string, receiverCpf: string): void {
  if (originCpf === receiverCpf) {
    throwErrorAndLog(
      logger,
      UseCasesMessages.SAME_CPF,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
