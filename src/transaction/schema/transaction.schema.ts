import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true, min: 0 })
  value: number;

  @Prop({ required: false, default: new Date() })
  dateHour: Date;

  @Prop({ required: true })
  originCpf: string;

  @Prop({ required: true })
  receiverCpf: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
TransactionSchema.index({ dateHour: 1 });
