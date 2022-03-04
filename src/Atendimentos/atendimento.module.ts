import { Module } from '@nestjs/common';
import { AtendimentoService } from './atendimento.service';
import { AtendimentoController } from './atendimento.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AtendimentoSchema } from 'src/Config/models/atendimento.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Atendimento', schema: AtendimentoSchema },
    ]),
    AtendimentoModule,
  ],
  controllers: [AtendimentoController],
  providers: [AtendimentoService],
  exports: [AtendimentoService],
})
export class AtendimentoModule {}
