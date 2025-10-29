"use client";

import useSWR from "swr";
import { PieChart, Pie, Cell, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2, ArrowUpRight, FolderKanban, Newspaper, CalendarDays, Inbox, PlusCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const COLORS = ["#1C4E80", "#F6B300", "#0EA5E9"];

const sampleVisitors = [
  { month: "May", visitors: 4200 },
  { month: "Jun", visitors: 4700 },
  { month: "Jul", visitors: 5100 },
  { month: "Aug", visitors: 5600 },
  { month: "Sep", visitors: 6100 },
  { month: "Oct", visitors: 7200 },
];

const quickLinks = [
  { href: "/admin/projects", label: "Add Project", icon: FolderKanban },
  { href: "/admin/news", label: "Add Article", icon: Newspaper },
  { href: "/admin/events", label: "Add Event", icon: CalendarDays },
  { href: "/admin/contacts", label: "View Submissions", icon: Inbox },
];

export default function DashboardPage() {
  const { data, error, isLoading } = useSWR("/api/admin/overview");

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
        Failed to load dashboard data. Please refresh to retry.
      </div>
    );
  }

  const counts = data?.counts || {};
  const projectStats = data?.projectStats || {};
  const projectPieData = [
    { name: "Completed", value: projectStats.Completed || 0 },
    { name: "Ongoing", value: projectStats.Ongoing || 0 },
    { name: "Planned", value: projectStats.Planned || 0 },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Welcome back, Admin</h1>
          <p className="mt-2 text-sm text-slate-500">
            Monitor constituency programs, news, and community engagement in one place.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Projects",
            count: counts.projects || 0,
            change: "+3 this month",
            icon: FolderKanban,
          },
          {
            label: "News Articles",
            count: counts.news || 0,
            change: "+5 this month",
            icon: Newspaper,
          },
          {
            label: "Upcoming Events",
            count: counts.events || 0,
            change: "Next 60 days",
            icon: CalendarDays,
          },
          {
            label: "Contact Submissions",
            count: counts.contacts || 0,
            change: "12 unread",
            icon: Inbox,
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              whileHover={{ y: -4 }}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{card.count}</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <ArrowUpRight className="h-4 w-4" />
                    {card.change}
                  </p>
                </div>
                <span className="rounded-full bg-primary/10 p-3 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Projects by Status</p>
              <h2 className="text-xl font-semibold text-slate-900">Delivery Progress</h2>
            </div>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectPieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                >
                  {projectPieData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
            {projectPieData.map((item) => (
              <div key={item.name}>
                <span className="block text-sm font-semibold text-slate-900">{item.value}</span>
                <span className="block text-xs text-slate-500">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Website Visitors</p>
              <h2 className="text-xl font-semibold text-slate-900">Last 6 Months</h2>
            </div>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleVisitors}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip />
                <Line type="monotone" dataKey="visitors" stroke="#1C4E80" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Recent Activity</p>
              <h2 className="text-xl font-semibold text-slate-900">Latest Updates</h2>
            </div>
          </div>
          <div className="mt-6 space-y-5">
            {data?.recentContacts?.length ? (
              data.recentContacts.map((contact) => (
                <div key={contact._id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{contact.name}</p>
                    <p className="text-xs text-slate-500">{contact.subject}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
                    {contact.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No recent activity.</p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Quick Actions</p>
              <h2 className="text-xl font-semibold text-slate-900">Do more</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                <span className="inline-flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <PlusCircle className="h-4 w-4" />
                  </span>
                  {item.label}
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
