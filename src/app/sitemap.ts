import { MetadataRoute } from 'next';
import { roms } from '@/lib/roms';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://courbet-roms-hub.com'; // Replace with your actual domain

  // Static pages
  const staticRoutes = [
    '',
    '/roms',
    '/root-guide',
    '/flashing-guide',
    '/about',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic ROM pages
  const romRoutes = roms.map((rom) => ({
    url: `${siteUrl}/roms/${rom.slug}`,
    lastModified: new Date(rom.versions[0].lastUpdated).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...romRoutes];
}
