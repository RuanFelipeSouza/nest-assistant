import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';
import * as uuid from 'uuid';

@Injectable()
export class AtendimentoService {
  constructor(
    @InjectModel('Atendimento')
    private readonly atendimentoModel: Model<any>,
  ) {}
  async create(createAtendimentoDto: CreateAtendimentoDto) {
    return await this.atendimentoModel.create({ createAtendimentoDto });
  }

  async findAll() {
    return await this.atendimentoModel.find();
  }

  async findOne(id: number) {
    return await this.atendimentoModel.findById(id);
  }

  async update(id: number, updateAtendimentoDto: UpdateAtendimentoDto) {
    const { text, context } = updateAtendimentoDto;
    console.log(context);
    const { platform } = context;
    return await this.atendimentoModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        ...context,
        platform,
        $push: {
          messages: {
            _id: uuid.v4(),
            context: context,
            date: new Date(),
            from: 'LandingPage',
            text: text,
          },
        },
      },
      { upsert: true, omitUndefined: true, new: true },
    );
  }
  async remove(id: number) {
    return await this.atendimentoModel.findByIdAndDelete(id);
  }
}
