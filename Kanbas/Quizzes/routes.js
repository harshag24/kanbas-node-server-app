import * as quizDao from './quizDao.js';
import * as questionDao from './questionDao.js';

export default function QuizRoutes(app) {
    const createQuiz = async (req, res) => {
        const newQuiz = await quizDao.createQuiz({ ...req.body, courseId: req.params.courseId });
        res.status(201).json(newQuiz);
    };

    const getQuizzesByCourseId = async (req, res) => {
        const quizzes = await quizDao.findQuizzesByCourseId(req.params.courseId);
        res.json(quizzes);
    };

    const getQuizById = async (req, res) => {
        const quiz = await quizDao.findQuizById(req.params.id);
        if (!quiz) {
            return res.status(404).send('Quiz not found');
        }
        res.json(quiz);
    };

    const updateQuiz = async (req, res) => {
        const updatedQuiz = await quizDao.updateQuiz(req.params.id, req.body);
        if (!updatedQuiz) {
            return res.status(404).send('Quiz not found');
        }
        res.json(updatedQuiz);
    };

    const deleteQuiz = async (req, res) => {
        const status = await quizDao.deleteQuiz(req.params.id);
        res.sendStatus(status ? 204 : 404);
    };

    const createQuestion = async (req, res) => {
        const newQuestion = await questionDao.createQuestion({ ...req.body, quiz: req.params.quizId });
        res.status(201).json(newQuestion);
    };

    const updateQuestion = async (req, res) => {
        const updatedQuestion = await questionDao.updateQuestion(req.params.id, req.body);
        if (!updatedQuestion) {
            return res.status(404).send('Question not found');
        }
        res.json(updatedQuestion);
    };

    const deleteQuestion = async (req, res) => {
        const status = await questionDao.deleteQuestion(req.params.id);
        res.sendStatus(status ? 204 : 404);
    };

    // Routes setup
    app.post('/api/courses/:courseId/quizzes', createQuiz);
    app.get('/api/courses/:courseId/quizzes', getQuizzesByCourseId);
    app.get('/api/courses/:courseId/quizzes/:id', getQuizById);
    app.put('/api/courses/:courseId/quizzes/:id', updateQuiz);
    app.delete('/api/courses/:courseId/quizzes/:id', deleteQuiz);
    app.post('/api/quizzes/:quizId/questions', createQuestion);
    app.put('/api/questions/:id', updateQuestion);
    app.delete('/api/questions/:id', deleteQuestion);
}
