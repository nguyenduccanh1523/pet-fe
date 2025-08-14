import React, { useEffect, useMemo, useState } from "react";
import BlogSidebar from "../../features/BlogFeature/BlogSidebar";
import Blog from "../../features/BlogFeature/Blog";
import { useTranslation } from "react-i18next";
import useBlogCategory from "../../hooks/mainHooks/useBlogCategory";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/Share/Loading";

const BlogPage = () => {
  const { t } = useTranslation();
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const { blogCategories, loading, error } = useBlogCategory();
  const categories = blogCategories?.data || [];

  //tim cat theo slug
  const currentCategory = useMemo(() => {
    if (!categorySlug) return null;
    return categories.find(
      (cat) =>
        (cat.slug ||
          cat.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")) === categorySlug
    );
  }, [categorySlug, categories]);

  // Gom blog theo category hoặc toàn bộ
  const allBlogs = useMemo(() => {
    if (!categories.length) return [];
    if (currentCategory) {
      return currentCategory.blogs || [];
    }
    // Gom toàn bộ blog từ tất cả category
    return categories.flatMap((cat) => cat.blogs || []);
  }, [categories, currentCategory]);

  // Sắp xếp blog mới nhất lên đầu
  const sortedBlogs = useMemo(() => {
    return [...allBlogs].sort(
      (a, b) => new Date(b.published_at) - new Date(a.published_at)
    );
  }, [allBlogs]);

  // Phân trang
  const pagedBlogs = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedBlogs.slice(start, start + pageSize);
  }, [sortedBlogs, page, pageSize]);

  const pageCount = Math.ceil(sortedBlogs.length / pageSize);

  useEffect(() => {
    setPage(1);
  }, [categorySlug]);

  return (
    <div className="min-h-screen py-8 px-2 md:px-8">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-10 text-gray-800 dark:text-white tracking-tight">
        {t("blog")}
      </h1>
      <div className="container mx-auto pt-3 pb-0">
        <nav aria-label="breadcrumb">
          <ol className="flex flex-wrap items-center space-x-2 text-sm text-gray-500">
            <li>
              <a href="/" className="hover:text-orange-500 transition-colors">
                {t("home")}
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <a
                href="/blog"
                className="hover:text-orange-500 transition-colors"
              >
                {t("blog")}
              </a>
            </li>
            {currentCategory && (
              <>
                <li className="text-gray-400">/</li>
                <li className="text-gray-700 font-medium">
                  {currentCategory.name}
                </li>
              </>
            )}
          </ol>
        </nav>
      </div>
      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="md:w-1/3 w-full mb-6 md:mb-0">
          <BlogSidebar
            categories={categories.map((cat) => ({
              ...cat,
              slug:
                cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            }))}
            currentCategory={currentCategory}
            onCategoryClick={(cat) =>
              navigate(
                `/blog/category/${
                  cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                }`
              )
            }
            blogPosts={sortedBlogs}
          />
        </aside>
        {/* Blog List */}
        <main className="md:w-2/3 w-full">
          {loading && <LoadingSpinner />}
          {error && <div>Lỗi khi tải blog!</div>}
          <Blog />

          <nav aria-label="Page navigation" className="mt-4">
            <ul className="flex justify-center items-center space-x-2">
              {/* Nút trước */}
              <li>
                <button
                  className={`px-3 py-1 rounded-lg border border-gray-300 text-sm font-medium dark:text-gray-300 hover:bg-orange-500 hover:text-white transition ${
                    page === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Trước
                </button>
              </li>

              {/* Số trang */}
              {Array.from({ length: pageCount || 1 }, (_, i) => (
                <li key={i + 1}>
                  <button
                    className={`px-3 py-1 rounded-lg border text-sm dark:text-gray-300 font-medium transition ${
                      page === i + 1
                        ? "bg-orange-500 text-white border-orange-500"
                        : "border-gray-300 text-gray-700 hover:bg-orange-100"
                    }`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              {/* Nút sau */}
              <li>
                <button
                  className={`px-3 py-1 rounded-lg border border-gray-300 text-sm font-medium dark:text-gray-300 hover:bg-orange-500 hover:text-white transition ${
                    page === pageCount ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => setPage(page + 1)}
                  disabled={page === pageCount}
                >
                  Sau
                </button>
              </li>
            </ul>
          </nav>
        </main>
      </div>
    </div>
  );
};

export default BlogPage;
