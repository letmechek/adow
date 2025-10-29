import { notFound } from "next/navigation";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { News } from "@/models";
import { formatDate, readingTime } from "@/lib/utils";
import ShareButtons from "@/components/ui/share-buttons";

async function getArticle(slug) {
  await connectDB();
  const article = await News.findOne({ slug, status: "Published" }).lean();
  if (!article) return null;

  return {
    ...article,
    _id: article._id.toString(),
    publishDate: article.publishDate?.toISOString?.() ?? article.publishDate,
  };
}

async function getRelatedArticles(category, excludeId) {
  const related = await News.find({
    category,
    status: "Published",
    _id: { $ne: excludeId },
  })
    .sort({ publishDate: -1 })
    .limit(3)
    .lean();

  return related.map((item) => ({
    ...item,
    _id: item._id.toString(),
    publishDate: item.publishDate?.toISOString?.() ?? item.publishDate,
  }));
}

export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  if (!article) {
    return {
      title: "Article not found",
    };
  }
  return {
    title: `${article.title} | News & Updates`,
    description: article.excerpt || article.content.replace(/<[^>]+>/g, "").slice(0, 160),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.featuredImage ? [article.featuredImage] : [],
    },
  };
}

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);
  if (!article) {
    notFound();
  }
  const related = await getRelatedArticles(article.category, article._id);
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/news/${article.slug}`;

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-6 py-16 sm:px-8 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[0.25fr,0.75fr] lg:items-start">
        <ShareButtons title={article.title} url={shareUrl} />
        <article className="space-y-8">
          <header className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {article.category}
            </p>
            <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
              <span>{formatDate(article.publishDate)}</span>
              <span>•</span>
              <span>{article.author}</span>
              <span>•</span>
              <span>{readingTime(article.content)}</span>
            </div>
          </header>

          {article.featuredImage ? (
            <div className="overflow-hidden rounded-3xl">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="h-96 w-full object-cover"
              />
            </div>
          ) : null}

          <div
            className="prose max-w-none border border-slate-200 bg-white p-8 shadow-sm prose-headings:text-slate-900 prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {article.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}

          <Link
            href="/news"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            ← Back to News
          </Link>
        </article>
      </div>

      {related.length ? (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            You might also like...
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item._id}
                href={`/news/${item.slug}`}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {item.featuredImage ? (
                  <img
                    src={item.featuredImage}
                    alt={item.title}
                    className="h-36 w-full object-cover"
                  />
                ) : null}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary/80">
                      {item.category}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>
                  <p className="mt-4 text-xs font-semibold text-slate-500">
                    {formatDate(item.publishDate)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
