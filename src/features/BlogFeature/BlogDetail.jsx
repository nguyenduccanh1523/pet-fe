import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGetBlogApi } from "../../api/mainAPi/blogApi";
import LoadingSpinner from "../../components/Share/Loading";
import { useTranslation } from "react-i18next";

const BlogDetail = () => {
  const {t} = useTranslation();
  const { id: rawId } = useParams();
  const id = String(rawId ?? "").trim();
  const navigate = useNavigate();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogDetail", id],
    queryFn: () => fetchGetBlogApi({ blogId: id }).then((res) => res.data),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading blog</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 mt-8 mb-12 animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 px-4 py-2 bg-primary dark:text-white rounded hover:bg-primary-dark transition-colors shadow focus:outline-none focus:ring-2 focus:ring-primary/50"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        {t("backToBlog")}
      </button>
      <img
        src={blog.media_id.file_path}
        alt="Blog banner"
        className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
      />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
        {blog.title}
      </h1>
      <div className="flex items-center mb-6">
        <img
          src={blog.user_id.avatar_id.file_path}
          alt={blog.user_id.username}
          className="w-14 h-14 rounded-full border-2 border-primary object-cover shadow mr-4"
        />
        <div>
          <div className="font-semibold text-lg text-gray-800 dark:text-gray-200">
            {blog.user_id.username}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {blog.user_id.bio}
          </div>
        </div>
        <span className="ml-auto text-sm text-gray-400 dark:text-gray-500">
          {new Date(blog.created_at).toLocaleDateString("vi-VN")}
        </span>
      </div>
      <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 leading-relaxed">
        {blog.content.split("\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail;
