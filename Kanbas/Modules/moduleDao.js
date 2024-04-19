import Module from './moduleModel.js';

export const findModulesByCourseId = async (courseId) => {
  return await Module.find({ course: courseId });
};

export const createModule = async (moduleData) => {
  return await Module.create(moduleData);
};

export const deleteModuleById = async (moduleId) => {
  return await Module.findByIdAndDelete(moduleId);
};

export const updateModuleById = async (moduleId, updateData) => {
  return await Module.findByIdAndUpdate(moduleId, updateData, { new: true });
};
