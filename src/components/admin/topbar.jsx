"use client";

import { Menu, Bell } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "./sidebar";

export default function AdminTopbar({ onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-500">
                Mohamed Adow MP
              </p>
              <p className="text-xl font-semibold text-slate-900">
                Admin Dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
            </button>
            <div className="hidden items-center gap-3 rounded-full border border-slate-200 px-4 py-2 lg:flex">
              <div className="h-8 w-8 rounded-full bg-primary/10" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Administrator</p>
                <p className="text-xs text-slate-500">admin@mohamedadow.ke</p>
              </div>
            </div>
            <Link
              href="/"
              className="hidden rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white sm:inline-flex"
            >
              View Site
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="h-full w-72 bg-white shadow-xl"
            >
              <AdminSidebar onLogout={() => { onLogout?.(); setMobileOpen(false); }} />
            </motion.div>
            <button
              className="absolute inset-0"
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
