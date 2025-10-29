import SiteHeader from "@/components/common/site-header";
import SiteFooter from "@/components/common/site-footer";

export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
