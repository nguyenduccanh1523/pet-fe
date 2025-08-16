import React from "react";

const sampleAds = [
  {
    id: 1,
    title: "Ưu đãi mùa hè: Giảm 20% cho tất cả sản phẩm thức ăn cho chó mèo",
    content:
      "Nhanh tay mua ngay các sản phẩm thức ăn cao cấp cho thú cưng với giá ưu đãi chỉ có trong tháng này!",
    media_url: "/assets/banner/banner-img2.png",
    link_url: "https://petblog.vn/khuyen-mai/thuc-an",
    start_date: "2025-08-01T00:00:00Z",
    end_date: "2025-08-31T23:59:59Z",
  },
  {
    id: 2,
    title: "Ra mắt sản phẩm mới: Vòng cổ thông minh cho thú cưng",
    content:
      "Theo dõi sức khỏe và vị trí thú cưng mọi lúc mọi nơi với vòng cổ thông minh PetSmart mới nhất.",
    media_url: "/assets/banner/banner-img3.png",
    link_url: "https://petblog.vn/san-pham/vong-co-thong-minh",
    start_date: "2025-08-10T00:00:00Z",
    end_date: "2025-09-10T23:59:59Z",
  },
  {
    id: 3,
    title: "Miễn phí vận chuyển cho đơn hàng trên 500k",
    content:
      "Đặt hàng ngay hôm nay để nhận ưu đãi miễn phí vận chuyển toàn quốc cho đơn hàng từ 500.000đ.",
    media_url: "/assets/banner/banner-img4.png",
    link_url: "",
    start_date: "2025-08-01T00:00:00Z",
    end_date: "2025-08-31T23:59:59Z",
  },
];

const AdsPage = () => {
  const ads = sampleAds;

  return (
    <div className="min-h-screen font-sans">
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-700 dark:text-white">
          Ưu đãi & Sản phẩm mới nổi bật
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ads.length === 0 && (
            <div className="col-span-full text-center text-gray-400">
              Chưa có quảng cáo nào.
            </div>
          )}
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="bg-gradient-to-r from-blue-500 to-green-300 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col"
            >
              <div className="mb-4 h-48 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={ad.media_url || "/assets/banner/banner-img.png"}
                  alt={ad.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="font-bold text-xl mb-2 text-yellow-900 line-clamp-2">
                {ad.title}
              </h2>
              <p className="text-gray-700 mb-4 line-clamp-3">{ad.content}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-gray-200">
                  {new Date(ad.start_date).toLocaleDateString()} -{" "}
                  {new Date(ad.end_date).toLocaleDateString()}
                </span>
                {ad.link_url && ad.link_url !== "" && (
                  <a
                    href={ad.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition"
                  >
                    Xem chi tiết
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdsPage;
