
import type { PreviousRelease } from '@/lib/roms';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, KeyRound, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const PreviousReleaseDetails = ({ release }: { release: PreviousRelease }) => (
    <div className="space-y-4 pt-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground flex items-center"><ShieldCheck className="w-4 h-4 mr-2" /> Status</span>
         <Badge variant={release.status === 'Stable' ? 'default' : 'secondary'} className={release.status === 'Stable' ? 'bg-primary/20 text-primary border-primary/50' : 'bg-muted text-muted-foreground'}>
            {release.status}
        </Badge>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground flex items-center"><KeyRound className="w-4 h-4 mr-2" /> Root Method</span>
        <span className="font-medium">{release.rootMethod}</span>
      </div>
      <div>
        <h4 className="font-semibold mb-2">What's New:</h4>
        <ul className="space-y-2 text-sm">
          {release.whatsNew.map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button asChild variant="outline" className="w-full mt-2">
        <Link href={release.downloadLink} target="_blank" rel="noopener noreferrer">
          <Download className="mr-2 h-4 w-4" /> Download
        </Link>
      </Button>
    </div>
  );
