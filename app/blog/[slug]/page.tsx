import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { BlogArticle } from "@/components/blog/blog-article";
import { JsonLd } from "@/components/seo/json-ld";
import { PROJECTS } from "@/components/projects/project-data";
import { BLOG_POSTS, formatPostDate, getBlogPost, readingMinutes } from "@/lib/blog-posts";
import { getService } from "@/lib/services-data";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, ORGANIZATION_ID, SITE_URL, WEBSITE_ID } from "@/lib/seo";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const base = createPageMetadata({
    title: post.seoTitle,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.heroImage,
    imageAlt: post.heroAlt,
    type: "article",
  });
  return {
    ...base,
    openGraph: { ...base.openGraph, type: "article", publishedTime: post.publishedAt, section: post.category },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const index = BLOG_POSTS.findIndex((post) => post.slug === slug);
  if (index === -1) notFound();

  const post = BLOG_POSTS[index];
  const service = getService(post.serviceSlug);
  const projects = post.relatedProjectIds
    .map((id) => PROJECTS.find((project) => project.id === id))
    .filter((project): project is NonNullable<typeof project> => Boolean(project))
    .map(({ id, title, image, location, category }) => ({ id, title, image, location, category }));
  // The next two articles in order (wrapping), so every article links onward.
  const moreArticles = [1, 2].map((offset) => {
    const other = BLOG_POSTS[(index + offset) % BLOG_POSTS.length];
    return { post: other, minutes: readingMinutes(other), date: formatPostDate(other.publishedAt) };
  });
  const url = absoluteUrl(`/blog/${post.slug}`);

  return (
    <main>
      <JsonLd
        id={`blogposting-${post.slug}`}
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${url}#article`,
          headline: post.title,
          description: post.excerpt,
          image: absoluteUrl(post.heroImage),
          url,
          mainEntityOfPage: url,
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          inLanguage: "en-IN",
          articleSection: post.category,
          author: { "@id": ORGANIZATION_ID },
          publisher: { "@id": ORGANIZATION_ID },
          isPartOf: { "@id": WEBSITE_ID },
          ...(service ? { about: { "@id": `${SITE_URL}/services/${service.slug}#service` } } : {}),
        }}
      />
      <JsonLd
        id={`blog-breadcrumb-${post.slug}`}
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <BlogArticle
        post={post}
        minutes={readingMinutes(post)}
        date={formatPostDate(post.publishedAt)}
        service={service ? { slug: service.slug, title: service.title, tagline: service.tagline } : undefined}
        projects={projects}
        moreArticles={moreArticles}
      />
      <Footer />
    </main>
  );
}
