import rss from '@astrojs/rss';
import { site } from '../config/site';
import { getSortedPosts } from '../utils/posts';

export async function GET(context) {
  const posts = await getSortedPosts(import.meta.env.DEV);
  const published = posts.filter((post) => import.meta.env.DEV || !post.data.draft);

  return rss({
    title: site.title,
    description: site.description,
    site: site.siteUrl,
    items: published.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}`
    }))
  });
}

export const prerender = true;
