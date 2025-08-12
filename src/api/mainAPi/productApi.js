import axiosInstance from "../../config/axiosConfig";

export const fetchProducts = async (
  page = 1,
  pageSize = 20,
  keyword = "",
  category_id,
  brand_id,
  minPrice,
  maxPrice,
  sort = "created_at:desc"
) => {
  const params = {
    pageSize,
    page,
    populate: "true",
    sort,
  };
  if (keyword) params.keyword = keyword;
  if (category_id) params.category_id = category_id;
  if (brand_id) params.brand_id = brand_id;
  if (minPrice) params.minPrice = minPrice;
  if (maxPrice) params.maxPrice = maxPrice;

  try {
    const response = await axiosInstance.get("/product", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
