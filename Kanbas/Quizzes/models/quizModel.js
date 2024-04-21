// src/Kanbas/Quizzes/models/quizModel.js
import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true, default: 'New Quiz' },
  description: { type: String, default: '' },
  type: { type: String, default: 'Graded Quiz' }, // Other types: Practice Quiz, Graded Survey, Ungraded Survey
  points: { type: Number, default: 0 },
  assignmentGroup: { type: String, default: 'Quizzes' }, // Other groups can be 'Exams', 'Assignments', 'Project'
  shuffleAnswers: { type: Boolean, default: true },
  timeLimit: { type: Number, default: 20 }, // Time limit in minutes
  multipleAttempts: { type: Boolean, default: false },
  showCorrectAnswers: { type: Boolean, default: false },
  accessCode: { type: String, default: '' },
  oneQuestionAtATime: { type: Boolean, default: true },
  webcamRequired: { type: Boolean, default: false },
  lockQuestionsAfterAnswering: { type: Boolean, default: false },
  dueDate: { type: Date },
  availableDate: { type: Date },
  untilDate: { type: Date },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
