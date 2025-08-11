import React from "react";
import { useTranslation } from "react-i18next";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const { t } = useTranslation();
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <input
        type="text"
        placeholder={t("searchHome")}
        className="pl-14 mt-4 pr-4 py-4 text-lg border-2 border-gray-300 rounded-full w-full focus:outline-none focus:border-blue-400 shadow-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      />
      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl mt-2 text-gray-400 pointer-events-none">
        <FiSearch />
      </span>
    </div>
  );
};

export default Search;
