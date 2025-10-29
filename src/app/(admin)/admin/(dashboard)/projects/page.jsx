"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { Loader2, Plus, Pencil, Trash2, Search } from "lucide-react";
import toast from "react-hot-toast";
import ProjectForm from "@/components/admin/project-form";
import Modal from "@/components/ui/modal";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";

const PAGE_SIZE = 12;

export default function AdminProjectsPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(PAGE_SIZE));
    if (category !== "All") params.set("category", category);
    if (status !== "All") params.set("status", status);
    if (search) params.set("search", search);
    if (sort) params.set("sort", sort);
    return params.toString();
  }, [page, category, status, search, sort]);

  const { data, error, isLoading, mutate } = useSWR(`/api/projects?${query}`);

  const openCreateModal = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProject(null);
  };

  const handleSave = async (values) => {
    setSubmitting(true);
    try {
      const response = await fetch(editingProject ? `/api/projects/${editingProject._id}` : "/api/projects", {
        method: editingProject ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Unable to save project");
      }

      toast.success(`Project ${editingProject ? "updated" : "created"} successfully`);
      closeModal();
      mutate();
    } catch (error) {
      toast.error(error.message || "Unable to save project");
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (project) => {
    const confirmed = window.confirm("Are you sure you want to delete this project? This cannot be undone.");
    if (!confirmed) return;
    try {
      const response = await fetch(`/api/projects/${project._id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Unable to delete project");
      }
      toast.success("Project deleted");
      mutate();
    } catch (error) {
      toast.error(error.message || "Failed to delete project");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Manage Projects</h1>
          <p className="mt-2 text-sm text-slate-500">
            Track development initiatives across Wajir South and update project statuses.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add New Project
        </button>
      </div>

      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="Search by name or location"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(1);
            }}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="All">All Categories</option>
            {PROJECT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="All">All Statuses</option>
            {PROJECT_STATUSES.map((stat) => (
              <option key={stat} value={stat}>
                {stat}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="newest">Newest First</option>
            <option value="progress">Progress (High to Low)</option>
            <option value="budget">Budget (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Project</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Location</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading && (
                <tr>
                  <td colSpan={7} className="px-6 py-6 text-center">
                    <Loader2 className="mx-auto h-5 w-5 animate-spin text-primary" />
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={7} className="px-6 py-6 text-center text-sm text-rose-500">
                    Unable to load projects. Please refresh.
                  </td>
                </tr>
              )}
              {!isLoading && data?.data?.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-6 text-center text-sm text-slate-500">
                    No projects found.
                  </td>
                </tr>
              )}
              {data?.data?.map((project) => (
                <tr key={project._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{project.name}</p>
                      <p className="text-xs text-slate-500">Added {formatDate(project.createdAt)}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{project.category}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{project.location}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{formatCurrency(project.budget)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
                      </div>
                      <span className="text-xs font-medium text-slate-700">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        project.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : project.status === "Ongoing"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(project)}
                        className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-primary hover:bg-primary/10 hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(project)}
                        className="rounded-full border border-rose-200 p-2 text-rose-500 transition hover:bg-rose-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
          <div>
            Showing {data?.data?.length || 0} of {data?.pagination?.total || 0} projects
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-xs font-semibold text-slate-600">Page {page}</span>
            <button
              type="button"
              disabled={page >= (data?.pagination?.pages || 1)}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editingProject ? "Edit Project" : "Add New Project"}
        description="Provide detailed information for the constituency development project."
      >
        <ProjectForm defaultValues={editingProject} onSubmit={handleSave} loading={submitting} />
      </Modal>
    </div>
  );
}
