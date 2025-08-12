import { useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
} from "../../services/mainService/productService";
import { useDebounce } from "use-debounce";

/**
 * Custom hook lấy danh sách sản phẩm với filter, search, sort, phân trang, debounce search.
 * @param {Object} params
 * @param {number} params.page
 * @param {number} params.pageSize
 * @param {string} params.keyword
 * @param {number|string} params.category_id
 * @param {number|string} params.brand_id
 * @param {number} params.minPrice
 * @param {number} params.maxPrice
 * @param {string} params.sort
 */
const useProduct = ({
  page = 1,
  pageSize = 20,
  keyword = "",
  category_id,
  brand_id,
  minPrice,
  maxPrice,
  sort = "created_at:desc",
} = {}) => {
  // Debounce search keyword
  const [debouncedKeyword] = useDebounce(keyword, 400);

  // Memoize query params for stable reference
  const queryParams = useMemo(
    () => ({
      page,
      pageSize,
      keyword: debouncedKeyword,
      category_id,
      brand_id,
      minPrice,
      maxPrice,
      sort,
    }),
    [
      page,
      pageSize,
      debouncedKeyword,
      category_id,
      brand_id,
      minPrice,
      maxPrice,
      sort,
    ]
  );

  // Fetch products with react-query
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () =>
      getAllProducts(
        queryParams.page,
        queryParams.pageSize,
        queryParams.keyword,
        queryParams.category_id,
        queryParams.brand_id,
        queryParams.minPrice,
        queryParams.maxPrice,
        queryParams.sort
      ),
    keepPreviousData: true,
    staleTime: 1000 * 60, // 1 phút
  });

  // Callback để thay đổi filter (ví dụ: search, sort, page...)
  const setFilter = useCallback(() => {
    // filter: { key, value }
    // Nên dùng ở component cha để truyền params mới vào hook này
  }, []);

  return {
    products: data?.data || [],
    meta: data?.meta || {},
    loading: isLoading || isFetching,
    error: isError ? error : null,
    refetch,
    setFilter, // callback để mở rộng
  };
};

export default useProduct;

