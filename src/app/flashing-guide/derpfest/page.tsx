import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, HardDrive, ShieldCheck, Trash2, AlertTriangle } from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock';

const Step = ({ num, title, children }: { num: string | number; title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-background/40 p-5 md:flex-row md:gap-4">
    <span className="text-primary text-2xl font-bold leading-none md:min-w-10">{num}</span>
    <div className="w-full space-y-3">
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      <div className="space-y-4 text-muted-foreground">{children}</div>
    </div>
  </div>
);

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

export default function DerpFestFlashingGuidePage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
          DerpFest Flashing Guide
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Specific flashing steps for DerpFest on the Xiaomi Mi 11 Lite 4G (Courbet).
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <SectionCard title="Before You Start" icon={<BookOpen className="h-6 w-6 text-accent" />}>
          <Alert className="bg-primary/10 border-primary/30">
            <AlertTriangle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-bold">Important</AlertTitle>
            <AlertDescription>
              This page is only for DerpFest. Keep a full backup before flashing, and make sure your bootloader is already unlocked.
            </AlertDescription>
          </Alert>

          <Step num="1" title="Extract the recovery image">
            <p>Open the DerpFest ROM zip and extract recovery.img from it.</p>
            <p>Put recovery.img in the same folder where you will run fastboot and ADB.</p>
            <CodeBlock command="recovery.img" />
          </Step>

          <Step num="2" title="Go to fastboot">
            <p>Power off the phone, then hold <strong className="font-semibold text-foreground">Power + Volume Down</strong> to boot into fastboot mode.</p>
            <p>Confirm the connection from your PC.</p>
            <CodeBlock command="fastboot devices" />
          </Step>
        </SectionCard>

        <SectionCard title="Clean Flash" icon={<HardDrive className="h-6 w-6 text-accent" />}>
          <Alert className="bg-primary/10 border-primary/30">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-bold">Clean flash</AlertTitle>
            <AlertDescription>
              Use this when flashing DerpFest for the first time or when coming from another ROM.
            </AlertDescription>
          </Alert>

          <Step num="3" title="Flash the recovery">
            <p>Flash the recovery image from the folder that contains recovery.img.</p>
            <CodeBlock command="fastboot flash recovery recovery.img" />
            <p>Then boot directly into recovery.</p>
            <CodeBlock command="fastboot reboot recovery" />
          </Step>

          <Step num="4" title="Format data">
            <p>In DerpFest recovery, go to Wipe → Format Data / Factory Reset.</p>
            <p>Type yes exactly and confirm.</p>
          </Step>

          <Step num="5" title="Flash the ROM">
            <p>Go to Apply Update → Apply from ADB.</p>
            <p>On your PC, sideload the DerpFest zip from the folder where it is stored.</p>
            <CodeBlock command="adb sideload DerpFest-vXX.X-YYYYMMDD-yourdevice-Official-Stable.zip" />
            <p>Wait for Install complete.</p>
          </Step>

          <Step num="6" title="Reboot">
            <p>Reboot to system and let the first boot finish.</p>
          </Step>
        </SectionCard>

        <SectionCard title="Dirty Flash" icon={<Trash2 className="h-6 w-6 text-accent" />}>
          <Alert className="bg-secondary/80">
            <Trash2 className="h-4 w-4" />
            <AlertTitle className="font-bold">Same ROM only</AlertTitle>
            <AlertDescription>
              Dirty flash is for updating DerpFest to a newer build on the same Android version.
            </AlertDescription>
          </Alert>

          <Step num="8" title="Flash the update">
            <p>Boot into recovery and sideload the newer DerpFest zip.</p>
            <CodeBlock command="adb sideload DerpFest-vXX.X-YYYYMMDD-yourdevice-Official-Stable.zip" />
          </Step>

          <Step num="9" title="Wipe cache only">
            <p>After flashing, go to Wipe → format cache partition.</p>
            <p>Do not format data for a dirty flash.</p>
          </Step>
        </SectionCard>
      </div>
    </div>
  );
}