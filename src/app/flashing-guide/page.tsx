
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Download, AlertTriangle, ShieldCheck, Trash2, Layers, Tv, FileZip, Battery, Cable, BookUser, Cpu, Clock, HelpCircle, HardDrive, Clipboard, Check } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const SectionCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <Card className="bg-secondary/50">
    <CardHeader>
      <CardTitle className="flex items-center gap-3 text-2xl">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6 text-muted-foreground">
      {children}
    </CardContent>
  </Card>
);

const Step = ({ num, title, children }: { num: string | number; title: string; children: React.ReactNode }) => (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <span className="text-primary text-2xl font-bold">{num}</span>
        <div className="w-full">
            <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
            <div className="space-y-4 text-muted-foreground">{children}</div>
        </div>
    </div>
);

const CodeBlock = ({ command }: { command: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
    };

    return (
        <div className="bg-muted/50 border border-border rounded-lg p-3 pr-12 relative group my-2">
            <pre className="text-sm text-foreground font-code overflow-x-auto whitespace-pre-wrap break-words">
                <code>{command}</code>
            </pre>
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleCopy}
                aria-label="Copy command"
            >
                {copied ? <Check className="h-4 w-4 text-primary" /> : <Clipboard className="h-4 w-4" />}
            </Button>
        </div>
    );
};


export default function FlashingGuidePage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
          Complete Flashing Guide
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
          For MI 11 Lite 4G (Courbet) Custom ROMs
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-8">

        <SectionCard title="Prerequisites" icon={<BookUser className="h-6 w-6 text-accent" />}>
           <Step num="1" title="Unlocked Bootloader">
              <p>Your Mi 11 Lite 4G's bootloader <strong className="font-semibold text-foreground">must be unlocked</strong> before proceeding.</p>
              <Alert variant="destructive" className="bg-destructive/10 border-destructive/30 text-destructive-foreground/80 [&>svg]:text-destructive/80">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Unlocking the bootloader will void your warranty and erase all data on your device.
                </AlertDescription>
              </Alert>
              <Button asChild variant="outline" className="w-full">
                <a href="https://youtu.be/oOXQ7XhqeWk" target="_blank" rel="noopener noreferrer">
                  <Tv className="mr-2" /> Unlocking Tutorial
                </a>
              </Button>
            </Step>
            
            <Step num="2" title="Custom Recovery Setup">
                <p>Required Recovery: <strong className="font-semibold text-foreground">OrangeFox Recovery</strong></p>
                <div className="flex flex-col gap-4">
                    <Button asChild variant="outline" className="w-full">
                        <a href="https://cyfuture.dl.sourceforge.net/project/courbet-roms/OrangeFox_R12.1_A14_courbet.zip?viasf=1" target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2" /> OrangeFox R12.1 A14
                        </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                        <a href="https://master.dl.sourceforge.net/project/twrp-youngherna/TWRP-3.7.0-courbet-ygherna.img?viasf=1" target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2" /> TWRP 3.7.0 (for initial flash)
                        </a>
                    </Button>
                </div>
                <div className="space-y-2 pt-2">
                    <h4 className="font-semibold text-foreground">Important Recovery Installation Process:</h4>
                    <ol className="list-decimal list-inside space-y-3 pl-4">
                        <li>
                            <div>First flash <strong className="font-semibold text-foreground">TWRP</strong> via fastboot:</div>
                            <CodeBlock command="fastboot flash recovery TWRP-3.7.0-courbet-ygherna.img" />
                        </li>
                        <li>
                            <div>Boot into TWRP:</div>
                            <CodeBlock command="fastboot reboot recovery" />
                        </li>
                        <li>In TWRP, select <strong className="font-semibold text-foreground">Install</strong> and flash the <strong className="font-semibold text-foreground">OrangeFox ZIP file</strong> from your SD Card or USB-OTG.</li>
                        <li>After flashing, go to <strong className="font-semibold text-foreground">Reboot</strong> and select <strong className="font-semibold text-foreground">Recovery</strong> to boot into OrangeFox.</li>
                    </ol>
                    <p className="text-sm pt-2 text-muted-foreground/80 italic">All ROMs are tested with OrangeFox. Other recoveries are not officially supported.</p>
                </div>
            </Step>

            <Step num="3" title="Required Files">
              <ul className="list-disc list-inside space-y-2">
                <li>Your chosen Custom ROM ZIP file from the <Link href="/roms" className="text-primary hover:underline">ROMs page</Link>.</li>
                <li>GApps package (if the ROM needs it). We recommend <a href="https://sourceforge.net/projects/nikgapps/files/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">NikGapps Core</a>.</li>
                <li>A complete backup of your important data, stored on an external device.</li>
              </ul>
            </Step>
            
            <Step num="4" title="Device Preparation">
               <ul className="list-disc list-inside space-y-2">
                    <li><strong className="font-semibold text-foreground">Battery</strong>: Ensure a minimum of 60% charge.</li>
                    <li><strong className="font-semibold text-foreground">Backup</strong>: Create a full backup of your current system and data.</li>
                    <li><strong className="font-semibold text-foreground">USB Cable</strong>: Use a reliable cable for a stable connection.</li>
              </ul>
            </Step>
        </SectionCard>

        <SectionCard title="Flashing Methods" icon={<Layers className="h-6 w-6 text-accent" />}>
            <Alert className="bg-primary/10 border-primary/30">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary font-bold">Clean Flash</AlertTitle>
                <AlertDescription>
                   A clean flash is <strong className="font-semibold text-foreground">REQUIRED</strong> when coming from a different ROM (e.g., EvolutionX to LineageOS), updating to a different Android version (e.g., EvolutionX A15 &rarr; EvolutionX A16), or switching between major ROM updates. This method erases user data.
                </AlertDescription>
            </Alert>
            <ol className="list-decimal list-inside space-y-3 pl-4 text-muted-foreground">
              <li>Boot into OrangeFox Recovery.</li>
              <li>Tap the <strong className='font-semibold text-foreground'>trash can icon</strong> at the bottom of the screen, then select <strong className='font-semibold text-foreground'>Format data</strong>. Type <strong className='font-semibold text-foreground'>yes</strong> to confirm.</li>
              <li>Return to the main menu, select <strong className='font-semibold text-foreground'>Install</strong>, and flash your ROM ZIP file.</li>
              <li>(Optional) Without rebooting, flash your GApps package if required.</li>
              <li>Return to the main menu and select <strong className='font-semibold text-foreground'>Reboot</strong> and then <strong className='font-semibold text-foreground'>System</strong>.</li>
            </ol>
            <Alert className="bg-secondary/80">
                <Trash2 className="h-4 w-4" />
                <AlertTitle className="font-bold">Dirty Flash</AlertTitle>
                <AlertDescription>
                    This method is only for updating the <strong className="font-semibold text-foreground">SAME ROM</strong> to a newer version on the <strong className="font-semibold text-foreground">SAME Android version</strong> (e.g., EvolutionX A15 v1.0 &rarr; v1.1). It keeps your data.
                </AlertDescription>
            </Alert>
            <ol className="list-decimal list-inside space-y-3 pl-4 text-muted-foreground">
              <li>Boot into OrangeFox Recovery.</li>
              <li>Select <strong className='font-semibold text-foreground'>Install</strong> and flash the updated ROM ZIP file.</li>
              <li>(Optional) Re-flash GApps if they are not automatically restored.</li>
              <li>Wipe the <strong className='font-semibold text-foreground'>Dalvik/ART cache</strong>.</li>
              <li>Reboot to System.</li>
            </ol>
        </SectionCard>

        <SectionCard title="Post-Flash & Troubleshooting" icon={<HelpCircle className="h-6 w-6 text-accent" />}>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-foreground flex items-center gap-2"><Clock className="w-5 h-5"/>First Boot & Important Notes</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>The first boot can take up to <strong className="font-semibold text-foreground">5 minutes</strong>. If it takes longer, the ROM has likely failed to boot.</li>
              <li>We do <strong className="font-semibold text-foreground">not</strong> provide support for issues caused by using recoveries other than the recommended OrangeFox.</li>
              <li>Always read the specific release notes for the ROM you are flashing.</li>
              <li>Be patient with development. This is a voluntary community effort.</li>
            </ul>
          </div>
           <div>
            <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground flex items-center gap-2"><AlertTriangle className="w-5 h-5"/>Common Issues</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong className='font-semibold text-foreground'>Boot Issues:</strong> If the ROM doesn't boot in 5 minutes, re-attempt the installation using the Clean Flash method, ensuring you formatted data correctly. Verify ROM compatibility.</li>
              <li><strong className='font-semibold text-foreground'>Recovery Issues:</strong> Verify that you have correctly installed and are using the recommended version of OrangeFox recovery.</li>
            </ul>
          </div>
          <p className="text-center text-sm text-muted-foreground/80 pt-6 italic">Made with ❤️ by the MI 11 Lite 4G community</p>
        </SectionCard>
      </div>
    </div>
  );
}
