import { visit } from 'unist-util-visit';

// Wrap markdown images in figure tags and add lightbox-friendly attributes.
export default function remarkLightbox() {
  return (tree) => {
    visit(tree, 'image', (node) => {
      const alt = (node.alt || '').replace(/"/g, '&quot;');
      const rawTitle = node.title || '';
      const galleryMatch = rawTitle.match(/gallery\s*[:=]\s*([\w-]+)/i);
      const gallery = galleryMatch ? galleryMatch[1] : '';
      const captionText = rawTitle.replace(galleryMatch?.[0] || '', '').trim();
      const caption = captionText || alt;
      const galleryAttr = gallery ? ` data-gallery="${gallery}"` : '';
      const figCaption = caption ? `<figcaption>${caption}</figcaption>` : '';
      const html = `<figure class="md-figure"${galleryAttr}>
  <img src="${node.url}" alt="${alt}" loading="lazy" decoding="async" data-lightbox="image"${galleryAttr} />
  ${figCaption}
</figure>`;
      node.type = 'html';
      node.value = html;
      delete node.children;
    });
  };
}
