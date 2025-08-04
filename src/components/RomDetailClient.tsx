
'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Code, ShieldCheck, Calendar, BookOpen, Clock, KeyRound, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Rom, RomVersion } from '@/lib/roms';
import { PreviousReleaseDetails } from '@/components/PreviousReleaseDetails';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DownloadButton } from './DownloadButton';
import { MobileDownloadInfo } from './MobileDownloadInfo';


const RomVersionDetails = ({ version }: { version: RomVersion }) => {
  const isCrDroid = version.downloadLink.includes('crdroid.net');
  
  return (
    <div className="space-y-8">
      <Card className="bg-secondary/50">
        <CardHeader>
          <CardTitle>ROM Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center"><ShieldCheck className="w-4 h-4 mr-2" /> Status</span>
            <Badge variant={version.status === 'Stable' ? 'default' : 'secondary'} className={version.status === 'Stable' ? 'bg-primary/20 text-primary border-primary/50' : 'bg-muted text-muted-foreground'}>
              {version.status}
            </Badge>
          </div>
           <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center"><Code className="w-4 h-4 mr-2" /> Android Version</span>
            <span className="font-medium">{version.androidVersion}</span>
          </div>
           <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center"><KeyRound className="w-4 h-4 mr-2" /> Root Method</span>
            <span className="font-medium">{version.rootMethod}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center"><Calendar className="w-4 h-4 mr-2" /> Last Updated</span>
            <span className="font-medium">{version.lastUpdated}</span>
          </div>
        </CardContent>
      </Card>
      
      {version.note && (
        <Alert className="bg-secondary/80">
          <Info className="h-4 w-4" />
          <AlertTitle>Please Note</AlertTitle>
          <AlertDescription>
            {version.note}
          </AlertDescription>
        </Alert>
      )}

      {!isCrDroid && <MobileDownloadInfo />}

      <DownloadButton 
        url={version.downloadLink}
        variant='default'
        size='lg'
        className="w-full shadow-glow-primary hover:shadow-none transition-all duration-300"
      >
        Download Latest
      </DownloadButton>

      <Card className="bg-secondary/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BookOpen className="w-6 h-6" /> What's New</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {version.whatsNew.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      {version.previousReleases && version.previousReleases.length > 0 && (
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Clock className="w-6 h-6" /> Previous Releases</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {version.previousReleases.map((release) => (
                <AccordionItem value={`${release.date}-${release.version}`} key={`${release.date}-${release.version}`}>
                  <AccordionTrigger>
                    <div className="flex justify-between w-full pr-4">
                      <span>{release.date}</span>
                      <span className="text-muted-foreground text-sm font-normal">Details</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <PreviousReleaseDetails release={release} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export function RomDetailClient({ rom }: { rom: Rom }) {
  const defaultTab = rom.versions[0]?.androidVersion || '';
  const numVersions = rom.versions.length;

  const gridColsMap: { [key: number]: string } = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  const gridColsClass = gridColsMap[numVersions] || 'grid-cols-4';

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-primary mb-2">
            {rom.name}
          </h1>
          <p className="text-lg text-muted-foreground">{rom.description}</p>
        </div>

        <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-lg">
          <Image src={rom.imageUrl} alt={rom.name} fill className="object-cover" data-ai-hint={rom.imageHint} />
        </div>
        
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className={`grid w-full ${gridColsClass}`}>
            {rom.versions.map(v => (
              <TabsTrigger key={v.androidVersion} value={v.androidVersion}>{v.androidVersion}</TabsTrigger>
            ))}
          </TabsList>
          {rom.versions.map(v => (
            <TabsContent key={v.androidVersion} value={v.androidVersion}>
              <RomVersionDetails version={v} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
