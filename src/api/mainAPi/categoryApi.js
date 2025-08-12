import axiosInstance from "../../config/axiosConfig";

export const fetchCategories = async (page = 1, pageSize = 20) => {
  const params = {
    pageSize,
    page,
    populate: '*',
    sort: 'created_at:asc',
    parent_id: 'null',
  }

  try{
    const response = await axiosInstance.get('/category', { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}