import { connectDB } from "@/lib/db";
import { Event } from "@/models";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Upcoming Events",
  description: "Community engagements and constituency programs with Hon. Mohamed Adow.",
};

async function getEvents() {
  await connectDB();
  const events = await Event.find({}).sort({ date: 1 }).lean();
  return events.map((event) => ({
    ...event,
    _id: event._id.toString(),
    date: event.date?.toISOString?.() ?? event.date,
  }));
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-16 sm:px-8 lg:px-10">
      <header className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-primary">Community Engagements</p>
        <h1 className="text-4xl font-semibold text-slate-900">Upcoming Events</h1>
        <p className="text-sm text-slate-600">
          Join Hon. Mohamed Adow in forums, consultations, and programs that empower the people of Wajir South.
        </p>
      </header>

      <div className="space-y-6">
        {events.length ? (
          events.map((event) => (
            <div key={event._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary/80">
                    {formatDate(event.date)}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">{event.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{event.description}</p>
                  <p className="mt-3 text-sm font-semibold text-slate-700">Location: {event.location}</p>
                </div>
                <div className="space-y-2 text-sm text-slate-500">
                  {event.startTime ? <p>Starts: {event.startTime}</p> : null}
                  {event.endTime ? <p>Ends: {event.endTime}</p> : null}
                  {event.capacity ? <p>Capacity: {event.capacity.toLocaleString("en-KE")}</p> : null}
                  {event.rsvpLink ? (
                    <a
                      href={event.rsvpLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white"
                    >
                      RSVP Online
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
            No events scheduled yet. Please check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
