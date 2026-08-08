import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/ArticleLayout";
import { getWritingArticle, getWritingSlugs } from "@/data/writing";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getWritingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getWritingArticle(slug);
  if (!article) {
    return { title: "Writing" };
  }

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/writing/${article.slug}` },
  };
}

export default async function WritingArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getWritingArticle(slug);
  if (!article) notFound();

  return <ArticleLayout article={article} />;
}
