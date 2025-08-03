import { roms } from '@/lib/roms';
import { RomCard } from '@/components/RomCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Custom ROMs',
  description: 'Browse the complete collection of the latest and most stable custom ROMs available for the Xiaomi Mi 11 Lite 4G (Courbet).',
};

export default function RomsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
          Available ROMs
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Browse the collection of custom ROMs available for the Mi 11 Lite 4G (Courbet).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roms.map((rom) => (
          <RomCard key={rom.slug} rom={rom} />
        ))}
      </div>
    </div>
  );
}
