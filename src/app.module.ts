import { Module } from '@nestjs/common';
import { ServicebusModule } from './ServiceBus/servicebus.module';
import { ConfigModule } from '@nestjs/config';
import { WatsonModule } from './Watson/watson.module';
import { UserModule } from './Users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AtendimentoModule } from './Atendimentos/atendimento.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    AuthModule,
    ServicebusModule,
    WatsonModule,
    UserModule,
    AtendimentoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
