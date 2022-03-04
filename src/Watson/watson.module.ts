import { WatsonController } from './watson.controller';
import { Module } from '@nestjs/common';
import { WatsonService } from './watson.service';
import { AtendimentoSchema } from '../Config/models/atendimento.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AtendimentoModule } from 'src/Atendimentos/atendimento.module';
import { AtendimentoService } from 'src/Atendimentos/atendimento.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Atendimento', schema: AtendimentoSchema },
    ]),
    AtendimentoModule,
  ],
  controllers: [WatsonController],
  providers: [WatsonService, AtendimentoService],
  exports: [WatsonService],
})
export class WatsonModule {}
