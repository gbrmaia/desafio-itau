import { Types } from 'mongoose';

export enum TransactionStatusENUM {
  SENDED = 'sended',
  RECEIVED = 'received',
}

export type TransactionStatusType = {
  transactionId: Types.ObjectId;
  status: TransactionStatusENUM;
};

export type TransactionType = {
  _id?: Types.ObjectId;
  value: number;
  dateHour?: Date;
  originCpf: string;
  receiverCpf: string;
};

export type User = {
  _id?: Types.ObjectId;
  name: string;
  lastName?: string;
  email?: string;
  birthday?: Date;
  cpf: string;
  transactions: TransactionStatusType[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type TransactionFilters = {
  startDate?: Date;
  endDate?: Date;
  minValue?: number;
  maxValue?: number;
  originCpf?: string;
  receiverCpf?: string;
};

export type InfoTransactions = {
  count: number;
  sum: number;
  avg: number;
  max: number;
  min: number;
};
