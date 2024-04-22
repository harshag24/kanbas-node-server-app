import Question from "./questionSchema.js";

export const createQuestion = async (question) => {
  return await Question.create(question);
};

export const findQuestionsByQuizId = async (quizId) => {
  return await Question.find({ quizId: quizId });
};

export const updateQuestion = async (id, question) => {
  return await Question.findByIdAndUpdate(id, question, { new: true });
};

export const deleteQuestion = async (id) => {
  return await Question.findByIdAndDelete(id);
};
