import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Twitter, Facebook, Instagram, Youtube } from "lucide-react";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { href: "/projects", label: "Projects" },
      { href: "/legislative", label: "Legislative Work" },
      { href: "/news", label: "News & Updates" },
      { href: "/gallery", label: "Gallery" },
    ],
  },
  {
    title: "Constituency Services",
    links: [
      { href: "/services#bursary", label: "Bursary Applications" },
      { href: "/services#forms", label: "Download Forms" },
      { href: "/services#faq", label: "FAQs" },
      { href: "/contact", label: "Contact Office" },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/MohamedAdowMP", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com/MohamedAdowMP", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/mohamedadowmp", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@MohamedAdowMP", label: "YouTube" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:gap-16 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-semibold">
              MA
            </div>
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-300">
                Hon. Mohamed Adow
              </p>
              <p className="text-lg font-semibold text-white">
                Member of Parliament - Wajir South
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-6 text-slate-300">
            Dedicated to advancing education, infrastructure, healthcare, and youth empowerment
            across Wajir South Constituency.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition hover:border-primary hover:bg-primary hover:text-white"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-2">
          <div className="grid gap-8 sm:grid-cols-2">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-slate-300 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Nairobi Office
              </p>
              <div className="mt-3 space-y-2 text-sm text-slate-300">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  Parliament Buildings, Parliament Road, Nairobi
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  +254 712 345 678
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  mp@mohamedadow.ke
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Monday - Friday, 9:00 AM - 5:00 PM
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Wajir South Office
              </p>
              <div className="mt-3 space-y-2 text-sm text-slate-300">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  Wajir Town, Main Street, Wajir County
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  +254 723 456 789
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  wajir@mohamedadow.ke
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Monday - Friday, 8:00 AM - 4:00 PM
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Office of Hon. Mohamed Adow. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
