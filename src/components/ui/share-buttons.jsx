"use client";

import { useState } from "react";
import { Facebook, Link as LinkIcon, Mail, Share2, Twitter, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

const shareLinks = ({ title, url }) => [
  {
    name: "Twitter",
    icon: Twitter,
    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    name: "Email",
    icon: Mail,
    href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
];

export default function ShareButtons({ title, url }) {
  const [copying, setCopying] = useState(false);
  const links = shareLinks({ title, url });

  const handleCopy = async () => {
    try {
      setCopying(true);
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch (error) {
      toast.error("Unable to copy link");
    } finally {
      setCopying(false);
    }
  };

  return (
    <div className="sticky top-28 space-y-3">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary">
        <Share2 className="h-4 w-4" />
        Share
      </div>
      <div className="space-y-2">
        {links.map(({ name, icon: Icon, href }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary hover:bg-primary/10 hover:text-primary"
          >
            <Icon className="h-4 w-4" />
            {name}
          </a>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          className="flex w-full items-center gap-3 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary hover:bg-primary/10 hover:text-primary"
        >
          <LinkIcon className="h-4 w-4" />
          {copying ? "Copying..." : "Copy Link"}
        </button>
      </div>
    </div>
  );
}
