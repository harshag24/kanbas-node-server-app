import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  type: { type: String, required: true, enum: ['True/False', 'Multiple Choice', 'Fill in the Blanks'] },
  title: { type: String, required: true },
  questionText: { type: String, required: true },
  points: { type: Number, required: true, default: 1 },
  options: [{
    text: String,
    isCorrect: { type: Boolean, default: false }
  }],
  blanks: [String]
}, { timestamps: true, collection: 'questions' });

const Question = mongoose.model('Question', questionSchema);
export default Question;
