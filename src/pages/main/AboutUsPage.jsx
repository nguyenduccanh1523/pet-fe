import React from "react";
import { useTranslation } from "react-i18next";

const AboutUsPage = () => {
  const { t } = useTranslation();
  const team = [
    {
      name: "Nguyễn Văn A",
      role: "Founder & CEO",
      avatar: "/src/assets/images/avt1.png",
    },
    {
      name: "Trần Thị B",
      role: "Chuyên gia chăm sóc thú cưng",
      avatar: "/src/assets/images/avt2.webp",
    },
    {
      name: "Lê Văn C",
      role: "Chuyên viên tư vấn sản phẩm",
      avatar: "/src/assets/images/avt3.jpg",
    },
  ];
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 mt-10 mb-16 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
        <img
          src="/src/assets/logo.png"
          alt="Pet Shop Logo"
          className="w-32 h-32 object-contain mb-4 md:mb-0 drop-shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-extrabold text-primary mb-2 dark:text-white">
            {t("aboutUsTitle")}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-2 font-medium">
            {t("aboutUsTitle1")}
          </p>
          <span className="inline-block bg-primary dark:text-white px-4 py-1 rounded-full text-sm font-semibold shadow">
            {t("aboutUsTitle2")}
          </span>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {t("aboutUs")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {t("aboutUsDes")}
        </p>
      </div>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary/10 rounded-lg p-5 text-center shadow">
          <h3 className="text-xl font-semibold text-primary mb-2 dark:text-white">{t("aboutUsMission")}</h3>
          <p className="text-gray-700 dark:text-gray-300">
            {t("aboutUsMissionDes")}
          </p>
        </div>
        <div className="bg-primary/10 rounded-lg p-5 text-center shadow">
          <h3 className="text-xl font-semibold text-primary mb-2 dark:text-white">
            {t("aboutUsCoreValues")}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 ">
            {t("aboutUsCoreValuesDes")}
          </p>
        </div>
        <div className="bg-primary/10 rounded-lg p-5 text-center shadow">
          <h3 className="text-xl font-semibold text-primary mb-2 dark:text-white">{t("aboutUsVision")}</h3>
          <p className="text-gray-700 dark:text-gray-300">
            {t("aboutUsVisionDes")}
          </p>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {t("aboutUsTeam")}
        </h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="w-48 bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-primary mb-3 shadow"
              />
              <div className="font-semibold text-lg text-gray-900 dark:text-white">
                {member.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-300">
                {member.role}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-10">
        <span className="text-primary font-bold text-lg dark:text-white">
          {t("aboutUsThankYou")}
        </span>
      </div>
    </div>
  );
};

export default AboutUsPage;
