import Quiz from "./questionSchema.js";

export const createQuiz = async (quiz) => {
  return await Quiz.create(quiz);
};

export const findQuizzesByCourseId = async (courseId) => {
  return await Quiz.find({ courseId }).populate('questions');
};

export const findQuizById = async (id) => {
  return await Quiz.findById(id).populate('questions');
};

export const updateQuiz = async (id, quiz) => {
  return await Quiz.findByIdAndUpdate(id, quiz, { new: true });
};

export const deleteQuiz = async (id) => {
  return await Quiz.findByIdAndDelete(id);
};
