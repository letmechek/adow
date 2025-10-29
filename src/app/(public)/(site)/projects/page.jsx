import ProjectsExplorer from "@/components/pages/projects-explorer";

export const metadata = {
  title: "Constituency Projects",
  description:
    "Explore infrastructure, education, healthcare, water, youth, and women empowerment projects championed by Hon. Mohamed Adow.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-6 py-16 sm:px-8 lg:px-10">
      <ProjectsExplorer />
    </div>
  );
}
