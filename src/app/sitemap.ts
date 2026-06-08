import { MetadataRoute } from 'next'

const BASE = 'https://sadhvisamahita.com'

const pages = [
  { path: '',         priority: 1.0,  changeFreq: 'weekly'  },
  { path: '/about',   priority: 0.9,  changeFreq: 'monthly' },
  { path: '/katha',   priority: 0.9,  changeFreq: 'weekly'  },
  { path: '/seva',    priority: 0.8,  changeFreq: 'monthly' },
  { path: '/media',   priority: 0.7,  changeFreq: 'monthly' },
  { path: '/wisdom',  priority: 0.7,  changeFreq: 'weekly'  },
  { path: '/blog',    priority: 0.6,  changeFreq: 'weekly'  },
  { path: '/contact', priority: 0.8,  changeFreq: 'yearly'  },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const page of pages) {
    // Hindi (default) — no locale prefix
    entries.push({
      url: `${BASE}${page.path}`,
      priority: page.priority,
      changeFrequency: page.changeFreq,
      alternates: {
        languages: {
          hi: `${BASE}${page.path}`,
          en: `${BASE}/en${page.path}`,
        },
      },
    })
    // English — /en/ prefix
    entries.push({
      url: `${BASE}/en${page.path}`,
      priority: page.priority,
      changeFrequency: page.changeFreq,
      alternates: {
        languages: {
          hi: `${BASE}${page.path}`,
          en: `${BASE}/en${page.path}`,
        },
      },
    })
  }

  return entries
}
