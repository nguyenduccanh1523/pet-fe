import axiosInstance from "../../config/axiosConfig";

export const fetchAds = async (page = 1, pageSize = 12) => {
  const params = {
    pageSize,
    page,
    populate: "true",
    sort: "created_at:asc",
  };
  try {
    const response = await axiosInstance.get("/ads", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching ads:", error);
    throw error;
  }
};
