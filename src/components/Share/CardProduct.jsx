import React from "react";
import { useTranslation } from "react-i18next";
import { FaStar, FaRegHeart } from "react-icons/fa";

const CardProduct = ({
  image,
  name,
  price,
  rating = 5,
  isNew = false,
  isSale = false,
  onAddToCart,
  onFavorite,
  currency = "$",
}) => {
  const { t } = useTranslation();
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-2xl duration-200 min-w-[220px] max-w-xs mx-auto">
      {/* Badge */}
      {(isNew || isSale) && (
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-semibold z-10 ${
            isNew
              ? "bg-yellow-100 text-yellow-600 border border-yellow-300"
              : "bg-orange-100 text-orange-600 border border-orange-300"
          }`}
        >
          {isNew ? "New" : "Sale"}
        </span>
      )}
      {/* Image */}
      <div className="h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
        <img src={image} alt={name} className="object-contain h-36" />
      </div>
      {/* Info */}
      <div className="flex-1 flex flex-col px-4 py-3 gap-1">
        <h3 className="font-semibold text-base text-gray-800 dark:text-white line-clamp-2 min-h-[48px]">
          {name}
        </h3>
        <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} className={i < rating ? "" : "text-gray-300"} />
          ))}
          <span className="ml-1 text-gray-600 dark:text-gray-400 font-medium">
            {rating.toFixed(1)}
          </span>
        </div>
        <div className="font-bold text-lg text-orange-600 mt-1">
          {currency}
          {typeof price === "number" ? price.toLocaleString() : price || 0}
        </div>
      </div>
      {/* Actions */}
      <div className="flex items-center gap-2 px-4 pb-4">
        <button
          className="flex-1 bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 p-5 rounded-lg transition"
          onClick={onAddToCart}
        >
          {t("addToCart")}
        </button>
        <button
          className="p-2 rounded-lg border border-gray-200 hover:bg-orange-50 text-gray-400 hover:text-orange-400 transition"
          onClick={onFavorite}
        >
          <FaRegHeart size={20} />
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
