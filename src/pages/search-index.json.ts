import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || data.draft !== true);

  const index = posts.map((post) => ({
    title: post.data.title,
    slug: post.slug,
    description: post.data.description,
    tags: post.data.tags ?? [],
    url: `/blog/${post.slug}`
  }));

  return new Response(JSON.stringify(index), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export const prerender = true;
