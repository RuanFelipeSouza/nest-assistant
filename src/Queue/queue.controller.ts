import { Controller } from '@nestjs/common';
import { ServiceBusClient } from '@azure/service-bus';
import { config } from 'dotenv';
config();
@Controller('queue')
export class QueueController {}
