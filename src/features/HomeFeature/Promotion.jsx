import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ImPriceTag } from "react-icons/im";

const promotions = [
  {
    code: "SUMMER2024",
    description: "Giảm 10% cho đơn hàng mùa hè",
    discount_type: "Percentage",
    discount_value: 10,
    start_date: "2025-06-20T06:00:00Z",
    end_date: "2025-07-20T06:00:00Z",
  },
  {
    code: "SUMMER2024",
    description: "Giảm 10% cho đơn hàng mùa hè",
    discount_type: "Percentage",
    discount_value: 10,
    start_date: "2025-06-20T06:00:00Z",
    end_date: "2025-07-20T06:00:00Z",
  }
  // Có thể thêm nhiều mã khác ở đây
];

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN");
};

const Promotion = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <section className="py-10 mt-5 bg-gradient-to-br from-orange-50 to-yellow-500 min-h-[60vh]">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 flex justify-center gap-5 mb-8 text-center">
          {t("Current Promotions")} <ImPriceTag />
        </h2>
        <div className="grid gap-6">
          {promotions.map((promo) => (
            <div
              key={promo.code}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-l-8 border-orange-400"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg font-bold text-orange-500 tracking-widest bg-orange-100 px-3 py-1 rounded-lg select-all">
                    {promo.code}
                  </span>
                  <button
                    className="ml-2 px-2 py-1 text-xs bg-orange-400 hover:bg-orange-500 text-white rounded transition"
                    onClick={() => handleCopy(promo.code)}
                  >
                    {copied === promo.code ? "Copied!" : "Copy code"}
                  </button>
                </div>
                <div className="text-gray-700 font-medium dark:text-gray-300 mb-1">
                  {promo.description}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span>
                    <b>Type:</b> {promo.discount_type}
                  </span>
                  <span>
                    <b>Value:</b>{" "}
                    {promo.discount_type === "Percentage"
                      ? `${promo.discount_value}%`
                      : promo.discount_value}
                  </span>
                  <span>
                    <b>Valid:</b> {formatDate(promo.start_date)} -{" "}
                    {formatDate(promo.end_date)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotion;
