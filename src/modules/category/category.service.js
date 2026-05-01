import Category from '../../DB/models/category.model.js';

export const createCategoryService = async (data) => {
  return await Category.create(data);
};

export const getCategoriesService = async () => {
  return await Category.find();
};

export const deleteCategoryService = async (categoryId) => {
  return await Category.findByIdAndDelete(categoryId);
};
