
import { fetchProducts} from "../../api/mainAPi/productApi";

export const getAllProducts = async (page, pageSize, keyword, category_id, brand_id, minPrice, maxPrice, sort) => {
  try {
    const response = await fetchProducts(page, pageSize, keyword, category_id, brand_id, minPrice, maxPrice, sort);
    return response;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

