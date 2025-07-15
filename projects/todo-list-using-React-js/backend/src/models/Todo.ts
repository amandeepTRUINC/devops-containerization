import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo extends Document {
  description: string;
  isCompleted: boolean;
}

const TodoSchema: Schema = new Schema({
  description: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<ITodo>('Todo', TodoSchema, 'todos'); 