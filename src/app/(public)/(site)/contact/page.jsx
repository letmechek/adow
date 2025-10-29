import ContactForm from "@/components/pages/contact-form";
import ContactMapTabs from "@/components/pages/contact-map-tabs";
import {
  CalendarDays,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

export const metadata = {
  title: "Contact Hon. Mohamed Adow",
  description:
    "Reach the constituency offices in Nairobi and Wajir South for inquiries, assistance, and community reports.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-6 py-16 sm:px-8 lg:px-10">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-primary/80">
          We Would Love to Hear From You
        </p>
        <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
          Contact Hon. Mohamed Adow
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Reach the constituency offices for assistance requests, bursary inquiries, media engagements, or community project updates. Our team responds within 48 hours on weekdays.
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-[0.6fr,0.4fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Send a Message</h2>
          <p className="mt-2 text-sm text-slate-600">
            Provide accurate contact information so our constituency officers can follow up promptly.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-900/95 p-6 text-white shadow-lg">
            <h3 className="text-lg font-semibold">Constituency Offices</h3>
            <div className="mt-4 space-y-4 text-sm text-white/80">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary/80">
                  Nairobi Office
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  Parliament Buildings, Parliament Road, Nairobi
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" /> +254 712 345 678
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" /> mp@mohamedadow.ke
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> Monday - Friday, 9:00 AM - 5:00 PM
                </p>
              </div>
              <div className="space-y-2 border-t border-white/10 pt-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary/80">
                  Wajir South Office
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  Wajir Town, Main Street, Wajir County
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" /> +254 723 456 789
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" /> wajir@mohamedadow.ke
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> Monday - Friday, 8:00 AM - 4:00 PM
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-4 gap-3 text-white">
              <a
                href="https://twitter.com/MohamedAdowMP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-primary hover:bg-primary"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/MohamedAdowMP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-primary hover:bg-primary"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/mohamedadowmp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-primary hover:bg-primary"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/@MohamedAdowMP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-primary hover:bg-primary"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-primary">
              <CalendarDays className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-slate-900">Visit Our Offices</h3>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Use the map tabs to locate the Nairobi and Wajir South constituency offices.
            </p>
            <div className="mt-4">
              <ContactMapTabs />
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
