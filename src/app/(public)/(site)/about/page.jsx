import Image from "next/image";
import { Award, GraduationCap, Landmark, Users } from "lucide-react";
import {
  awards,
  biography,
  committees,
  education,
  timeline,
  visionStatement,
} from "@/data/about-content";

export const metadata = {
  title: "About Hon. Mohamed Adow",
  description:
    "Learn about the leadership journey, achievements, and development agenda of Hon. Mohamed Adow, Member of Parliament for Wajir South.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-6 py-16 sm:px-8 lg:px-10">
      <section className="grid gap-10 lg:grid-cols-[1fr,0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-primary">
            Leadership with Purpose
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
            About Hon. Mohamed Adow
          </h1>
          <div className="space-y-4 text-sm leading-7 text-slate-600">
            {biography.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative h-80 w-80 rounded-full bg-gradient-to-br from-primary to-primary/60 p-6 text-white shadow-2xl sm:h-96 sm:w-96">
            <Image 
              src="/moe.png" 
              alt="Hon. Mohamed Adow"
              className="h-full w-full rounded-full object-cover border-4 border-white/20"
              width={384}
              height={384}
              priority
            />
            <div className="absolute -bottom-5 left-1/2 w-60 -translate-x-1/2 rounded-full bg-white px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.35em] text-primary shadow-lg">
              Service • Integrity • Impact
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-slate-900">
          Political Career Timeline
        </h2>
        <div className="relative space-y-8 border-l-2 border-primary/20 pl-8">
          {timeline.map((item, index) => (
            <div key={item.year} className="relative">
              <span className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white text-sm font-semibold text-primary shadow">
                {index + 1}
              </span>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {item.year}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
          <span className="absolute bottom-0 left-[-5px] h-10 w-10 rounded-full border-4 border-primary bg-white" />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {committees.map((committee) => (
          <div
            key={committee.name}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 text-primary">
              <Landmark className="h-6 w-6" />
              <p className="text-xs font-semibold uppercase tracking-widest">
                Committee Appointment
              </p>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              {committee.name}
            </h3>
            <p className="mt-1 text-sm font-semibold text-primary">
              Role: {committee.role}
            </p>
            <p className="mt-3 text-sm text-slate-600">
              {committee.responsibilities}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3 text-primary">
            <GraduationCap className="h-6 w-6" />
            <p className="text-xs font-semibold uppercase tracking-widest">
              Education & Qualifications
            </p>
          </div>
          <ul className="mt-6 space-y-4 text-sm text-slate-600">
            {education.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 text-primary">
              <Award className="h-6 w-6" />
              <p className="text-xs font-semibold uppercase tracking-widest">
                Awards & Recognition
              </p>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {awards.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <Users className="mx-auto h-8 w-8 text-primary" />
            <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-primary">
              Vision Statement
            </p>
            <blockquote className="mt-4 text-sm leading-7 text-slate-600">
              {visionStatement}
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}
