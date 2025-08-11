import React from "react";
import logo from "../../assets/logo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaInstagram,
  FaYoutube,
  FaPaperPlane,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const {t} = useTranslation();
  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + Description + Social */}
        <div className="flex flex-col items-start md:items-start gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-left max-w-xs">
            {t("newsletter")}
          </p>
          <div className="flex gap-3 mt-2">
            <a
              href="#"
              className="bg-gray-100 hover:bg-orange-400 text-gray-500 rounded-full p-2 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-gray-100 hover:bg-orange-400 text-gray-500 rounded-full p-2 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-gray-100 hover:bg-orange-400 text-gray-500 rounded-full p-2 transition"
            >
              <FaPinterestP />
            </a>
            <a
              href="#"
              className="bg-gray-100 hover:bg-orange-400 text-gray-500 rounded-full p-2 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-gray-100 hover:bg-orange-400 text-gray-500 rounded-full p-2 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {t("quickLinks")}
          </h3>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition"
          >
            {t("home")}
          </a>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition"
          >
            {t("about")}
          </a>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition"
          >
            {t("offer")}
          </a>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition"
          >
            {t("services")}
          </a>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition"
          >
            {t("contact")}
          </a>
        </div>

        {/* Help Center */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {t("helpCenter")}
          </h3>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition"
          >
            {t("faqs")}
          </a>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition"
          >
            {t("payment")}
          </a>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition"
          >
            {t("returns")}
          </a>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition"
          >
            {t("checkout")}
          </a>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition"
          >
            {t("delivery")}
          </a>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {t("ourNewsletter")}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            {t("newsletter")}
          </p>
          <form className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 border border-gray-300 dark:border-gray-700">
            <input
              type="email"
              placeholder="Enter your email here"
              className="flex-1 bg-transparent outline-none px-3 py-2 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <button
              type="submit"
              className="text-orange-500 hover:text-orange-600 p-2"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2025 Pet Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
