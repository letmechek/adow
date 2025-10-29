"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Newspaper,
  CalendarDays,
  Images,
  Inbox,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/news", label: "News & Updates", icon: Newspaper },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/contacts", label: "Contact Submissions", icon: Inbox },
  { href: "/admin/newsletter", label: "Newsletter", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar({ onLogout }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="flex h-20 items-center gap-3 px-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-semibold">
          MA
        </div>
        <div>
          <p className="text-sm uppercase tracking-widest text-slate-500">
            Mohamed Adow MP
          </p>
          <p className="text-lg font-semibold text-slate-900">Admin Panel</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-4">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <button
        type="button"
        onClick={onLogout}
        className="mx-4 mb-4 flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:bg-primary hover:text-white"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </aside>
  );
}
