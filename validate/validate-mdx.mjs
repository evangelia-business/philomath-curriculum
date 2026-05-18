#!/usr/bin/env node
// validate/validate-mdx.mjs
// Validates every .mdx file at the repo root:
//   1. Frontmatter must have a "slug" field that matches the filename (without .mdx)
//   2. Body (content after frontmatter) must not be empty
//   3. Body must compile as valid MDX

import { readFileSync, readdirSync } from 'fs';
import { resolve, basename } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { compile } from '@mdx-js/mdx';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const repoRoot = resolve(__dirname, '..');

const mdxFiles = readdirSync(repoRoot).filter((f) => f.endsWith('.mdx'));

if (mdxFiles.length === 0) {
  console.error('ERROR: No .mdx files found at the repo root.');
  process.exit(1);
}

let hasErrors = false;

for (const filename of mdxFiles) {
  const slug = basename(filename, '.mdx');
  const filePath = resolve(repoRoot, filename);
  const raw = readFileSync(filePath, 'utf8');

  const { data: frontmatter, content: body } = matter(raw);

  // 1. Validate slug frontmatter
  if (!frontmatter.slug) {
    console.error(`ERROR [${filename}]: Missing "slug" frontmatter field.`);
    hasErrors = true;
    continue;
  }
  if (frontmatter.slug !== slug) {
    console.error(
      `ERROR [${filename}]: Frontmatter slug "${frontmatter.slug}" does not match filename slug "${slug}".`
    );
    hasErrors = true;
    continue;
  }

  // 2. Validate body is not empty
  if (!body.trim()) {
    console.error(`ERROR [${filename}]: Body content is empty.`);
    hasErrors = true;
    continue;
  }

  // 3. Compile MDX to catch syntax errors
  try {
    await compile(body);
  } catch (err) {
    console.error(`ERROR [${filename}]: MDX compilation failed.\n  ${err.message}`);
    hasErrors = true;
  }
}

if (hasErrors) {
  process.exit(1);
}

console.log(`✓ All ${mdxFiles.length} MDX file(s) are valid.`);
