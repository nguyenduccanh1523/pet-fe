import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.png"; // Adjust the path as necessary
import Search from "../Search/Search";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/ThemeContext";
import Flag from "react-world-flags";
import ChevronDown from "../Search/ChevronDown";
import DarkMode from "../Search/DarkMode";
import LightMode from "../Search/LightMode";
import { FaArrowUp } from "react-icons/fa";

const Title = () => {
  const [showScroll, setShowScroll] = useState(false);
  const { dark, setDark } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [openLanguage, setOpenLanguage] = useState(false);
  const currentLanguage = i18n.language;

  const handleLanguageChange = async (lang) => {
    await i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setOpenLanguage(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 w-full">
        <img
          src={logo}
          alt="Pet Adoption Logo"
          className="h-16 w-40 pt-4 mx-auto md:mx-0"
        />
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 w-full">
          <Search />
          <div className="flex flex-col md:items-end text-center md:text-right w-full md:w-auto">
            <span className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300">
              {t("phone")}:{" "}
              <a
                href="tel:0123456789"
                className="text-blue-600 hover:underline"
              >
                0123 456 789
              </a>
            </span>
            <span className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Email:{" "}
              <a
                href="mailto:info@petadoption.com"
                className="text-blue-600 hover:underline"
              >
                info@petadoption.com
              </a>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 md:items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => setOpenLanguage(!openLanguage)}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {currentLanguage === "vi" ? (
                <Flag code="VN" style={{ width: 20, height: 14 }} />
              ) : (
                <Flag code="GB" style={{ width: 20, height: 14 }} />
              )}
              {currentLanguage.toUpperCase()}
              <ChevronDown />
            </button>

            {openLanguage && (
              <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded shadow-lg z-[100]">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white flex items-center gap-2"
                >
                  <Flag code="GB" style={{ width: 20, height: 14 }} /> English
                </button>
                <button
                  onClick={() => handleLanguageChange("vi")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white flex items-center gap-2"
                >
                  <Flag code="VN" style={{ width: 20, height: 14 }} /> Tiếng
                  Việt
                </button>
              </div>
            )}
          </div>

          {/* Nút toggle dark/light mode đẹp */}
          <button
            onClick={() => setDark(!dark)}
            className={`ml-2 flex items-center px-3 py-2 rounded-full transition-colors duration-300 focus:outline-none shadow ${
              dark
                ? "bg-gray-800 text-yellow-400"
                : "bg-yellow-400 text-gray-800"
            }`}
            aria-label="Toggle dark mode"
          >
            {dark ? <DarkMode /> : <LightMode />}
            {dark ? "Dark" : "Light"}
          </button>
        </div>
      </div>
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 transition-all z-50"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

export default Title;
