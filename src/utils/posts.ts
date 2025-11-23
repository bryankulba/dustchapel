import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '@config/site';

const includeEntry = (entry: CollectionEntry<'posts'>, includeDrafts: boolean) =>
  includeDrafts ? true : entry.data.draft !== true;

const sortEntries = (a: CollectionEntry<'posts'>, b: CollectionEntry<'posts'>) => {
  const orderA = a.data.order ?? 0;
  const orderB = b.data.order ?? 0;
  if (orderA !== orderB) return orderA - orderB;
  return b.data.date.getTime() - a.data.date.getTime();
};

export async function getSortedPosts(includeDrafts = import.meta.env.DEV) {
  const posts = await getCollection('posts', (entry) => includeEntry(entry, includeDrafts));
  return posts.sort(sortEntries);
}

export async function getPaginatedPosts(page = 1, includeDrafts = import.meta.env.DEV) {
  const posts = await getSortedPosts(includeDrafts);
  const perPage = site.itemsPerPage;
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    posts: posts.slice(start, end),
    totalPages,
    currentPage: page
  };
}

export async function getPostBySlug(slug: string, includeDrafts = import.meta.env.DEV) {
  const posts = await getCollection('posts', (entry) => entry.slug === slug && includeEntry(entry, includeDrafts));
  return posts[0];
}
