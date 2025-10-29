"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

const formSchema = loginSchema;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/admin/dashboard";
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "admin", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      toast.success("Welcome back, " + data.user.username + "!");
      router.push(redirectTo);
    } catch (error) {
      toast.error(error.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white text-xl font-semibold">
            MA
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Admin Panel</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">Sign in to continue</h1>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Username or Email</label>
            <input
              type="text"
              placeholder="admin"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              {...register("username")}
            />
            {errors.username ? (
              <p className="text-sm text-rose-500">{errors.username.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <label className="font-medium text-slate-700">Password</label>
              <Link href="#" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-sm text-rose-500">{errors.password.message}</p>
            ) : null}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
            />
            <label htmlFor="remember" className="text-sm text-slate-600">
              Remember me for 7 days
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Use the administrator credentials provided by the office. Unauthorized access is
          prohibited.
        </p>
      </div>
    </div>
  );
}
