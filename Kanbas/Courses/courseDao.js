import Course from './courseModel.js';

export const createCourse = async (data) => {
  return await Course.create(data);
};

export const getAllCourses = async () => {
  return await Course.find();
};

export const getCourseById = async (id) => {
  return await Course.findById(id);
};

export const updateCourseById = async (id, data) => {
  return await Course.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCourseById = async (id) => {
  return await Course.findByIdAndDelete(id);
};