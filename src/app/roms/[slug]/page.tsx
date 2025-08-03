
import { getRomBySlug } from '@/lib/roms';
import { RomDetailClient } from '@/components/RomDetailClient';

export default function RomDetailPage({ params }: { params: { slug: string } }) {
  const rom = getRomBySlug(params.slug);

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
