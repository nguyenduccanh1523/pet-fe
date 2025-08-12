import React from "react";
import { useTranslation } from "react-i18next";

const LoadingSpinner = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="relative w-14 h-14 flex items-center justify-center">
        <span className="absolute inline-block w-full h-full rounded-full border-4 border-orange-400 border-t-transparent animate-spin"></span>
        <span className="absolute inline-block w-7 h-7 bg-orange-400 rounded-full opacity-80 animate-pulse"></span>
      </div>
      <span className="mt-4 text-orange-500 font-semibold text-lg animate-pulse">
        {t("Loading")}
      </span>
    </div>
  );
};

export default LoadingSpinner;
