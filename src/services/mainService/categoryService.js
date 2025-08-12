import { fetchCategories } from '../../api/mainAPi/categoryApi';

export const getCategories = async (page = 1, pageSize = 20) => {
  try {
    const categories = await fetchCategories(page, pageSize);
    return categories;
  } catch (error) {
    throw new Error('Error in categoryService: ' + error.message);
  }
};
