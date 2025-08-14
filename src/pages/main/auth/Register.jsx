import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { registerUser } from "../../../api/mainAPi/authApi";

const Register = () => {
  const { t } = useTranslation();
  const negative = useNavigate()
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      await registerUser({ email, password, confirmPassword });
      toast.success("Registration successful");
      negative("/login");
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Registration failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-orange-50">
      {/* Header with logo */}
      <header className="flex justify-center items-center py-8">
        <img src={logo} alt="Waggy Pet Shop Logo" className="h-14 mr-3" />
        <span className="text-3xl font-bold text-orange-500 tracking-wide">
          {t("register")}
        </span>
      </header>

      {/* Register Form */}
      <main className="flex flex-1 justify-center items-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">
            {t("registerDetail")}
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                {t("loginPassword")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
                  placeholder={t("loginPassword")}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-orange-500 focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={
                    showPassword
                      ? t("hidePassword") || "Ẩn mật khẩu"
                      : t("showPassword") || "Hiện mật khẩu"
                  }
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                {t("registerConfirmPassword")}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
                  placeholder={t("registerConfirmPassword")}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-orange-500 focus:outline-none"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={
                    showConfirmPassword
                      ? t("hidePassword") || "Ẩn mật khẩu"
                      : t("showPassword") || "Hiện mật khẩu"
                  }
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition"
            >
              {loading ? t("registering") : t("register")}
            </button>
          </form>
          <div className="flex justify-center items-center mt-4 text-sm">
            <span>
              {t("registerButton")}{" "}
              <Link
                to="/login"
                className="text-orange-500 hover:underline font-semibold"
              >
                {t("login")}
              </Link>
            </span>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <span className="text-gray-400 text-xs">{t("registerSocial")}</span>
          </div>
          <div className="flex justify-center gap-4 mt-3">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              <FaFacebookF className="text-lg" /> Facebook
            </button>
            <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition">
              <FaGoogle className="text-lg" /> Google
            </button>
          </div>
        </div>
      </main>

      {/* Footer giống Shopee, chỉnh sửa cho shop thú cưng */}
      <footer className="bg-white border-t mt-10 py-8 text-gray-600 text-sm">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
          <div>
            <h3 className="font-bold mb-2 text-gray-800">
              {t("customerService")}
            </h3>
            <ul className="space-y-1">
              <li>{t("helpCenter")}</li>
              <li>{t("howToBuy")}</li>
              <li>{t("returnPolicy")}</li>
              <li>{t("supports")}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-gray-800">{t("aboutUs")}</h3>
            <ul className="space-y-1">
              <li>{t("about")}</li>
              <li>{t("recruitment")}</li>
              <li>{t("blog")}</li>
              <li>{t("privacyPolicy")}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-gray-800">{t("followUs")}</h3>
            <ul className="space-y-1">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>TikTok</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-gray-800">
              {t("downloadApp")} Waggy
            </h3>
            <div className="flex gap-2 mt-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_logo_black.svg"
                alt="App Store"
                className="h-6"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-6"
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-8 text-xs text-gray-400">
          © 2025 Waggy Pet Shop. {t("allRightsReserved")}
        </div>
      </footer>
    </div>
  );
};

export default Register;
