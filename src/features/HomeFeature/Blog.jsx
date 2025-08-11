import React from "react";
import { useTranslation } from "react-i18next";

const blogs = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
    title: "5 Tips for Keeping Your Pet Healthy",
    desc: "Discover essential tips to keep your furry friends healthy and happy all year round.",
    date: "2025-08-01",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400&q=80",
    title: "How to Choose the Right Food for Your Cat",
    desc: "A guide to selecting the best nutrition for your feline companion, from kitten to senior.",
    date: "2025-07-25",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    title: "Fun Activities to Do With Your Dog",
    desc: "Explore creative and fun ways to bond with your dog, indoors and outdoors.",
    date: "2025-07-18",
  },
];

const Blog = () => {
  const { t } = useTranslation();
  return (
    <section className="py-12 mt-20 bg-gradient-to-r from-blue-300 to-yellow-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {t("Latest Blog Posts")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />
              <div className="flex-1 flex flex-col p-6">
                <span className="text-xs text-gray-400 mb-2">
                  {new Date(blog.date).toLocaleDateString()}
                </span>
                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{blog.desc}</p>
                <div className="mt-auto">
                  <button className="text-orange-500 font-semibold hover:underline">
                    {t("Read more")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
