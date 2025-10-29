"use client";

import { useEffect, useState } from "react";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Download, Loader2 } from "lucide-react";

const PAGE_SIZE = 12;

export default function GalleryGrid() {
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let ignore = false;
    const fetchItems = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(PAGE_SIZE));
        if (category !== "All") params.set("category", category);
        const response = await fetch(`/api/gallery?${params.toString()}`);
        const data = await response.json();
        if (ignore) return;
        if (page === 1) {
          setItems(data.data);
        } else {
          setItems((prev) => [...prev, ...data.data]);
        }
        setTotal(data.pagination.total);
      } catch (error) {
        console.error("Failed to load gallery", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchItems();
    return () => {
      ignore = true;
    };
  }, [page, category]);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const canLoadMore = items.length < total;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {["All", ...GALLERY_CATEGORIES].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => handleCategoryChange(item)}
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

      <p className="text-sm text-slate-500">
        Showing <span className="font-semibold text-slate-900">{items.length}</span> of {total} photos
      </p>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((item) => (
          <button
            key={item._id}
            type="button"
            onClick={() => setSelected(item)}
            className="group mb-4 block w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <img
              src={item.imageUrl}
              alt={item.caption}
              className="w-full transition duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="space-y-2 px-4 py-3 text-left text-sm text-slate-600">
              <p className="font-semibold text-slate-900">{item.caption}</p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{item.category}</span>
                <span>{formatDate(item.dateTaken)}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        {canLoadMore ? (
          <button
            type="button"
            onClick={() => setPage((prev) => prev + 1)}
            className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? "Loading..." : "Load More"}
          </button>
        ) : (
          <p className="text-sm text-slate-500">End of gallery.</p>
        )}
      </div>

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4 py-10">
          <div className="max-w-4xl space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {selected.category}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  {selected.caption}
                </h3>
                <p className="text-xs text-slate-500">Taken {formatDate(selected.dateTaken)}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selected.imageUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary transition hover:bg-primary hover:text-white"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  Close
                </button>
              </div>
            </div>
            <img
              src={selected.imageUrl}
              alt={selected.caption}
              className="max-h-[70vh] w-full rounded-2xl object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
