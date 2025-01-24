import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
export class Transaction {

  @Prop({ required: true, min: 0 })
  value: number

  @Prop({ required: true }) 
  dateHour: Date;

}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
TransactionSchema.index({ dateHour: 1 });
