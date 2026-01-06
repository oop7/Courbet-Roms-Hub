
import { Metadata } from 'next';
import { getRomBySlug } from '@/lib/roms';
import { RomDetailClient } from '@/components/RomDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const rom = getRomBySlug(slug);

  if (!rom) {
    return {
      title: 'ROM Not Found',
      description: 'The requested ROM could not be found.',
    };
  }

  return {
    title: rom.name,
    description: rom.description,
    openGraph: {
      title: `${rom.name} for Xiaomi Mi 11 Lite 4G`,
      description: rom.description,
      images: [
        {
          url: rom.imageUrl,
          width: 1200,
          height: 630,
          alt: `${rom.name} Preview`,
        },
      ],
    },
  };
}

export default async function RomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rom = getRomBySlug(slug);

  if (!rom) {
    return (
      <div className="container py-12 md:py-16 text-center">
        <h1 className="text-4xl font-bold">ROM Not Found</h1>
        <p className="text-muted-foreground mt-4">The ROM you are looking for does not exist.</p>
      </div>
    );
  }

  return <RomDetailClient rom={rom} />;
}
