'use client';

import { useMemo, useState } from 'react';
import type { Rom } from '@/lib/roms';
import { RomCard } from '@/components/RomCard';

export function RomFilters({ roms }: { roms: Rom[] }) {
  const [query, setQuery] = useState('');
  const [androidVersion, setAndroidVersion] = useState('all');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const [maintainer, setMaintainer] = useState('all');

  const options = useMemo(() => ({
    androidVersions: [...new Set(roms.flatMap((rom) => rom.versions.map((version) => version.androidVersion)))].sort((a, b) => Number(b) - Number(a)),
    maintainers: [...new Set(roms.map((rom) => rom.maintainer))].sort(),
  }), [roms]);

  const filteredRoms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return roms.filter((rom) => {
      const matchesQuery = !normalizedQuery
        || rom.name.toLowerCase().includes(normalizedQuery)
        || rom.maintainer.toLowerCase().includes(normalizedQuery);
      const matchesAndroid = androidVersion === 'all'
        || rom.versions.some((version) => version.androidVersion === androidVersion);
      const matchesStatus = status === 'all'
        || rom.versions.some((version) => version.status === status);
      const matchesCategory = category === 'all' || rom.category === category;
      const matchesMaintainer = maintainer === 'all' || rom.maintainer === maintainer;
      return matchesQuery && matchesAndroid && matchesStatus && matchesCategory && matchesMaintainer;
    });
  }, [androidVersion, category, maintainer, query, roms, status]);

  const customRoms = filteredRoms.filter((rom) => rom.category !== 'port');
  const ports = filteredRoms.filter((rom) => rom.category === 'port');

  return (
    <>
      <div className="mb-10 grid gap-4 rounded-lg border border-border/60 bg-secondary/30 p-4 md:grid-cols-2 lg:grid-cols-5">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search ROMs or maintainers"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-primary focus:ring-2 lg:col-span-1"
          aria-label="Search ROMs or maintainers"
        />
        <select value={androidVersion} onChange={(event) => setAndroidVersion(event.target.value)} className="rounded-md border border-border bg-background px-3 py-2 text-sm" aria-label="Filter by Android version">
          <option value="all">All Android versions</option>
          {options.androidVersions.map((version) => <option key={version} value={version}>Android {version}</option>)}
        </select>
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-md border border-border bg-background px-3 py-2 text-sm" aria-label="Filter by status">
          <option value="all">All statuses</option>
          <option value="Stable">Stable</option>
          <option value="Beta">Beta</option>
        </select>
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-md border border-border bg-background px-3 py-2 text-sm" aria-label="Filter by category">
          <option value="all">ROMs and ports</option>
          <option value="rom">Custom ROMs</option>
          <option value="port">Ports</option>
        </select>
        <select value={maintainer} onChange={(event) => setMaintainer(event.target.value)} className="rounded-md border border-border bg-background px-3 py-2 text-sm" aria-label="Filter by maintainer">
          <option value="all">All maintainers</option>
          {options.maintainers.map((name) => <option key={name} value={name}>{name}</option>)}
        </select>
      </div>

      <p className="mb-6 text-sm text-muted-foreground" aria-live="polite">
        Showing {filteredRoms.length} of {roms.length} ROM entries.
      </p>

      {customRoms.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Custom ROMs</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {customRoms.map((rom) => <RomCard key={rom.slug} rom={rom} />)}
          </div>
        </section>
      )}

      {ports.length > 0 && (
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Ports</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ports.map((rom) => <RomCard key={rom.slug} rom={rom} />)}
          </div>
        </section>
      )}

      {filteredRoms.length === 0 && (
        <p className="rounded-lg border border-border/60 p-8 text-center text-muted-foreground">
          No ROMs match these filters.
        </p>
      )}
    </>
  );
}
