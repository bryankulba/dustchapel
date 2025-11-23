import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
    canonicalUrl: z.string().url().optional(),
    order: z.number().optional()
  })
});

export const collections = { posts };
