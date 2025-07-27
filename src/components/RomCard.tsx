
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Rom } from '@/lib/roms';
import { ArrowRight, Calendar, Code, ShieldCheck } from 'lucide-react';

export function RomCard({ rom }: { rom: Rom }) {
  // Get the latest version to display on the card
  const latestVersion = rom.versions.sort((a, b) => parseInt(b.androidVersion) - parseInt(a.androidVersion))[0];

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:border-primary/80 border-border bg-card hover:shadow-glow-primary">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">{rom.name}</CardTitle>
        <CardDescription>{rom.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="relative aspect-video w-full rounded-lg overflow-hidden">
           <Image src={rom.imageUrl} alt={rom.name} fill className="object-cover" data-ai-hint={rom.imageHint} />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
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
