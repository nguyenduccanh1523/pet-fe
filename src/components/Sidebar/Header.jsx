import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FiChevronDown, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/authSlice";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const shopRef = useRef(null);
  const [pagesOpen, setPagesOpen] = useState(false);
  const pagesRef = useRef(null);
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const shopCategories = [t("food"), t("toys"), t("clothing")];

  const pagesDropdown = [
    { label: t("about"), path: "/about-us" },
    { label: t("ads"), path: "/ads" },
    { label: t("brands"), path: "/brands" },
    { label: t("stores"), path: "/stores" },
    { label: t("services"), path: "/services" },
    { label: t("recruitments"), path: "/recruitments" },
    { label: t("promotion"), path: "/promotion" },
    { label: t("faqs"), path: "/faqs" },
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

  // Dropdown for user actions
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);

  // Close user dropdown on outside click
  useEffect(() => {
    if (!userDropdownOpen) return;
    function handleClickOutside(e) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target)
      ) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userDropdownOpen]);

  // Helper: get user role
  const getRole = (user) => {
    if (!user) return null;
    if (user.role === "admin") return "admin";
    if (user.role === "shop_owner") return "shop_owner";
    return "user";
  };
  const userRole = getRole(user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="mt-4 w-full p-4 bg-gradient-to-r from-orange-400 to-yellow-700 shadow-sm z-50 sticky top-0 rounded-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 md:py-0">
        {/* Left: Shop */}
        <div className="relative group" ref={shopRef}>
          <button
            className="flex items-center gap-1 text-orange-100 font-medium py-3 px-2 hover:text-orange-500 hover:bg-orange-50 rounded transition"
            onClick={() => setShopOpen((prev) => !prev)}
          >
            {t("shopbycategory")} <FiChevronDown className="ml-1" />
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
                {t("home")}
              </Link>
            </li>
            {/* Pages dropdown */}
            <li className="relative" ref={pagesRef}>
              <button
                className="flex items-center gap-1 hover:text-orange-100 transition"
                onClick={() => setPagesOpen((prev) => !prev)}
              >
                {t("pages")} <FiChevronDown className="ml-1" />
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
                {t("shop")}
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
                {t("blog")}
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
                {t("contact")}
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
                {t("supports")}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 hidden md:flex">
          {!user ? (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-orange-300 hover:bg-orange-400 text-white font-semibold px-4 py-2 rounded-full text-sm transition"
            >
              <FiUser className="text-lg" /> {t("login")} / {t("register")}
            </Link>
          ) : (
            <div className="relative" ref={userDropdownRef}>
              <button
                className="flex items-center gap-2 bg-orange-300 hover:bg-orange-100 text-orange-500 font-semibold px-3 py-2 rounded-full text-sm transition border border-orange-200"
                onClick={() => setUserDropdownOpen((prev) => !prev)}
              >
                {/* Avatar bo tròn với ký tự đầu username */}
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-300 text-white font-bold text-lg">
                  {user.avatar_id ? (
                    <img
                      src={user.avatar_id.file_path}
                      alt="User Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <FiUser />
                  )}
                </span>
                <span className="max-w-[100px] truncate">
                  {user.username || "User"}
                </span>
                <FiChevronDown />
              </button>
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded shadow-lg py-2 z-30 min-w-[180px]">
                  {/* User role display */}
                  <div className="px-4 py-2 text-xs text-gray-500 border-b mb-1">
                    {userRole === "admin" && (
                      <span className="font-bold text-orange-500">
                        {t("admin")}
                      </span>
                    )}
                    {userRole === "shop_owner" && (
                      <span className="font-bold text-orange-500">
                        {t("shopOwner")}
                      </span>
                    )}
                    {userRole === "user" && (
                      <span className="font-bold text-orange-500">
                        {t("customer")}
                      </span>
                    )}
                  </div>
                  {/* Dropdown items by role */}
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-500 transition"
                  >
                    {t("profile")}
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-500 transition"
                  >
                    {t("orders")}
                  </Link>
                  {userRole === "shop_owner" && (
                    <Link
                      to="/shop-management"
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-500 transition"
                    >
                      {t("shopManagement")}
                    </Link>
                  )}
                  {userRole === "admin" && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-500 transition"
                    >
                      {t("admin")}
                    </Link>
                  )}
                  <div className="border-t mt-2 pt-2 px-4">
                    <button
                      className="w-full text-left text-red-500 hover:underline"
                      onClick={handleLogout}
                    >
                      {t("logout")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          <button className="relative">
            <FiHeart className="text-2xl text-gray-100 hover:text-orange-400 transition" />
          </button>
          <button className="relative">
            <FiShoppingCart className="text-2xl text-gray-100 hover:text-orange-400 transition" />
            <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs rounded-full px-1.5">
              03
            </span>
          </button>
        </div>
        {/* Mobile Toggle - luôn hiển thị trên mobile */}
        <div className="md:hidden ml-2 flex-shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded bg-orange-100 text-orange-500"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 space-y-2">

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
          <div className="flex items-center gap-4 mt-4 flex md:hidden">
            {!user ? (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-orange-300 hover:bg-orange-400 text-white font-semibold px-4 py-2 rounded-full text-sm transition w-full justify-center"
              >
                <FiUser className="text-lg" /> {t("login")} / {t("register")}
              </Link>
            ) : (
              <div className="relative w-full" ref={userDropdownRef}>
                <button
                  className="flex items-center gap-2 bg-white hover:bg-orange-100 text-orange-500 font-semibold px-3 py-2 rounded-full text-sm transition border border-orange-200 w-full justify-center "
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-300 text-white font-bold text-lg">
                    {user.avatar_id ? (
                      <img
                        src={user.avatar_url}
                        alt={user.username}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <FiUser />
                    )}
                  </span>
                  <span className="max-w-[100px] truncate">
                    {user.username || "User"}
                  </span>
                  <FiChevronDown />
                </button>
                {userDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-full bg-white rounded shadow-lg py-2 z-30 min-w-[180px]">
                    <div className="px-4 py-2 text-xs text-gray-500 border-b mb-1">
                      {userRole === "admin" && (
                        <span className="font-bold text-orange-500">
                          {t("admin")}
                        </span>
                      )}
                      {userRole === "shop_owner" && (
                        <span className="font-bold text-orange-500">
                          {t("shopOwner")}
                        </span>
                      )}
                      {userRole === "user" && (
                        <span className="font-bold text-orange-500">
                          {t("customer")}
                        </span>
                      )}
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-500 transition"
                    >
                      {t("profile")}
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-500 transition"
                    >
                      {t("orders")}
                    </Link>
                    {userRole === "shop_owner" && (
                      <Link
                        to="/shop-management"
                        className="block px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-500 transition"
                      >
                        {t("shopManagement")}
                      </Link>
                    )}
                    {userRole === "admin" && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-500 transition"
                      >
                        {t("admin")}
                      </Link>
                    )}
                    <div className="border-t mt-2 pt-2 px-4">
                      <button className="w-full text-left text-red-500 hover:underline">
                        {t("logout")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
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
