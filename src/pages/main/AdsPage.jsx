import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchAds } from "../../api/mainAPi/adsApi";

const AdsPage = () => {
  const { t, i18n } = useTranslation();

  // State
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  // Helpers
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString(i18n.language || "vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch {
      return "";
    }
  };

  const getImgSrc = (ad) =>
    ad?.media_id?.file_path || ad?.media_url || "/assets/banner/banner-img.png";

  const isActive = (ad) => {
    const now = new Date();
    const start = ad?.start_date ? new Date(ad.start_date) : null;
    const end = ad?.end_date ? new Date(ad.end_date) : null;
    return (!start || start <= now) && (!end || end >= now);
  };

  const filteredAds = useMemo(() => {
    if (!showActiveOnly) return ads;
    return ads.filter(isActive);
  }, [ads, showActiveOnly]);

  // Data loading
  const loadAds = async (targetPage = 1, replace = false) => {
    try {
      if (replace) setAds([]);
      setLoading(true);
      setError(null);
      const res = await fetchAds(targetPage, 12);
      const list = Array.isArray(res?.data) ? res.data : [];
      const meta = res?.meta?.pagination || {};
      setAds((prev) => (replace ? list : [...prev, ...list]));
      setPage(meta.page || targetPage);
      setPageCount(meta.pageCount || 1);
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      setError("Không thể tải danh sách quảng cáo. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAds(1, true);
  }, []);

  // Skeleton
  const SkeletonCard = () => (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm animate-pulse bg-white/60 dark:bg-slate-800/60">
      <div className="aspect-[16/9] w-full rounded-lg bg-slate-200 dark:bg-slate-700 mb-4" />
      <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
      <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded mb-2" />
      <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded" />
      <div className="mt-4 flex items-center justify-between">
        <div className="h-3 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-full" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      <section className="py-10 md:py-12 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t("AdsPageTitle")}
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            {t("AdsPageDes")}
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {t("AdsPageFilter")}:
            </span>
            <button
              type="button"
              onClick={() => setShowActiveOnly((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition
                ${
                  showActiveOnly
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              aria-pressed={showActiveOnly}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  showActiveOnly ? "bg-white" : "bg-emerald-500"
                }`}
              />
              {showActiveOnly
                ? t("AdsPageShowingActive")
                : t("AdsPageShowActiveOnly")}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => loadAds(1, true)}
              className="inline-flex items-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              {t("AdsPageReload")}
            </button>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300 p-4">
            <div className="flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={() =>
                  loadAds(page || 1, page === 1 && ads.length === 0)
                }
                className="ml-4 inline-flex items-center rounded-md bg-red-600 text-white px-3 py-1.5 text-sm hover:bg-red-700"
              >
                {t("Retry")}
              </button>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && filteredAds.length === 0 && !error && (
            <div className="col-span-full text-center text-slate-500 dark:text-slate-400">
              {t("AdsPageNoAds")}
            </div>
          )}

          {loading && ads.length === 0
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : filteredAds.map((ad) => {
                const active = isActive(ad);
                const key = ad?._id || ad?.id;
                return (
                  <div
                    key={key}
                    className="group relative bg-white/80 dark:bg-slate-900/70 backdrop-blur rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition overflow-hidden"
                  >
                    {/* Badge */}
                    {active && (
                      <span className="absolute left-3 top-3 z-10 rounded-full bg-emerald-600 text-white text-xs font-semibold px-2 py-1 shadow">
                        {t("AdsPageShowingActive")}
                      </span>
                    )}
                    {/* Media */}
                    <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={getImgSrc(ad)}
                        alt={ad?.title || "Quảng cáo"}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                    {/* Content */}
                    <div className="p-4 flex flex-col h-full">
                      <h2 className="font-semibold text-lg text-slate-900 dark:text-white line-clamp-2">
                        {ad?.title}
                      </h2>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                        {ad?.content}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {formatDate(ad?.start_date)} -{" "}
                          {formatDate(ad?.end_date)}
                        </span>
                        {ad?.link_url ? (
                          <a
                            href={ad.link_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 inline-flex items-center rounded-full bg-blue-600 text-white px-3 py-1.5 text-sm font-medium hover:bg-blue-700"
                          >
                            {t("aboutUsSeeMore")}
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* Pagination / Load more */}
        {page < pageCount && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => loadAds(page + 1, false)}
              disabled={loading}
              className="inline-flex items-center rounded-full bg-slate-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              {loading ? "Đang tải..." : "Tải thêm"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdsPage;
