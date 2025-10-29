"use client";

import { useState } from "react";

const offices = [
  {
    key: "nairobi",
    label: "Nairobi Office",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31886.020924484298!2d36.804214174316424!3d-1.287845862690932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1078f5938789%3A0x8fa40a7c4fa2f558!2sParliament%20of%20Kenya!5e0!3m2!1sen!2ske!4v1709387400000!5m2!1sen!2ske",
  },
  {
    key: "wajir",
    label: "Wajir South Office",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4004086.5452029943!2d39.57876489257343!3d1.7278673569765946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182d5631d5be98b9%3A0x9b8f2fbfdfbea1b!2sWajir!5e0!3m2!1sen!2ske!4v1709387500000!5m2!1sen!2ske",
  },
];

export default function ContactMapTabs() {
  const [active, setActive] = useState(offices[0].key);
  const current = offices.find((office) => office.key === active) ?? offices[0];

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {offices.map((office) => (
          <button
            key={office.key}
            type="button"
            onClick={() => setActive(office.key)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition ${
              active === office.key
                ? "bg-primary text-white"
                : "border border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {office.label}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <iframe
          src={current.src}
          title={current.label}
          className="h-72 w-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}
