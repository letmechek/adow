import GalleryGrid from "@/components/pages/gallery-grid";

export const metadata = {
  title: "Gallery",
  description:
    "Photos documenting constituency development, community engagements, and parliamentary work by Hon. Mohamed Adow.",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-16 sm:px-8 lg:px-10">
      <header className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-primary/80">
          Constituency in Focus
        </p>
        <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
          Gallery
        </h1>
        <p className="mx-auto max-w-3xl text-sm text-slate-600">
          Moments from community engagements, development milestones, and parliamentary duty. Filter photos by category and explore the stories behind each project.
        </p>
      </header>

      <GalleryGrid />
    </div>
  );
}
