"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { Calendar, Newspaper, Search } from "lucide-react";
import { NEWS_CATEGORIES } from "@/lib/constants";
import { formatDate, readingTime } from "@/lib/utils";

const PAGE_SIZE = 12;

function buildQuery({ page, category, search, startDate, endDate }) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(PAGE_SIZE));
  params.set("status", "Published");
  if (category && category !== "All") params.set("category", category);
  if (search) params.set("search", search);
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);
  return params.toString();
}

export default function NewsExplorer({ initialData }) {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const query = useMemo(
    () => buildQuery({ page, category, search, startDate, endDate }),
    [page, category, search, startDate, endDate]
  );

  const { data, error, isLoading } = useSWR(`/api/news?${query}`, {
    fallbackData: initialData,
    keepPreviousData: true,
  });

  const articles = data?.data ?? [];
  const pages = data?.pagination?.pages ?? 1;
  const total = data?.pagination?.total ?? 0;
  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <div className="space-y-10">
      {featuredArticle ? (
        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg lg:grid lg:grid-cols-[0.7fr,0.3fr]">
          <div className="p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {featuredArticle.category}
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
              {featuredArticle.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
              <span>{formatDate(featuredArticle.publishDate)}</span>
              <span>•</span>
              <span>{featuredArticle.author}</span>
              <span>•</span>
              <span>{readingTime(featuredArticle.content)}</span>
            </div>
            <p className="mt-4 text-sm text-slate-600">{featuredArticle.excerpt}</p>
            <Link
              href={`/news/${featuredArticle.slug}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Read More
              <Newspaper className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative h-72 w-full bg-slate-100 lg:h-full">
            {featuredArticle.featuredImage ? (
              <img
                src={featuredArticle.featuredImage}
                alt={featuredArticle.title}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
        </article>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
          No published articles yet. Please check back soon.
        </div>
      )}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-primary/80">
              Stay Informed
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              News & Updates
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Filter by category, pick a date range, or search for specific topics.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search news"
                className="w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-slate-500">
              <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                <Calendar className="h-4 w-4" />
                <input
                  type="date"
                  value={startDate}
                  max={endDate || undefined}
                  onChange={(event) => {
                    setStartDate(event.target.value);
                    setPage(1);
                  }}
                  className="border-none bg-transparent text-xs outline-none"
                />
              </label>
              <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                <Calendar className="h-4 w-4" />
                <input
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(event) => {
                    setEndDate(event.target.value);
                    setPage(1);
                  }}
                  className="border-none bg-transparent text-xs outline-none"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {["All", ...NEWS_CATEGORIES].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setCategory(item);
                setPage(1);
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                category === item
                  ? "bg-primary text-white"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-900">{total}</span> articles
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading && (
          <p className="text-sm text-slate-500">Loading articles...</p>
        )}
        {error && (
          <p className="col-span-full rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-600">
            Failed to load articles. Please try again.
          </p>
        )}
        {!isLoading && !remainingArticles.length && !error && (
          <p className="col-span-full rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            No articles match your filters.
          </p>
        )}
        {remainingArticles.map((article) => (
          <article
            key={article._id}
            className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            {article.featuredImage ? (
              <img
                src={article.featuredImage}
                alt={article.title}
                className="h-40 w-full object-cover"
              />
            ) : null}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary/80">
                  {article.category}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-3">{article.excerpt}</p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>{formatDate(article.publishDate)}</span>
                <Link href={`/news/${article.slug}`} className="text-primary">
                  Read More
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-600 shadow-sm">
        <p>
          Page <span className="font-semibold text-slate-900">{page}</span> of {pages}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={page >= pages}
            onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
