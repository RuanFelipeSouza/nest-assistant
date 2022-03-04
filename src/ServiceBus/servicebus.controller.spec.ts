import { Test, TestingModule } from '@nestjs/testing';
import { ServicebusController } from './servicebus.controller';
import { ServicebusService } from './servicebus.service';

describe('ServicebusController', () => {
  let controller: ServicebusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicebusController],
      providers: [ServicebusService],
    }).compile();

    controller = module.get<ServicebusController>(ServicebusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
