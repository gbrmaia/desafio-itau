import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { UserModule } from 'src/user/user.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [UserModule, TransactionModule],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
