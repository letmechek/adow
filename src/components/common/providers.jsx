"use client";

import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

export default function Providers({ children }) {
  return (
    <SWRConfig
      value={{
        fetcher: async (resource, init) => {
          const res = await fetch(resource, init);
          if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            const error = new Error(body?.message || "Request failed");
            error.status = res.status;
            throw error;
          }
          return res.json();
        },
        revalidateOnFocus: false,
        dedupingInterval: 1000,
      }}
    >
      {children}
      <Toaster position="top-right" />
    </SWRConfig>
  );
}
