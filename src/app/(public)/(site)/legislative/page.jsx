import LegislativeTabs from "@/components/pages/legislative-tabs";

export const metadata = {
  title: "Legislative Work",
  description:
    "Bills sponsored, committee engagements, speeches, and voting record by Hon. Mohamed Adow in the National Assembly.",
};

export default function LegislativePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-6 py-16 sm:px-8 lg:px-10">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-primary/80">
          Parliamentary Performance
        </p>
        <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
          Legislative Work
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Hon. Mohamed Adow is dedicated to people-centred legislation, committee oversight, and
          transparent voting. Explore sponsored bills, committee engagement, speeches, and voting
          history.
        </p>
      </header>

      <LegislativeTabs />
    </div>
  );
}
