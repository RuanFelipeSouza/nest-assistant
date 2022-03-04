import { Controller, Get, Post } from '@nestjs/common';
import { WatsonService } from '../Watson/watson.service';

@Controller('message')
export class MessageController {
  private watsonService;
  @Get()
  getResponse() {
    return 'Hello World';
  }
}
