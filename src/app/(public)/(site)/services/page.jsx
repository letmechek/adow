import { FileText, HelpCircle, Mail, Phone } from "lucide-react";
import { sampleDownloads, sampleFaqs, sampleServices } from "@/data/sample-data";

export const metadata = {
  title: "Constituency Services",
  description:
    "Access bursaries, recommendation letters, community project support, and FAQs for Wajir South residents.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-6 py-16 sm:px-8 lg:px-10">
      <header className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-primary/80">
          Support for Every Citizen
        </p>
        <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
          Constituency Services
        </h1>
        <p className="mx-auto max-w-3xl text-sm text-slate-600">
          Wajir South residents can apply for bursaries, request official letters, submit community
          project proposals, and access practical resources. Explore the services below to get
          started.
        </p>
      </header>

      <section id="services" className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-900">Service Catalogue</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleServices.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {service.name}
                </p>
                <p className="text-sm text-slate-600">{service.description}</p>
              </div>
              <a
                href="#downloads"
                className="mt-6 inline-flex items-center justify-center rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                {service.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="downloads" className="space-y-6">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold text-slate-900">Downloadable Forms</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {sampleDownloads.map((download) => (
            <a
              key={download.title}
              href={download.file}
              className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition hover:border-primary hover:bg-primary/10 hover:text-primary"
            >
              {download.title}
              <FileText className="h-4 w-4" />
            </a>
          ))}
        </div>
      </section>

      <section id="faq" className="space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold text-slate-900">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {sampleFaqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-primary"
            >
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-primary via-primary/90 to-slate-900 p-8 text-white shadow-lg">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
              Need Assistance?
            </p>
            <h2 className="text-3xl font-semibold">Contact Constituency Officers</h2>
            <p className="text-sm text-white/80">
              We&apos;re available Monday to Friday to support residents with applications,
              documentation, and development programs.
            </p>
          </div>
          <div className="space-y-3 text-sm text-white/80">
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-white" />
              Nairobi Office: +254 712 345 678
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-white" />
              Wajir South Office: +254 723 456 789
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-white" />
              mp@mohamedadow.ke
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/50 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact the Office
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
