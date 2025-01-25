import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { TransactionStatusENUM, TransactionStatusType } from 'src/types/types';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, minlength: 2, maxlength: 50 })
  name: string;

  @Prop({ minlength: 2, maxlength: 50 })
  lastName?: string;

  @Prop({ unique: true })
  email?: string;

  @Prop({ type: Date })
  birthday?: Date;

  @Prop({ required: true, minlength: 11, maxlength: 11 })
  cpf: string;

  @Prop([
    {
      transactionId: {
        type: Types.ObjectId,
        ref: 'Transaction',
        required: false,
      },
      status: {
        type: String,
        enum: TransactionStatusENUM,
        required: false,
      },
    },
  ])
  transactions: TransactionStatusType[];
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ dateHour: 1 });
