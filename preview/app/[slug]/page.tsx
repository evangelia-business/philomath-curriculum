import { readFile, readdir } from 'fs/promises';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents, blogMdxConfig } from '../../lib/mdx-components';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

const postsDir = path.join(process.cwd(), '..');

export async function generateStaticParams() {
  const files = await readdir(postsDir);

  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace('.mdx', ''),
    }));
}

async function getPost(slug: string) {
  const filePath = path.join(postsDir, `${slug}.mdx`);
  const content = await readFile(filePath, 'utf8');
  return content;
}

const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [rehypePrettyCode, blogMdxConfig.prettyCode] as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [rehypeAutolinkHeadings, blogMdxConfig.autolinkHeadings] as any,
  ],
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getPost(slug);

  return (
    <>
      <nav style={{ marginBottom: '2rem' }}>
        <Link href="/">← Back to posts</Link>
      </nav>
      <main>
        <MDXRemote source={content} components={mdxComponents} options={{ mdxOptions }} />
      </main>
    </>
  );
}
