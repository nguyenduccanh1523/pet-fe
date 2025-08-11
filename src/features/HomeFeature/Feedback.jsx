import React from "react";
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";

const feedbacks = [
  {
    name: "Anna Nguyen",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    content:
      "Dịch vụ rất tuyệt vời, sản phẩm chất lượng và giao hàng nhanh. Mình sẽ tiếp tục ủng hộ shop!",
  },
  {
    name: "Minh Tran",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    content:
      "Shop tư vấn nhiệt tình, quần áo thú cưng rất đẹp và vừa vặn. Highly recommend!",
  },
  {
    name: "Linh Pham",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    content:
      "Mình rất hài lòng với sản phẩm, sẽ giới thiệu cho bạn bè cùng mua.",
  },
];

const Feedback = () => {
  const { t } = useTranslation();
  return (
    <section className="py-12 mt-28 bg-gradient-to-br from-orange-500 to-yellow-500">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {t("Feedback")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feedbacks.map((fb, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition"
            >
              <img
                src={fb.avatar}
                alt={fb.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-orange-100 mb-4 shadow"
              />
              <h3 className="font-semibold text-lg dark:text-gray-300 text-gray-800 mb-1">
                {fb.name}
              </h3>
              <div className="flex items-center justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < fb.rating ? "text-yellow-400" : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-gray-600 italic dark:text-gray-300">"{fb.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feedback;
