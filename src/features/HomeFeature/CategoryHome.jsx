import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  PiDogBold,
  PiFishFill,
  PiBowlFoodBold,
  PiBirdFill,
  PiCatBold,
} from "react-icons/pi";

const CategoryHome = () => {
  const {t} = useTranslation();
  const [active, setActive] = useState(2); // Dog Shop mặc định active

  const categories = [
    {
      label: t("Foodies"),
      icon: <PiBowlFoodBold size={56} />,
    },
    {
      label: t("Bird Shop"),
      icon: <PiBirdFill size={56} />,
    },
    {
      label: t("Dog Shop"),
      icon: <PiDogBold size={56} />,
    },
    {
      label: t("Fish Shop"),
      icon: <PiFishFill size={56} />,
    },
    {
      label: t("Cat Shop"),
      icon: <PiCatBold size={56} />,
    },
  ];
  return (
    <div className="container mx-auto px-4 py-12">
      <ul className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {categories.map((cat, idx) => (
          <li
            key={cat.label}
            className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-200 rounded-3xl py-8 px-2 md:px-0
              ${
                active === idx
                  ? "bg-orange-50 shadow-2xl scale-105 z-10"
                  : "bg-transparent hover:bg-orange-50 hover:shadow-xl hover:scale-105"
              }
            `}
            style={{
              boxShadow:
                active === idx
                  ? "0 8px 32px 0 rgba(251, 191, 36, 0.12)"
                  : undefined,
            }}
            onMouseEnter={() => setActive(idx)}
            onFocus={() => setActive(idx)}
            tabIndex={0}
          >
            <span
              className={`mb-4 text-amber-300 ${
                active === idx ? "drop-shadow-lg" : ""
              }`}
            >
              {cat.icon}
            </span>
            <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
              {cat.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryHome;
