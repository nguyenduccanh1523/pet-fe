import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const BlogSidebar = ({
  // blogPosts,
  categories,
  currentCategory,
  onCategoryClick,
}) => {
  const { t } = useTranslation();
  return (
    <aside className="bg-gradient-to-b from-orange-100 to-purple-200 rounded-xl shadow-md p-6 sticky top-6">
      {/* Author */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="/vite.svg"
          alt="avatar"
          className="w-20 h-20 rounded-full border-4 border-blue-200 mb-3"
        />
        <h2 className="font-semibold text-lg text-gray-800">Pet Blog Team</h2>
        <p className="text-gray-500 text-sm">
          Chia sẻ kiến thức & kinh nghiệm nuôi thú cưng
        </p>
      </div>
      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Tìm kiếm bài viết..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-6">{t("category")}</h3>
        <ul className="space-y-6">
          {categories.map((cat) => (
            <li key={cat._id}>
              <Link
                to={`/blog/category/${cat.slug}`}
                className={`w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 transition text-gray-600 hover:text-blue-600 font-medium ${currentCategory?._id === cat._id ? "bg-blue-100 text-blue-600" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  onCategoryClick(cat);
                }}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default BlogSidebar;
