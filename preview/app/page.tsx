import Link from 'next/link';
import { readdir } from 'fs/promises';
import path from 'path';

async function getPosts() {
  const postsDir = path.join(process.cwd(), '..');
  const files = await readdir(postsDir);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace('.mdx', ''),
      filename: file,
    }));
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main>
      <header style={{ marginBottom: '2.5rem' }}>
        <img src="/mdx-guide.svg" alt="MDX Guide" width={40} height={40} style={{ marginBottom: '1rem' }} />
        <h1>MDX Preview</h1>
        <p style={{ color: 'var(--color-muted)', marginTop: '0.5rem' }}>
          {posts.length} post{posts.length !== 1 ? 's' : ''} found
        </p>
      </header>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {posts.map(({ slug }) => (
          <li key={slug} style={{ marginBottom: '0.75rem' }}>
            <Link href={`/${slug}`}>{slug}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
