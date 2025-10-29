import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Newspaper } from "lucide-react";
import { connectDB } from "@/lib/db";
import { Project, News, Event, Setting } from "@/models";
import { formatCurrency, formatDate } from "@/lib/utils";
import NewsletterForm from "@/components/common/newsletter-form";
import { SETTINGS_KEYS, STAT_CARDS } from "@/lib/constants";
import Image from "next/image";

async function getHomepageData() {
  await connectDB();

  const [settings, featuredProjects, latestNews, upcomingEvents] = await Promise.all([
    Setting.find({ key: { $in: Object.values(SETTINGS_KEYS) } }).lean(),
    Project.find({ featured: true }).sort({ updatedAt: -1 }).limit(3).lean(),
    News.find({ status: "Published" }).sort({ publishDate: -1 }).limit(4).lean(),
    Event.find({ date: { $gte: new Date() } }).sort({ date: 1 }).limit(3).lean(),
  ]);

  const statValues = STAT_CARDS.map((card) => {
    const match = settings.find((item) => item.key === card.key);
    return { ...card, value: match ? match.value : card.defaultValue };
  });

  return {
    stats: statValues,
    projects: featuredProjects.map((item) => ({
      ...item,
      _id: item._id.toString(),
      createdAt: item.createdAt?.toISOString?.() ?? item.createdAt,
      updatedAt: item.updatedAt?.toISOString?.() ?? item.updatedAt,
    })),
    news: latestNews.map((item) => ({
      ...item,
      _id: item._id.toString(),
      publishDate: item.publishDate?.toISOString?.() ?? item.publishDate,
    })),
    events: upcomingEvents.map((item) => ({
      ...item,
      _id: item._id.toString(),
      date: item.date?.toISOString?.() ?? item.date,
    })),
  };
}

export default async function HomePage() {
  const { stats, projects, news, events } = await getHomepageData();

  return (
    <div className="space-y-20 pb-20">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_60%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 py-24 sm:px-8 lg:flex-row lg:items-center lg:gap-16 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.4em] text-white/70">
              Serving Wajir South Constituency
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Hon. Mohamed Adow
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Member of Parliament, Wajir South — championing education, infrastructure, healthcare, and youth empowerment for every citizen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-slate-100"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Get in Touch
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center lg:w-[360px]">
            <div className="relative h-64 w-64 rounded-full border-4 border-white/30 bg-gradient-to-br from-white/20 via-white/10 to-transparent p-2 sm:h-72 sm:w-72">
              <div className="relative z-0">
                <Image 
                  src="/moe.png" 
                  alt="Hon. Mohamed Adow" 
                  className="h-full w-full rounded-full object-cover" 
                  width={288} 
                  height={288}
                />
              </div>
              <div className="absolute -bottom-6 left-1/2 w-64 -translate-x-1/2 rounded-2xl bg-white/50 py-3 text-center text-sm font-semibold uppercase tracking-[0.35em] text-white/80 z-20 ">
                Integrity • Purpose
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.key} className="text-center">
              <p className="text-sm uppercase tracking-widest text-slate-500">{stat.label}</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {Number(stat.value).toLocaleString("en-KE")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Latest Updates</h2>
          <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {news.map((article) => (
            <Link
              key={article._id}
              href={`/news/${article.slug}`}
              className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {article.category}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">{article.excerpt}</p>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                <Newspaper className="h-4 w-4" />
                {formatDate(article.publishDate)}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Featured Projects</h2>
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Explore Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <div key={project._id} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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
              <h3 className="mt-4 line-clamp-2 text-lg font-semibold text-slate-900">
                {project.name}
              </h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="h-4 w-4" />
                {project.location}
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-700">{formatCurrency(project.budget)}</p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
                </div>
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                View Details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Upcoming Events</h2>
          <Link href="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            All Events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {events.map((event) => (
            <div key={event._id} className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary/80">
                  {formatDate(event.date)}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{event.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-4 w-4" />
                  {event.location}
                </p>
                <p className="mt-3 text-sm text-slate-600 line-clamp-3">{event.description}</p>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                <CalendarDays className="h-4 w-4" />
                {event.startTime ? `${event.startTime} hrs` : "Time TBC"}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Stay Informed
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Subscribe to the constituency newsletter
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Receive updates on development projects, town halls, bursary applications, and community opportunities.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
