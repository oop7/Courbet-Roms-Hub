import { roms } from '@/lib/roms';
import { RomCard } from '@/components/RomCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ROMs & Ports',
  description: 'Browse custom ROMs and ports available for the Xiaomi Mi 11 Lite 4G (Courbet).',
};

export default function RomsPage() {
  const customRoms = roms.filter((rom) => rom.category !== 'port');
  const ports = roms.filter((rom) => rom.category === 'port');

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

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Custom ROMs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {customRoms.map((rom) => (
            <RomCard key={rom.slug} rom={rom} />
          ))}
        </div>
      </section>

      {ports.length > 0 && (
        <section className="space-y-6 mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Ports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ports.map((rom) => (
              <RomCard key={rom.slug} rom={rom} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
