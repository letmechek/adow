import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Project } from "@/models";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";

async function getProject(slug) {
  await connectDB();
  const project = await Project.findOne({ slug }).lean();
  if (!project) return null;

  return {
    ...project,
    _id: project._id.toString(),
    createdAt: project.createdAt?.toISOString?.() ?? project.createdAt,
    updatedAt: project.updatedAt?.toISOString?.() ?? project.updatedAt,
    startDate: project.startDate?.toISOString?.() ?? project.startDate,
    completionDate: project.completionDate?.toISOString?.() ?? project.completionDate,
  };
}

export async function generateMetadata({ params }) {
  const project = await getProject(params.slug);
  if (!project) {
    return {
      title: "Project not found",
    };
  }
  return {
    title: `${project.name} | Constituency Project`,
    description: project.description.replace(/<[^>]+>/g, "").slice(0, 160),
  };
}

export default async function ProjectDetailPage({ params }) {
  const project = await getProject(params.slug);
  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-16 sm:px-8 lg:px-10">
      <div className="flex flex-col gap-3">
        <Link href="/projects" className="text-sm font-semibold text-primary">
          ← Back to Projects
        </Link>
        <p className="text-sm uppercase tracking-[0.35em] text-primary/80">
          {project.category}
        </p>
        <h1 className="text-4xl font-semibold text-slate-900">{project.name}</h1>
        <div className="flex flex-wrap gap-3 text-sm text-slate-600">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {project.status}
          </span>
          <span>{project.location}</span>
          <span>Budget: {formatCurrency(project.budget)}</span>
          <span>Progress: {project.progress}%</span>
        </div>
      </div>

      {project.images?.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          <img
            src={project.images[0]}
            alt={project.name}
            className="h-72 w-full rounded-3xl object-cover"
          />
          <div className="grid gap-4 md:grid-rows-2">
            {project.images.slice(1, 3).map((image) => (
              <img key={image} src={image} alt={project.name} className="h-36 w-full rounded-3xl object-cover" />
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <article
          className="prose max-w-none rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-slate-600 prose-headings:text-slate-900 prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Project Snapshot</h2>
            <dl className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <dt className="font-semibold text-slate-900">Start Date</dt>
                <dd>{formatDate(project.startDate)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-semibold text-slate-900">Expected Completion</dt>
                <dd>{formatDate(project.completionDate)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-semibold text-slate-900">Beneficiaries</dt>
                <dd>
                  {project.beneficiaries
                    ? project.beneficiaries.toLocaleString("en-KE") + " people"
                    : "N/A"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-semibold text-slate-900">Status</dt>
                <dd>{project.status}</dd>
              </div>
            </dl>
          </div>

          {project.milestones?.length ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Milestone Timeline</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {project.milestones.map((milestone) => (
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
        </div>
      </div>

      {project.locationCoordinates?.lat && project.locationCoordinates?.lng ? (
        <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
          <iframe
            src={`https://www.google.com/maps?q=${project.locationCoordinates.lat},${project.locationCoordinates.lng}&hl=en&z=13&output=embed`}
            title={`Map for ${project.name}`}
            className="h-80 w-full"
            loading="lazy"
          />
        </div>
      ) : null}
    </div>
  );
}
