---
title: 'Placeholder Post'
date: '2026-01-15'
description: 'A placeholder while real writing is being drafted. Replace or delete this once a first post is ready.'
---

This is placeholder copy. It exists so the site has a published post to build
against, and so the writing index, RSS feed, and post route all have something
real to render.

## Why this file is here

The production export cannot build `/writing/[slug]/` when
`generateStaticParams()` returns no published slugs, so removing every post
breaks `npm run build`. Keeping a placeholder avoids that.

## Replacing it

Add a Markdown file to `content/writing/`. The filename becomes the URL slug,
so `my-first-post.md` is served at `/writing/my-first-post/`. Frontmatter needs
`title`, `date`, and `description`. Set `draft: true` to preview a post locally
without publishing it.

Once a real post exists, delete this file.
