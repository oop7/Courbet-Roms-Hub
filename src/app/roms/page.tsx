import { roms } from '@/lib/roms';
import { RomFilters } from '@/components/RomFilters';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ROMs & Ports',
  description: 'Browse custom ROMs and ports available for the Xiaomi Mi 11 Lite 4G (Courbet).',
};

export default function RomsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
          Available ROMs & Ports
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Browse the collection available for the Mi 11 Lite 4G (Courbet).
        </p>
      </div>

      <RomFilters roms={roms} />
    </div>
  );
}
