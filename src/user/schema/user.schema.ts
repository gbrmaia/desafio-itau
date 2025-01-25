import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ dateHour: 1 });
