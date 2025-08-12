import React from "react";
import useCategory from "../../hooks/mainHooks/useCategory";
import LoadingSpinner from "../../components/Share/Loading";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useParams } from "react-router-dom";

const ShopSidebar = ({ onSelectCategory }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { categories, loading, error } = useCategory(1, 20);
  const { categorySlug } = useParams();

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  const hasChildren = (category) =>
    Array.isArray(category.children) && category.children.length > 0;

  const getTotalProducts = (category) => {
    let count = Array.isArray(category.products) ? category.products.length : 0;
    // if (hasChildren(category)) {
    //   count += category.children.reduce(
    //     (sum, child) => sum + getTotalProducts(child),
    //     0
    //   );
    // }
    return count;
  };

  const getSlug = (cat) =>
    cat.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleCategoryClick = (cat) => {
    const slug = getSlug(cat);
    navigate(`/shop/${slug}`);
    if (onSelectCategory) onSelectCategory(slug);
  };

  // Đệ quy render category và children, đảm bảo key duy nhất cho mỗi cấp
  const renderCategory = (cat, level = 0, parentKey = "") => {
    // Fallback for missing id: use name + level + parentKey
    const safeId =
      cat.id !== undefined && cat.id !== null
        ? cat.id
        : `noid-${cat.name || "noname"}-${level}`;
    const key = parentKey ? `${parentKey}-${safeId}` : `${safeId}`;
    const slug = getSlug(cat);
    const isActive = categorySlug === slug;
    return (
      <li key={key} className={level === 0 ? "mb-1" : "mt-1 ml-4"}>
        <button
          className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition font-medium text-sm ${
            isActive
              ? "bg-orange-200 dark:bg-orange-100 text-orange-600 ring-2 ring-orange-400 hover:bg-orange-950 dark:hover:bg-orange-950 font-bold"
              : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
          } ${level > 0 ? "pl-6 text-xs" : ""}`}
          onClick={() => handleCategoryClick(cat)}
        >
          <span className="flex-1 text-left truncate">{cat.name}</span>
          <span className="ml-2 bg-orange-50 text-orange-500 rounded px-2 py-0.5 text-xs font-semibold">
            {getTotalProducts(cat)}
          </span>
        </button>
        {hasChildren(cat) && (
          <ul className="ml-2 border-l border-orange-100 dark:border-gray-700 pl-2 mt-1">
            {cat.children.map((child) => renderCategory(child, level + 1, key))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 h-fit sticky top-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <span className="inline-block w-2 h-5 bg-orange-400 rounded-sm"></span>
        {t("category")}
      </h2>
      <ul className="space-y-1">
        {Array.isArray(categories.data) &&
          categories.data.map((cat) => renderCategory(cat))}
      </ul>
    </aside>
  );
};

export default ShopSidebar;
