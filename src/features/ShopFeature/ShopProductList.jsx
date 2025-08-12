import React, { useState } from "react";
import CardProduct from "../../components/Share/CardProduct";
import useCategory from "../../hooks/mainHooks/useCategory";
import useProduct from "../../hooks/mainHooks/useProduct";
import { useParams } from "react-router-dom";
import ChevronRight from "../../components/Share/ChevronrRight";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../components/Share/Loading";

const ShopProductList = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const { categorySlug } = useParams();
  const { categories } = useCategory(1, 20);

  const sortOptions = [
    { value: "az", label: "A-Z" },
    { value: "za", label: "Z-A" },
    { value: "priceUp", label: t("PriceUp") },
    { value: "priceDown", label: t("PriceDown") },
    { value: "newest", label: t("Newest") },
  ];
  // Xác định category id từ slug nếu có
  const findCategoryBySlug = (slug) => {
    if (!categories?.data) return undefined;
    let category = categories.data.find(
      (cat) =>
        cat.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") === slug
    );
    if (!category) {
      for (const parentCat of categories.data) {
        if (parentCat.children) {
          category = parentCat.children.find(
            (child) =>
              child.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "") === slug
          );
          if (category) break;
        }
      }
    }
    return category;
  };

  const found = categorySlug ? findCategoryBySlug(categorySlug) : undefined;

  // Gọi hook lấy sản phẩm thực tế
  const { products, loading, error } = useProduct({
    page: 1,
    pageSize: 20,
    keyword: searchTerm,
    category_id: categorySlug && found ? found._id : undefined,
    sort:
      sortBy === "az"
        ? "name:asc"
        : sortBy === "za"
        ? "name:desc"
        : sortBy === "priceUp"
        ? "price:asc"
        : sortBy === "priceDown"
        ? "price:desc"
        : "created_at:desc",
  });

  // Lấy label breadcrumb
  const getCategoryLabel = () => {
    if (!categorySlug) return t("AllProducts");
    if (!categories?.data) return t("AllProducts");
    const findCategoryBySlug = (slug) => {
      let category = categories.data.find(
        (cat) =>
          cat.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") === slug
      );
      if (!category) {
        for (const parentCat of categories.data) {
          if (parentCat.children) {
            category = parentCat.children.find(
              (child) =>
                child.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "") === slug
            );
            if (category) break;
          }
        }
      }
      return category;
    };
    const category = findCategoryBySlug(categorySlug);
    return category ? category.name : t("UnknownCategory");
  };

  return (
    <>
      <nav
        className="flex items-center gap-2 text-sm mb-6"
        aria-label="Breadcrumb"
      >
        <a
          href="/"
          className="text-gray-400 hover:text-orange-500 transition font-medium"
        >
          {t("home")}
        </a>
        <ChevronRight />
        <a
          href="/shop"
          className="text-gray-400 hover:text-orange-500 transition font-medium"
        >
          {t("shop")}
        </a>
        <ChevronRight />
        <span className="text-orange-500 font-semibold">
          {getCategoryLabel()}
        </span>
      </nav>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder={t("SearchProduct")}
          className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 min-w-[160px]"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {/* Loading/error UI */}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-center text-red-500 py-10">
          {t("LoadingError")}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10">
              {t("NoProductsFound")}
            </div>
          ) : (
            products.map((product, idx) => (
              <CardProduct
                key={product.id || product._id || idx}
                category={product.category_id?.name}
                product={product}
                image={product.images[0]?.media_id?.file_path}
                name={product.name}
                price={product.base_price}
                rating={product.rating}
                isNew={product.isNew}
                isSale={product.isSale}
                currency="$"
              />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default ShopProductList;
