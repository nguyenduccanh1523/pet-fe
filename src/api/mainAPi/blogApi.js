import axiosInstance from "../../config/axiosConfig";


export const fetchBlogsCategory = async (page = 1, pageSize = 20) => {
  const params = {
    pageSize,
    page,
    populate: 'true',
    sort: 'created_at:asc',
  }

  try{
    const response = await axiosInstance.get('/blog-categories', { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}