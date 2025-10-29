"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ title, description, open, onClose, children, footer }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 px-4 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
            <div className="pr-10">
              <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
              {description ? (
                <p className="mt-2 text-sm text-slate-500">{description}</p>
              ) : null}
            </div>
            <div className="mt-6 space-y-6 overflow-y-auto pr-2" style={{ maxHeight: "65vh" }}>
              {children}
            </div>
            {footer ? <div className="mt-6 border-t border-slate-100 pt-4">{footer}</div> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
