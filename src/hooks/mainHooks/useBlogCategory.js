import { useState, useEffect } from 'react';
import { fetchBlogsCategory } from '../../api/mainAPi/blogApi';

const useBlogCategory = (page = 1, pageSize = 20) => {
  const [blogCategories, setBlogCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchBlogsCategory(page, pageSize);
        setBlogCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [page, pageSize]);

  return { blogCategories, loading, error };
};

export default useBlogCategory;
