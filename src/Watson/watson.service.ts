import { Injectable } from '@nestjs/common';
import { IamAuthenticator } from 'ibm-watson/auth';
const btoa = require('btoa');
const atob = require('atob');
const AssistantV2 = require('ibm-watson/assistant/v2');
import {
  Response,
  MessageOutput,
  MessageResponseStateless,
} from 'ibm-watson/assistant/v2';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtendimentoService } from 'src/Atendimentos/atendimento.service';

@Injectable()
export class WatsonService {
  private assitantV2;
  constructor(
    @InjectModel('Atendimento')
    private readonly atendimentoModel: Model<any>,
    private readonly atendimentoService: AtendimentoService,
  ) {
    const apikeyPassword = process.env.ASSISTANT_API_KEY;
    if (!apikeyPassword) {
      throw {
        message: 'Missing ApiKey',
      };
    }
    this.assitantV2 = new AssistantV2({
      authenticator: new IamAuthenticator({
        apikey: apikeyPassword,
      }),
      serviceUrl: process.env.ASSISTANT_SERVICE_URL,
      version: '2020-09-24',
    });
  }
  private formatResponse(response: Response<MessageResponseStateless>) {
    const state: string =
      response.result.context?.skills?.['main skill']?.system?.state;
    const userDefinedContext =
      response.result.context?.skills?.['main skill']?.user_defined;
    const parsedState = state && JSON.parse(atob(state));
    const context = {
      ...parsedState,
      ...userDefinedContext,
      user_defined: userDefinedContext,
    };
    return {
      output: this.getOutput(response.result.output),
      context,
    };
  }
  private getOutput(output: MessageOutput) {
    const assistantOutput: any = {
      ...output,
      text: output.generic
        ?.filter((genericOutput: any) => genericOutput.response_type === 'text')
        .map((e: any) => e.text)
        .join(process.env.BREAKLINE_FLAG ?? '<break>'),
    };
    return assistantOutput;
  }
  async handleMessage(message) {
    const { text, context } = message;
    const { user_defined } = context;
    const skillContext = {
      global: { session_id: context.session_id },
      skills: {
        'main skill': {
          user_defined,
          system: { state: btoa(JSON.stringify(context)) },
        },
      },
    };
    const response = await this.assitantV2.messageStateless({
      input: {
        message_type: 'text',
        text,
      },
      context: skillContext,
      assistantId: `${process.env.ASSISTANT_ID}`,
    });
    await this.atendimentoService.update(context.conversation_id, response);
    return this.formatResponse(response);
  }
}
