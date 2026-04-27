import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { BashComparison } from "@/interactives/components/bash-comparison";
import { SandboxAnimation } from "@/interactives/components/sandbox-animation";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.metadata.title,
    description: post.metadata.description,
  };
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.metadata.date));

  return (
    <div className="flex flex-col items-center min-h-screen px-6 font-sans">
      <div className="w-full max-w-2xl">

        <header className="py-14 mb-8 md:mt-20 mt-10 flex justify-center w-full">
          <Link href="https://github.com/capsulerun/capsule" className="hover:opacity-80 transition-opacity">
            <img src="/logo.svg" alt="Capsule logo" height={64} width={64} className="rounded-md" />
          </Link>
        </header>

        <main className="mb-24">
          <article className="prose prose-zinc prose-invert prose-lg max-w-none prose-h2:mt-8 prose-h3:mt-4">
            <header className="mb-8 not-prose">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 leading-[1.15] mb-4">
                {post.metadata.title}
              </h1>
              <time className="text-zinc-400 text-base font-medium">
                {formattedDate}
              </time>
            </header>

            <MDXRemote source={post.content} components={{ BashComparison, SandboxAnimation }} />
          </article>
        </main>
      </div>
    </div>
  );
}
