"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/lib/validation";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "@/lib/constants";
import toast from "react-hot-toast";

export default function ProjectForm({ defaultValues, onSubmit, loading }) {
  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      category: PROJECT_CATEGORIES[0],
      location: "",
      description: "",
      budget: 0,
      progress: 0,
      status: PROJECT_STATUSES[0],
      startDate: "",
      completionDate: "",
      beneficiaries: 0,
      images: [],
      milestones: [],
      ...(defaultValues || {}),
    },
  });

  const { register, handleSubmit, control, reset, watch } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "milestones" });
  const images = watch("images");

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        startDate: defaultValues.startDate ? defaultValues.startDate.slice(0, 10) : "",
        completionDate: defaultValues.completionDate ? defaultValues.completionDate.slice(0, 10) : "",
      });
    }
  }, [defaultValues, reset]);

  const submitHandler = handleSubmit(async (values) => {
    try {
      await onSubmit({
        ...values,
        budget: Number(values.budget),
        progress: Number(values.progress),
        beneficiaries: Number(values.beneficiaries || 0),
      });
      reset();
    } catch (error) {
      toast.error(error.message || "Unable to save project");
    }
  });

  const handleAddImage = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    toast.promise(
      fetch("/api/upload", {
        method: "POST",
        body: formData,
      }).then(async (response) => {
        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message || "Upload failed");
        }
        return response.json();
      }),
      {
        loading: "Uploading images...",
        success: (data) => {
          const urls = data.uploads.map((item) => item.url);
          form.setValue("images", [...(images || []), ...urls]);
          return "Images uploaded";
        },
        error: (error) => error.message || "Upload failed",
      }
    );
  };

  return (
    <form onSubmit={submitHandler} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Project Name</label>
          <input
            type="text"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            {...register("name")}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Category</label>
          <select
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            {...register("category")}
          >
            {PROJECT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Location</label>
          <input
            type="text"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            {...register("location")}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Budget (KES)</label>
            <input
              type="number"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              {...register("budget", { valueAsNumber: true })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Progress %</label>
            <input
              type="number"
              min="0"
              max="100"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              {...register("progress", { valueAsNumber: true })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Status</label>
          <select
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            {...register("status")}
          >
            {PROJECT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Beneficiaries</label>
          <input
            type="number"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            {...register("beneficiaries", { valueAsNumber: true })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Start Date</label>
          <input
            type="date"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            {...register("startDate")}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Completion Date</label>
          <input
            type="date"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            {...register("completionDate")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Description</label>
        <textarea
          rows={6}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          {...register("description")}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">Images</h3>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white">
            Upload
            <input type="file" multiple className="hidden" onChange={handleAddImage} accept="image/*" />
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          {(images || []).map((url, index) => (
            <div key={url} className="group relative h-20 w-24 overflow-hidden rounded-xl border border-slate-200">
              <img src={url} alt="Project" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => {
                  const updated = [...images];
                  updated.splice(index, 1);
                  form.setValue("images", updated);
                }}
                className="absolute inset-0 hidden items-center justify-center bg-slate-900/60 text-xs font-semibold text-white group-hover:flex"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">Project Milestones</h3>
          <button
            type="button"
            onClick={() =>
              append({ title: "", description: "", date: new Date().toISOString().slice(0, 10) })
            }
            className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            Add Milestone
          </button>
        </div>
        {!fields.length && (
          <p className="text-sm text-slate-500">No milestones added yet.</p>
        )}
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="grid gap-3 md:grid-cols-3">
                <input
                  type="text"
                  placeholder="Milestone title"
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  {...register(`milestones.${index}.title`)}
                />
                <input
                  type="date"
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  {...register(`milestones.${index}.date`)}
                />
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    placeholder="Milestone description"
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    {...register(`milestones.${index}.description`)}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-500 transition hover:bg-rose-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/60"
        >
          {loading ? "Saving..." : "Save Project"}
        </button>
      </div>
    </form>
  );
}
