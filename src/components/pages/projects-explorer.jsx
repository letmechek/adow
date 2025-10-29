"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import Modal from "@/components/ui/modal";

const PAGE_SIZE = 12;

function buildQuery({ page, category, status, search, sort }) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(PAGE_SIZE));
  if (category && category !== "All") params.set("category", category);
  if (status && status !== "All") params.set("status", status);
  if (search) params.set("search", search);
  if (sort) params.set("sort", sort);
  return params.toString();
}

export default function ProjectsExplorer() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [selectedProject, setSelectedProject] = useState(null);

  const query = useMemo(
    () => buildQuery({ page, category, status, search, sort }),
    [page, category, status, search, sort]
  );

  const { data, error, isLoading } = useSWR(`/api/projects?${query}`);

  const projects = data?.data ?? [];
  const total = data?.pagination?.total ?? 0;
  const pages = data?.pagination?.pages ?? 1;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-primary/80">
              Transforming Wajir South
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Development Projects
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Explore flagship programs advancing education, water access, infrastructure, healthcare, and youth empowerment across the constituency.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search by project name or location"
                className="w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="newest">Newest First</option>
              <option value="progress">Progress (High to Low)</option>
              <option value="budget">Budget (High to Low)</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {["All", ...PROJECT_CATEGORIES].map((item) => (
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

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            <p>
              Showing <span className="font-semibold text-slate-900">{total}</span> projects
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span>Status:</span>
            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="All">All</option>
              {PROJECT_STATUSES.map((stat) => (
                <option key={stat} value={stat}>
                  {stat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading && (
          <p className="text-sm text-slate-500">Loading projects...</p>
        )}
        {error && (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-600">
            Failed to load projects. Please refresh the page.
          </p>
        )}
        {!isLoading && !projects.length && !error && (
          <p className="col-span-full rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            No projects match your filters.
          </p>
        )}
        {projects.map((project) => (
          <article
            key={project._id}
            className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {project.category}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    project.status === "Completed"
                      ? "bg-emerald-100 text-emerald-700"
                      : project.status === "Ongoing"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <h2 className="mt-4 line-clamp-2 text-lg font-semibold text-slate-900">
                {project.name}
              </h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="h-4 w-4" />
                {project.location}
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-700">
                {formatCurrency(project.budget)}
              </p>
              <p className="mt-3 line-clamp-3 text-sm text-slate-600">
                {project.description.replace(/<[^>]+>/g, "")}
              </p>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="w-full rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                View Details
              </button>
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

      <Modal
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.name ?? ""}
        description={selectedProject ? `${selectedProject.location} • ${selectedProject.category}` : ""}
        footer={
          selectedProject ? (
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">Budget:</span> {formatCurrency(selectedProject.budget)}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Progress:</span> {selectedProject.progress}%
              </p>
              <p>
                <span className="font-semibold text-slate-900">Status:</span> {selectedProject.status}
              </p>
            </div>
          ) : null
        }
      >
        {selectedProject ? (
          <div className="space-y-6">
            {selectedProject.images?.length ? (
              <div className="flex gap-4 overflow-x-auto rounded-2xl">
                {selectedProject.images.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt={selectedProject.name}
                    className="h-64 w-80 flex-shrink-0 rounded-2xl object-cover"
                  />
                ))}
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Location</p>
                <p>{selectedProject.location}</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Beneficiaries</p>
                <p>
                  {selectedProject.beneficiaries
                    ? selectedProject.beneficiaries.toLocaleString("en-KE")
                    : "N/A"}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Start Date</p>
                <p>{formatDate(selectedProject.startDate)}</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Completion</p>
                <p>{formatDate(selectedProject.completionDate)}</p>
              </div>
            </div>

            <article
              className="prose max-w-none text-slate-600 prose-headings:text-slate-900 prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: selectedProject.description }}
            />

            {selectedProject.milestones?.length ? (
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-slate-900">Milestones</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  {selectedProject.milestones.map((milestone) => (
                    <li key={`${milestone.title}-${milestone.date}`} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                      <div className="flex items-center justify-between text-xs text-primary">
                        <span>{formatDate(milestone.date)}</span>
                        <span className="font-semibold">{milestone.title}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{milestone.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {selectedProject.locationCoordinates?.lat && selectedProject.locationCoordinates?.lng ? (
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <iframe
                  src={`https://www.google.com/maps?q=${selectedProject.locationCoordinates.lat},${selectedProject.locationCoordinates.lng}&hl=en&z=13&output=embed`}
                  title={`Map showing ${selectedProject.name}`}
                  className="h-64 w-full"
                  loading="lazy"
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
