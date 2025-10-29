"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { CONTACT_SUBJECTS } from "@/lib/constants";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .regex(/^\+?254\d{9}$|^0\d{9}$/g, "Enter a valid Kenyan phone number"),
  subject: z.enum(CONTACT_SUBJECTS),
  message: z.string().min(20, "Message should be at least 20 characters").max(500, "Message limit is 500 characters"),
});

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: CONTACT_SUBJECTS[0],
      message: "",
    },
  });

  const message = watch("message");

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Unable to submit message");
      }
      toast.success("Thank you for reaching out! We'll respond within 48 hours.");
      reset();
    } catch (error) {
      toast.error(error.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Full Name</label>
          <input
            type="text"
            placeholder="Jane Doe"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            {...register("name")}
          />
          {errors.name ? <p className="text-xs text-rose-500">{errors.name.message}</p> : null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            {...register("email")}
          />
          {errors.email ? <p className="text-xs text-rose-500">{errors.email.message}</p> : null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Phone Number</label>
          <input
            type="tel"
            placeholder="+254712345678"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            {...register("phone")}
          />
          {errors.phone ? <p className="text-xs text-rose-500">{errors.phone.message}</p> : null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Subject</label>
          <select
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            {...register("subject")}
          >
            {CONTACT_SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subject ? <p className="text-xs text-rose-500">{errors.subject.message}</p> : null}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700">Message</label>
          <span className="text-xs text-slate-500">{message.length}/500</span>
        </div>
        <textarea
          rows={6}
          placeholder="Share the details of your inquiry..."
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          {...register("message")}
        />
        {errors.message ? <p className="text-xs text-rose-500">{errors.message.message}</p> : null}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/60"
      >
        {submitting ? "Sending..." : "Submit Message"}
      </button>
    </form>
  );
}
