
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Rom } from '@/lib/roms';
import { ArrowRight, Calendar, Code, ShieldCheck, Activity, User } from 'lucide-react';

export function RomCard({ rom }: { rom: Rom }) {
  // Get the latest version to display on the card
  const latestVersion = [...rom.versions].sort((a, b) => parseInt(b.androidVersion) - parseInt(a.androidVersion))[0];

  return (
    <Card className="group flex flex-col overflow-hidden border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/80 hover:shadow-glow-primary">
      <CardContent className="flex-grow space-y-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
           <Image
             src={rom.imageUrl}
             alt={rom.name}
             fill
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
             className="object-cover transition-transform duration-500 group-hover:scale-105"
             data-ai-hint={rom.imageHint}
           />
        </div>
        <CardHeader className="space-y-2 p-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-primary">Latest release</p>
              <CardTitle className="text-2xl font-bold text-foreground">{rom.name}</CardTitle>
            </div>
            {rom.category === 'port' && <Badge variant="secondary">Port</Badge>}
          </div>
          <CardDescription className="line-clamp-2">{rom.description}</CardDescription>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            {rom.maintainer}
          </p>
        </CardHeader>
        <div className="flex flex-wrap gap-2 items-center">
          {rom.isActive && (
            <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20">
              <Activity className="w-3 h-3 mr-1" /> Active
            </Badge>
          )}
          <Badge variant={latestVersion.status === 'Stable' ? 'default' : 'secondary'} className={latestVersion.status === 'Stable' ? 'bg-primary/20 text-primary border-primary/50' : 'bg-muted text-muted-foreground border-border'}>
            <ShieldCheck className="w-3 h-3 mr-1" /> {latestVersion.status}
          </Badge>
          <Badge variant="outline"><Code className="w-3 h-3 mr-1" /> Android {latestVersion.androidVersion}</Badge>
          <Badge variant="outline"><Calendar className="w-3 h-3 mr-1" /> {latestVersion.lastUpdated}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={`/roms/${rom.slug}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
