import express from 'express';
import Quiz from './models/quizModel.js';
import Question from './models/questionModel.js';

const router = express.Router();

// Create a new quiz under a specific course
router.post('/courses/:courseId/quizzes', async (req, res) => {
    try {
        const { courseId } = req.params;
        const newQuiz = new Quiz({ ...req.body});
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all quizzes for a specific course
router.get('/courses/:courseId/quizzes', async (req, res) => {
    try {
        const { courseId } = req.params;
        const quizzes = await Quiz.find({ courseId }).populate('questions');
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single quiz by ID under a specific course
router.get('/courses/:courseId/quizzes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const quiz = await Quiz.findById(id).populate('questions');
        if (!quiz) {
            return res.status(404).send('Quiz not found');
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a quiz
router.put('/courses/:courseId/quizzes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedQuiz = await Quiz.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedQuiz) {
            return res.status(404).send('Quiz not found');
        }
        res.json(updatedQuiz);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a quiz
router.delete('/courses/:courseId/quizzes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Quiz.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a question to a quiz
router.post('/courses/:courseId/quizzes/:quizId/questions', async (req, res) => {
    try {
        const { quizId } = req.params;
        const newQuestion = new Question({ ...req.body, quiz: quizId });
        await newQuestion.save();
        await Quiz.findByIdAndUpdate(quizId, { $push: { questions: newQuestion._id } });
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a question
router.put('/questions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedQuestion) {
            return res.status(404).send('Question not found');
        }
        res.json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a question
router.delete('/questions/:id', async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
