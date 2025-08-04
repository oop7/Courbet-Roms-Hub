
import type { PreviousRelease } from '@/lib/roms';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, KeyRound, ShieldCheck } from 'lucide-react';
import { DownloadButton } from './DownloadButton';
import { MobileDownloadInfo } from './MobileDownloadInfo';

export const PreviousReleaseDetails = ({ release }: { release: PreviousRelease }) => {
    const isCrDroid = release.downloadLink.includes('crdroid.net');
    
    return (
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
            
            {!isCrDroid && <MobileDownloadInfo />}
            
            <DownloadButton 
                url={release.downloadLink} 
                variant="outline" 
                size="default" 
                className="w-full mt-2"
            >
                Download
            </DownloadButton>
        </div>
    );
};
