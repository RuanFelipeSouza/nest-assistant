export class CreateAtendimentoDto {
  conversationId: string;
  text: string;
  platform: string;
  messages: [{ _id: string; context: {}; date: Date; text: string }];
  context;
}
