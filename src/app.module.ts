import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGO_DB_URI || 'mongodb://localhost/nome_do_banco',
    ),
    TransactionModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
