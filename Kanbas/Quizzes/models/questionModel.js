// src/Kanbas/Quizzes/models/questionModel.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  type: { type: String, required: true, enum: ['True/False', 'Multiple Choice', 'Fill in the Blanks'] },
  title: { type: String, required: true },
  questionText: { type: String, required: true },
  points: { type: Number, required: true, default: 1 },
  options: [{
    text: String,
    isCorrect: { type: Boolean, default: false }
  }], // Used for Multiple Choice and True/False types
  blanks: [String] // Used for Fill in the Blanks type
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

export default Question;
