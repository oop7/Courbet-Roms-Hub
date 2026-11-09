'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
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
  const hasFilters = Boolean(query || androidVersion !== 'all' || status !== 'all' || category !== 'all' || maintainer !== 'all');
  const resetFilters = () => {
    setQuery('');
    setAndroidVersion('all');
    setStatus('all');
    setCategory('all');
    setMaintainer('all');
  };

  return (
    <>
      <div className="mb-10 rounded-2xl border border-primary/20 bg-secondary/30 p-4 shadow-lg shadow-black/10 backdrop-blur-sm md:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            Find a ROM
          </div>
          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <X className="h-3.5 w-3.5" />
              Clear filters
            </button>
          )}
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[minmax(220px,1.35fr)_repeat(4,minmax(0,1fr))]">
          <label className="relative block">
            <span className="sr-only">Search ROMs or maintainers</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search ROMs or maintainers"
              className="h-10 w-full rounded-lg border border-border/70 bg-background/70 pl-9 pr-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/80 focus:border-primary/70 focus:bg-background focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <select value={androidVersion} onChange={(event) => setAndroidVersion(event.target.value)} className="h-10 rounded-lg border border-border/70 bg-background/70 px-3 text-sm text-foreground outline-none transition-all focus:border-primary/70 focus:ring-2 focus:ring-primary/20" aria-label="Filter by Android version">
            <option value="all">All Android versions</option>
            {options.androidVersions.map((version) => <option key={version} value={version}>Android {version}</option>)}
          </select>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-10 rounded-lg border border-border/70 bg-background/70 px-3 text-sm text-foreground outline-none transition-all focus:border-primary/70 focus:ring-2 focus:ring-primary/20" aria-label="Filter by status">
            <option value="all">All statuses</option>
            <option value="Stable">Stable</option>
            <option value="Beta">Beta</option>
          </select>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-10 rounded-lg border border-border/70 bg-background/70 px-3 text-sm text-foreground outline-none transition-all focus:border-primary/70 focus:ring-2 focus:ring-primary/20" aria-label="Filter by category">
            <option value="all">ROMs and ports</option>
            <option value="rom">Custom ROMs</option>
            <option value="port">Ports</option>
          </select>
          <select value={maintainer} onChange={(event) => setMaintainer(event.target.value)} className="h-10 rounded-lg border border-border/70 bg-background/70 px-3 text-sm text-foreground outline-none transition-all focus:border-primary/70 focus:ring-2 focus:ring-primary/20" aria-label="Filter by maintainer">
            <option value="all">All maintainers</option>
            {options.maintainers.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>
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
