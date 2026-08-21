import type { MetadataRoute } from 'next'
import { PROJECTS, SITE_URL } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...PROJECTS.map((project) => ({
      url: `${SITE_URL}/case-study/${project.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
