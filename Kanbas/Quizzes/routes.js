import * as quizDao from './quizDao.js';
import * as questionDao from './questionDao.js';
import Quiz from './quizSchema.js';
import Question from './questionSchema.js';

export default function QuizRoutes(app) {
    const createQuiz = async (req, res) => {
    const { courseId, ...quizDetails } = req.body;
    try {
        const newQuiz = new Quiz({
            ...quizDetails,
            courseId: req.params.courseId
        });
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
        console.error("Error creating quiz: ", error);
        res.status(500).send('Server error');
    }
};

    const getQuizzesByCourseId = async (req, res) => {
        const quizzes = await quizDao.findQuizzesByCourseId(req.params.courseId);
        res.json(quizzes);
    };

    const getQuizById = async (req, res) => {
        const quiz = await quizDao.findQuizById(req.params.quizId);
        if (!quiz) {
            return res.status(404).send('Quiz not found');
        }
        return res.json(quiz);
    };

    const updateQuiz = async (req, res) => {
        const updatedQuiz = await quizDao.updateQuiz(req.params.quizId, req.body);
        if (!updatedQuiz) {
            return res.status(404).send('Quiz not found');
        }
        res.json(updatedQuiz);
    };

    const deleteQuiz = async (req, res) => {
        const status = await quizDao.deleteQuiz(req.params.quizId);
        res.sendStatus(status ? 204 : 404);
    };

    const createQuestion = async (req, res) => {
        const { quizId } = req.body;
        try {
            const newQuestion = new Question({
                ...req.body,
                quizId: req.params.quizId
            });
            await newQuestion.save();
            res.status(201).json(newQuestion);
        } catch (error) {
            console.error("Error creating question: ", error);
            res.status(500).send('Server error');
        }
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

    const getQuestionsByQuizId = async (req, res) => {
        const questions = await questionDao.findQuestionsByQuizId(req.params.quizId);
        res.json(questions);
    }

    // Routes setup
    app.post('/api/courses/:courseId/quizzes', createQuiz);
    app.get('/api/courses/:courseId/quizzes', getQuizzesByCourseId);
    app.get('/api/courses/:courseId/quizzes/:quizId', getQuizById);
    app.put('/api/courses/:courseId/quizzes/:quizId', updateQuiz);
    app.delete('/api/courses/:courseId/quizzes/:quizId', deleteQuiz);
    app.post('/api/courses/:courseId/quizzes/:quizId/questions', createQuestion);
    app.put('/api/courses/:courseId/quizzes/:quizId/questions/:id', updateQuestion);
    app.delete('/api/courses/:courseId/quizzes/:quizId/questions/:id', deleteQuestion);
    app.get('/api/courses/:courseId/quizzes/:quizId/questions', getQuestionsByQuizId);
}
