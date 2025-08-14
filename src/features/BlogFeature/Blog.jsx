import React from "react";

const blogs = [
  {
    id: 1,
    title: "5 dấu hiệu thú cưng cần đi khám ngay",
    desc: "Những dấu hiệu bất thường ở thú cưng mà bạn không nên bỏ qua để bảo vệ sức khỏe cho các bé.",
    date: "2025-08-10",
    image: "/src/assets/images/item8.jpg",
  },
  {
    id: 2,
    title: "Chế độ dinh dưỡng hợp lý cho chó mèo",
    desc: "Tìm hiểu các nguyên tắc dinh dưỡng giúp thú cưng phát triển khỏe mạnh, phòng tránh bệnh tật.",
    date: "2025-08-05",
    image: "/src/assets/banner/banner-img2.png",
  },
  {
    id: 3,
    title: "Cách huấn luyện chó nghe lời tại nhà",
    desc: "Các bước cơ bản để huấn luyện chó ngoan ngoãn, nghe lời chủ nhân mà không cần chuyên gia.",
    date: "2025-07-28",
    image: "/src/assets/banner/banner-img3.png",
  },
];

const Blog = () => {
  return (
    <section>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full md:w-48 h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{blog.desc}</p>
              </div>
              <div className="text-sm text-gray-400 mt-2">
                {new Date(blog.date).toLocaleDateString("vi-VN")}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blog;
