import { Controller, Post } from '@nestjs/common';
import { ServicebusService } from './servicebus.service';

@Controller('servicebus')
export class ServicebusController {
  constructor(private readonly servicebusService: ServicebusService) {}
  @Post()
  async receive() {
    return await this.servicebusService.receive();
  }
  @Post('/send')
  async send() {
    return await this.servicebusService.sendToQueue();
  }
}
