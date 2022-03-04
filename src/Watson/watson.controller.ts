import { Body, Controller, Post } from '@nestjs/common';
import { WatsonService } from './watson.service';

@Controller('watson')
export class WatsonController {
  constructor(private readonly watsonService: WatsonService) {}
  @Post('/message')
  async sendMessage(@Body() message: any) {
    const response = await this.watsonService.handleMessage(message);
    console.log('response', response);
    return response.output.generic[0].text;
  }
}
