import { Injectable } from '@nestjs/common';
import { delay, ServiceBusClient } from '@azure/service-bus';
@Injectable()
export class ServicebusService {
  private readonly connnectionString: string;
  private readonly queueName: string;
  constructor() {
    this.connnectionString =
      'Endpoint=sb://kia-dynamicscrm-intelliway.servicebus.windows.net/;SharedAccessKeyName=intelliway;SharedAccessKey=ZxBocjbrS/EJ9Zm3bIocCokofaLjmUc09wS8Pjgp5GE=;EntityPath=';
    this.queueName = 'intelliway-teste';
  }

  async receive() {
    const sbClient = new ServiceBusClient(this.connnectionString);
    const receiver = sbClient.createReceiver(this.queueName);
    const myMessageHandler = async (messageReceived) => {
      console.log(`Received message: ${messageReceived.body}`);
    };
    const myErrorHandler = async (error) => {
      console.log(error);
    };
    receiver.subscribe({
      processMessage: myMessageHandler,
      processError: myErrorHandler,
    });
    await delay(20000);
    await receiver.close();
    await sbClient.close();
  }

  async sendToQueue() {
    const messages = [
      { body: 'Albert Einstein' },
      { body: 'Werner Heisenberg' },
      { body: 'Marie Curie' },
      { body: 'Steven Hawking' },
      { body: 'Isaac Newton' },
      { body: 'Niels Bohr' },
      { body: 'Michael Faraday' },
      { body: 'Galileo Galilei' },
      { body: 'Johannes Kepler' },
      { body: 'Nikolaus Kopernikus' },
    ];
    const sbClient = new ServiceBusClient(this.connnectionString);
    try {
      const sender = sbClient.createSender(this.queueName);
      let batch = await sender.createMessageBatch();
      for (let i = 0; i < messages.length; i++) {
        if (!batch.tryAddMessage(messages[i])) {
          await sender.sendMessages(batch);
          batch = await sender.createMessageBatch();
          if (!batch.tryAddMessage(messages[i])) {
            throw new Error('Message too big to fit in a batch');
          }
        }
      }
      await sender.sendMessages(batch);
      console.log(`Sent a batch of messages to the queue: ${this.queueName}`);
      await sender.close();
    } finally {
      await sbClient.close();
    }
  }
}
