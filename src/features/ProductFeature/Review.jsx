import React from "react";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Nguyễn Văn A",
    rating: 5,
    comment: "Sản phẩm rất tốt, cún nhà mình rất thích, shop giao hàng nhanh!",
    date: "12/06/2024",
  },
  {
    name: "Trần Thị B",
    rating: 5,
    comment: "Đóng gói cẩn thận, chất lượng ổn, sẽ ủng hộ tiếp!",
    date: "10/06/2024",
  },
];

const Review = () => {
  return (
    <section className="">
      <h3 className="text-lg font-bold text-orange-600 mb-4">
        Đánh giá sản phẩm
      </h3>
      <div className="flex flex-col gap-6">
        {reviews.map((review, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 font-semibold text-gray-800 mb-1">
              <span className="text-base font-bold text-orange-600">
                {review.name}
              </span>
              <span className="flex items-center ml-2 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < review.rating ? "" : "text-gray-300"}
                  />
                ))}
              </span>
            </div>
            <div className="text-gray-700 mb-1">{review.comment}</div>
            <div className="text-xs text-gray-400">{review.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Review;
