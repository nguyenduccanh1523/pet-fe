import React from "react";
import { useTranslation } from "react-i18next";
import { FiShoppingCart, FiUserCheck, FiTag, FiAward } from "react-icons/fi";

const Service = () => {
  const {t} = useTranslation();
  const services = [
    {
      icon: <FiShoppingCart size={40} className="text-orange-400" />,
      title: t("Free Delivery"),
      desc: t("DesFreeDelivery"),
    },
    {
      icon: <FiUserCheck size={40} className="text-orange-400" />,
      title: t("Secure Payment"),
      desc: t("DesSecurePayment"),
    },
    {
      icon: <FiTag size={40} className="text-orange-400" />,
      title: t("Daily Offer"),
      desc: t("DesDailyOffer"),
    },
    {
      icon: <FiAward size={40} className="text-orange-400" />,
      title: t("Quality Guarantee"),
      desc: t("DesQualityGuarantee"),
    },
  ];
  return (
    <section className="py-14 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {services.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-orange-50 mb-6 border border-orange-100">
                {s.icon}
              </div>
              <h3 className="text-2xl font-[cursive] font-bold dark:text-gray-200 text-gray-800 mb-2">
                {s.title}
              </h3>
              <p className="text-gray-400 text-base leading-relaxed dark:text-gray-300">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
