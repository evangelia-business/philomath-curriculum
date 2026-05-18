# philomath-curriculum

A flat MDX content store for Philomath curriculum modules.

## Structure

One `.mdx` file per module lives at the **repo root**. The filename must match the module slug (e.g. `async-javascript.mdx`).

Each file must contain exactly one frontmatter field — `slug` — whose value matches the filename without `.mdx`:

```mdx
---
slug: async-javascript
---

Full MDX lesson content goes here…
```

## Modules

| Slug | File |
|------|------|
| async-javascript | async-javascript.mdx |
| async-ui-states | async-ui-states.mdx |
| browser-internals | browser-internals.mdx |
| component-architecture | component-architecture.mdx |
| component-boundaries | component-boundaries.mdx |
| controlled-vs-uncontrolled-inputs | controlled-vs-uncontrolled-inputs.mdx |
| custom-hooks | custom-hooks.mdx |
| derived-state | derived-state.mdx |
| effect-cleanup | effect-cleanup.mdx |
| form-state-patterns | form-state-patterns.mdx |
| memoization-basics | memoization-basics.mdx |
| performance-patterns | performance-patterns.mdx |
| props-rendering | props-rendering.mdx |
| rendering-lists | rendering-lists.mdx |
| server-and-client-components | server-and-client-components.mdx |
| state-colocation | state-colocation.mdx |
| state-management | state-management.mdx |
| system-design-frontend | system-design-frontend.mdx |

## Scripts

```bash
# Validate all .mdx files (slug match, non-empty body, valid MDX syntax)
npm run validate

# Format all .mdx files with Prettier
npm run format

# Check formatting without writing changes
npm run check
```

### Validation rules (`validate/validate-mdx.mjs`)

1. **Slug match** — the `slug` frontmatter field must exactly match the filename (without `.mdx`).
2. **Non-empty body** — lesson content must not be empty.
3. **Valid MDX** — the body must compile without errors via `@mdx-js/mdx`.