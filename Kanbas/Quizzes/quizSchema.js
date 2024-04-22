import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true, default: 'New Quiz' },
  description: { type: String, default: '' },
  type: { type: String, default: 'Graded Quiz' },
  points: { type: Number, default: 0 },
  shuffleAnswers: { type: Boolean, default: true },
  timeLimit: { type: Number, default: 20 },
  multipleAttempts: { type: Boolean, default: false },
  showCorrectAnswers: { type: Boolean, default: false },
  oneQuestionAtATime: { type: Boolean, default: true },
  webcamRequired: { type: Boolean, default: false },
  dueDate: { type: Date },
  availableDate: { type: Date },
  untilDate: { type: Date },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  isPublished: { type: Boolean, default: false },
  courseId: { type: String, required: true}
}, { timestamps: true, collection: 'quizzes'});

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;
