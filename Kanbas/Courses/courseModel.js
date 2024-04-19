import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  number: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  image: { type: String, required: true }
}, { timestamps: true }, { collection: 'courses' });

const Course = mongoose.model('Course', courseSchema);

export default Course;
