"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AdminSidebar from "./sidebar";
import AdminTopbar from "./topbar";

export default function AdminShell({ children }) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) {
        throw new Error("Failed to logout");
      }
      toast.success("Logged out");
      router.push("/admin/login");
    } catch (error) {
      toast.error(error.message || "Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex min-h-screen flex-1 flex-col">
        <AdminTopbar onLogout={handleLogout} />
        <div className="flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
