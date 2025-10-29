import { connectDB } from "@/lib/db";
import { News } from "@/models";
import NewsExplorer from "@/components/pages/news-explorer";

export const metadata = {
  title: "News & Updates",
  description:
    "Latest press releases, media coverage, announcements, and events from the office of Hon. Mohamed Adow.",
};

async function getInitialNews() {
  await connectDB();
  const articles = await News.find({ status: "Published" })
    .sort({ publishDate: -1 })
    .limit(13)
    .lean();

  const data = articles.map((article) => ({
    ...article,
    _id: article._id.toString(),
    publishDate: article.publishDate?.toISOString?.() ?? article.publishDate,
  }));

  return {
    data,
    pagination: {
      total: data.length,
      page: 1,
      pages: 1,
      limit: 13,
    },
  };
}

export default async function NewsPage() {
  const initialData = await getInitialNews();

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-6 py-16 sm:px-8 lg:px-10">
      <NewsExplorer initialData={initialData} />
    </div>
  );
}
