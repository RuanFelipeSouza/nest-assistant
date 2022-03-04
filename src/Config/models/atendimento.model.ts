import { Schema } from 'mongoose';

export const AtendimentoSchema = new Schema(
  {
    conversationId: String,
    platform: String,
    messages: [{ message: String, date: Date, context: {} }],
  },
  {
    timestamps: true,
  },
);
