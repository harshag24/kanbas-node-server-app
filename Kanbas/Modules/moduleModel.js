// Kanbas/Modules/moduleModel.js
import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  course: { type: String, ref: 'Course' }
}, { timestamps: true }, { collection: 'modules' });

const Module = mongoose.model('Module', moduleSchema);

export default Module;
