import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ post }) => {
  return (
    <section>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 mb-5">
        <article
          key={post._id}
          className="flex flex-col md:flex-row bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group"
        >
          <img
            src={post.media_id.file_path}
            alt={post.title}
            className="w-full md:w-48 h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <Link to={`/blog/${post._id}`}>
                <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {post.content?.slice(0, 120)}...
              </p>
            </div>
            <div className="text-sm text-gray-400 mt-2">
              {new Date(post.created_at).toLocaleDateString("vi-VN")} -{" "}
              <span>{post.user_id.username}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Blog;
