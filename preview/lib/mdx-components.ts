import type { MDXComponents } from 'mdx/types';

export const mdxComponents: MDXComponents = {};

export const blogMdxConfig = {
  prettyCode: {
    theme: 'github-dark',
    keepBackground: false,
  },
  autolinkHeadings: {
    behavior: 'wrap' as const,
    properties: {
      className: ['anchor'],
    },
  },
};
