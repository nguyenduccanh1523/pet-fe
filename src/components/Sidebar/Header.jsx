import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";
import { FiChevronDown, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const shopRef = useRef(null);
  const [pagesOpen, setPagesOpen] = useState(false);
  const pagesRef = useRef(null);

  const { t } = useTranslation();
  const location = useLocation();

  const shopCategories = [(t('food')), (t('toys')), (t('clothing'))];

  const pagesDropdown = [
    { label: t('about'), path: "/about-us" },
    { label: t('ads'), path: "/ads" },
    { label: t('brands'), path: "/brands" },
    { label: t('stores'), path: "/stores" },
    { label: t('services'), path: "/services" },
    { label: t('recruitments'), path: "/recruitments" },
    { label: t('promotion'), path: "/promotion" },
    { label: t('faqs'), path: "/faqs" },
  ];

  const getActiveNavItem = (pathname) => {
    if (pathname === "/") return "home";
    if (pathname === "/shop") return "shop";
    if (pathname === "/blog") return "blog";
    if (pathname === "/contact") return "contact";
    if (pathname === "/supports") return "supports";
    return "";
  };
  const activeNavItem = getActiveNavItem(location.pathname);

  // Outside click for Shop
  useEffect(() => {
    if (!shopOpen) return;
    function handleClickOutside(e) {
      if (shopRef.current && !shopRef.current.contains(e.target)) {
        setShopOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [shopOpen]);

  // Outside click for Pages
  useEffect(() => {
    if (!pagesOpen) return;
    function handleClickOutside(e) {
      if (pagesRef.current && !pagesRef.current.contains(e.target)) {
        setPagesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [pagesOpen]);

  return (
    <div className="mt-4 w-full p-4 bg-gradient-to-r from-orange-400 to-yellow-700 shadow-sm z-50 sticky top-0 rounded-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 md:py-0">
        {/* Left: Shop */}
        <div className="relative group" ref={shopRef}>
          <button
            className="flex items-center gap-1 text-orange-100 font-medium py-3 px-2 hover:text-orange-500 hover:bg-orange-50 rounded transition"
            onClick={() => setShopOpen((prev) => !prev)}
          >
            {t('shopbycategory')} <FiChevronDown className="ml-1" />
          </button>
          {shopOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded shadow-lg py-2 z-20">
              {shopCategories.map((cat) => (
                <Link
                  key={cat}
                  to={`/shop/${cat.toLowerCase()}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-500 transition"
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Middle: Nav (Desktop) */}
        <nav className="hidden md:block">
          <ul className="flex pt-4 items-center gap-10">
            <li>
              <Link
                to="/"
                className={`hover:text-orange-100 transition ${
                  activeNavItem === "home"
                    ? "text-orange-100 border-b-2 border-orange-200"
                    : ""
                }`}
              >
                {t('home')}
              </Link>
            </li>
            {/* Pages dropdown */}
            <li className="relative" ref={pagesRef}>
              <button
                className="flex items-center gap-1 hover:text-orange-100 transition"
                onClick={() => setPagesOpen((prev) => !prev)}
              >
                {t('pages')} <FiChevronDown className="ml-1" />
              </button>
              {pagesOpen && (
                <div className="absolute mt-2 bg-white rounded shadow-lg py-2 w-48 z-20">
                  {pagesDropdown.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-500 transition"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link
                to="/shop"
                className={`hover:text-orange-100 transition ${
                  activeNavItem === "shop"
                    ? "text-orange-100 border-b-2 border-orange-200"
                    : ""
                }`}
              >
                {t('shop')}
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={`hover:text-orange-100 transition ${
                  activeNavItem === "blog"
                    ? "text-orange-100 border-b-2 border-orange-200"
                    : ""
                }`}
              >
                {t('blog')}
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`hover:text-orange-100 transition ${
                  activeNavItem === "contact"
                    ? "text-orange-100 border-b-2 border-orange-200"
                    : ""
                }`}
              >
                {t('contact')}
              </Link>
            </li>
            <li>
              <Link
                to="/supports"
                className={`hover:text-orange-100 transition ${
                  activeNavItem === "supports"
                    ? "text-orange-100 border-b-2 border-orange-200"
                    : ""
                }`}
              >
                {t('supports')}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-orange-300 hover:bg-orange-400 text-white font-semibold px-4 py-2 rounded-full text-sm transition">
            <FiUser className="text-lg" /> {t('login')} / {t('register')}
          </button>
          <button className="relative">
            <FiHeart className="text-2xl text-gray-100 hover:text-orange-400 transition" />
          </button>
          <button className="relative">
            <FiShoppingCart className="text-2xl text-gray-100 hover:text-orange-400 transition" />
            <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs rounded-full px-1.5">
              03
            </span>
          </button>

          {/* Mobile Toggle */}
          <div className="md:hidden ml-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded bg-orange-100 text-orange-500"
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 space-y-2">
          {/* Shop in mobile */}
          <div className="relative">
            <button
              className="flex items-center gap-1 text-orange-400 font-medium py-2 px-2 w-full text-left"
              onClick={() => setShopOpen((prev) => !prev)}
            >
              Shop by Category <FiChevronDown className="ml-1" />
            </button>
            {shopOpen && (
              <div className="mt-1 w-full bg-white rounded shadow py-2 z-20">
                {shopCategories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/shop/${cat.toLowerCase()}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-500 transition"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Pages in mobile */}
          <div ref={pagesRef}>
            <button
              className="flex items-center gap-1 w-full text-left py-2 px-2 hover:text-orange-500 transition"
              onClick={() => setPagesOpen((prev) => !prev)}
            >
              Pages <FiChevronDown className="ml-1" />
            </button>
            {pagesOpen && (
              <div className="mt-1 w-full bg-white rounded shadow py-2 z-20">
                {pagesDropdown.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="block px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-500 transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Other links */}
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className="block py-2 px-2 hover:text-orange-500 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="block py-2 px-2 hover:text-orange-500 transition"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="block py-2 px-2 hover:text-orange-500 transition"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-2 hover:text-orange-500 transition"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/supports"
                className="block py-2 px-2 hover:text-orange-500 transition"
              >
                Supports
              </Link>
            </li>
          </ul>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 mt-4">
            <button className="flex items-center gap-2 bg-orange-300 hover:bg-orange-400 text-white font-semibold px-4 py-2 rounded-full text-sm transition w-full justify-center">
              <FiUser className="text-lg" /> Đăng nhập / Đăng ký
            </button>
            <button className="relative">
              <FiHeart className="text-2xl text-gray-500 hover:text-orange-400 transition" />
            </button>
            <button className="relative">
              <FiShoppingCart className="text-2xl text-gray-500 hover:text-orange-400 transition" />
              <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs rounded-full px-1.5">
                03
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
