import * as courseDao from './courseDao.js';

export default function CourseRoutes(app) {
    const createCourse = async (req, res) => {
        const course = await courseDao.createCourse(req.body);
        res.json(course);
    };
    const findAllCourses = async (req, res) => {
        const courses = await courseDao.getAllCourses();
        res.json(courses);
    };
    const findCourseById = async (req, res) => {
        const course = await courseDao.getCourseById(req.params.id);
        if (!course) {
            return res.status(404).send('Course not found');
        }
        res.json(course);
    }
    const updateCourse = async (req, res) => {
        const course = await courseDao.updateCourseById(req.params.id, req.body);
        res.json(course);
    }
    const deleteCourse = async (req, res) => {
        const status = await courseDao.deleteCourseById(req.params.id);
        res.json(status);
    }

    app.post("/api/courses", createCourse);
    app.get("/api/courses", findAllCourses);
    app.get("/api/courses/:id", findCourseById);
    app.put("/api/courses/:id", updateCourse);
    app.delete("/api/courses/:id", deleteCourse);
}
