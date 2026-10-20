import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogIndex } from "@/components/blog/blog-index";
import { JsonLd } from "@/components/seo/json-ld";
import { BLOG_POSTS, formatPostDate, readingMinutes } from "@/lib/blog-posts";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, ORGANIZATION_ID, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Journal — Architecture & Interior Design Guides",
  description:
    "Practical guides from Morphic Spaces on home architecture, interiors, 3D visualization, landscape, design consultancy and renovation in the Chandigarh Tricity.",
  path: "/blog",
  image: "/images/projects/interior-design/residence-banur-interior.jpg",
  imageAlt: "Residence at Banur interior by Morphic Spaces",
});

export default function BlogPage() {
  // Dates and reading times are computed on the server so the client never
  // re-formats them (avoids locale/timezone hydration mismatches).
  const cards = BLOG_POSTS.map((post) => ({ post, minutes: readingMinutes(post), date: formatPostDate(post.publishedAt) }));

  return (
    <main>
      <JsonLd
        id="blog-schema"
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${SITE_URL}/blog#blog`,
          name: "Morphic Spaces Journal",
          url: absoluteUrl("/blog"),
          publisher: { "@id": ORGANIZATION_ID },
          blogPost: BLOG_POSTS.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            url: absoluteUrl(`/blog/${post.slug}`),
            datePublished: post.publishedAt,
          })),
        }}
      />
      <JsonLd
        id="blog-breadcrumb"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/blog" },
        ])}
      />
      <BlogHero articleCount={BLOG_POSTS.length} />
      <BlogIndex cards={cards} />
      <Footer />
    </main>
  );
}
