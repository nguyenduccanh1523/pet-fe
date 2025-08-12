import { useState, useEffect } from 'react';
import { getCategories } from '../../services/mainService/categoryService';

const useCategory = (page = 1, pageSize = 20) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories(page, pageSize);
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [page, pageSize]);

  return { categories, loading, error };
};

export default useCategory;
