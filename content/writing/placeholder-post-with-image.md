---
title: 'Placeholder Post With an Image'
date: '2026-01-10'
description: 'A second placeholder, kept because it carries an explicit article image.'
image: /images/writing/placeholder.png
imageAlt: 'A neutral placeholder graphic standing in for an article image'
---

This placeholder exists specifically to exercise the article-image path.

A post without `image` falls back to the site share card; a post with one
overrides it for OpenGraph and Twitter. Both behaviours are pinned by tests, so
deleting this file means retargeting the explicit-image cases in
`app/writing/[slug]/page.test.ts`.

An `image` must be a root-relative path under `public/` and must always be
paired with `imageAlt`.
