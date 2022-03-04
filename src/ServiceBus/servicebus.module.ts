import { Module } from '@nestjs/common';
import { ServicebusService } from './servicebus.service';
import { ServicebusController } from './servicebus.controller';

@Module({
  controllers: [ServicebusController],
  providers: [ServicebusService],
})
export class ServicebusModule {}
