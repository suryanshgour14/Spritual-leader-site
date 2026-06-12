import fs from 'fs'
import path from 'path'

export interface BlogPost {
  title: string
  titleHindi: string | null
  slug: string
  date: string
  excerpt: string
  coverImage: string | null
  tags: string[]
  content: ContentBlock[]
}

export type ContentBlock =
  | { type: 'text';    value: string }
  | { type: 'heading'; value: string }
  | { type: 'quote';   value: string; attribution?: string | null }
  | { type: 'image';   src: string;   caption?: string | null }
  | { type: 'images';  srcs: string[]; captions?: string[] }

export function getAllPosts(): BlogPost[] {
  const blogDir = path.join(process.cwd(), 'content/blog')
  if (!fs.existsSync(blogDir)) return []

  const posts = fs
    .readdirSync(blogDir)
    .filter(f => f.endsWith('.json'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(blogDir, filename), 'utf-8')
      return JSON.parse(raw) as BlogPost
    })

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find(p => p.slug === slug) ?? null
}

export function getAllSlugs(): string[] {
  return getAllPosts().map(p => p.slug)
}
