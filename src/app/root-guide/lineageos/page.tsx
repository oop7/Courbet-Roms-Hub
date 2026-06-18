import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Download, AlertTriangle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/CodeBlock';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'KernelSU Next Root Guide - LineageOS (Omer)',
    description: 'Learn how to root LineageOS 23.2 (Omer) on Xiaomi Mi 11 Lite 4G (Courbet) by flashing the custom KernelSU Next boot image.',
};

export default function LineageOSRootGuidePage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
          LineageOS Rooting Guide
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Specific rooting guide for LineageOS (Omer) using KernelSU Next on the Xiaomi Mi 11 Lite 4G.
        </p>
      </div>

      <Alert variant="destructive" className="mb-8 max-w-4xl mx-auto bg-destructive/10 border-destructive/30 text-destructive-foreground/80 [&>svg]:text-destructive/80">
        <Terminal className="h-4 w-4" />
        <AlertTitle className="text-destructive font-bold">Disclaimer</AlertTitle>
        <AlertDescription>
          Rooting your device will void your warranty and may carry risks. Proceed at your own risk. We are not responsible for any damage to your device. Always back up your data before proceeding.
        </AlertDescription>
      </Alert>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="text-2xl">Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              This LineageOS (Omer) ROM is non-rooted by default. However, it features built-in kernel support for KernelSU Next.
            </p>
            <p>
              To enable root access, you need to flash the custom boot image (<code>KSU-NEXT_boot.img</code>) containing KernelSU Next and then install the KernelSU Next Manager app on your device.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="text-2xl">Required Downloads</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">Download all of these files before starting the rooting process:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                <a href="https://drive.google.com/file/d/14xIt7-a5I5YE4FH0xo2Cf1bxjlPxBtmY/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <Download className="h-5 w-5 text-primary" />
                  <span className="font-semibold">KSU-NEXT boot.img</span>
                  <span className="text-xs text-muted-foreground">Custom Boot Image</span>
                </a>
              </Button>

              <Button asChild variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                <a href="https://github.com/KernelSU-Next/KernelSU-Next/releases/download/v3.2.0/KernelSU_Next_v3.2.0-spoofed_33129-release.apk" target="_blank" rel="noopener noreferrer">
                  <Download className="h-5 w-5 text-primary" />
                  <span className="font-semibold">KSU Next Manager (Spoofed)</span>
                  <span className="text-xs text-muted-foreground">Manager APK (Spoofed version)</span>
                </a>
              </Button>

              <Button asChild variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                <a href="https://github.com/KernelSU-Next/KernelSU-Next/releases/download/v3.2.0/KernelSU_Next_v3.2.0_33129-release.apk" target="_blank" rel="noopener noreferrer">
                  <Download className="h-5 w-5 text-primary" />
                  <span className="font-semibold">KSU Next Manager (Standard)</span>
                  <span className="text-xs text-muted-foreground">Manager APK (Standard version)</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="text-2xl">Step-by-Step Flashing & Rooting Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start">
              <span className="text-primary mr-4 text-2xl font-bold">1</span>
              <div className="flex-1 text-muted-foreground">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Prerequisites</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Your phone's bootloader must be unlocked.</li>
                  <li>You must have ADB & Fastboot drivers installed on your PC.</li>
                  <li>Ensure your device is fully booted and working on LineageOS (Omer) first.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start border-t border-border/40 pt-6">
              <span className="text-primary mr-4 text-2xl font-bold">2</span>
              <div className="flex-1 text-muted-foreground">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Reboot to Fastboot</h3>
                <p className="mb-2">Enable USB Debugging on your phone, then run the following command or reboot the phone manually holding <code>Power + Volume Down</code> to enter fastboot mode:</p>
                <CodeBlock command="adb reboot bootloader" />
              </div>
            </div>

            <div className="flex items-start border-t border-border/40 pt-6">
              <span className="text-primary mr-4 text-2xl font-bold">3</span>
              <div className="flex-1 text-muted-foreground">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Flash the custom boot.img</h3>
                <p className="mb-2">Open a terminal or command prompt on your PC in the folder where you saved the downloaded <code>KSU-NEXT_boot.img</code>, and flash it with fastboot:</p>
                <CodeBlock command="fastboot flash boot KSU-NEXT_boot.img" />
              </div>
            </div>

            <div className="flex items-start border-t border-border/40 pt-6">
              <span className="text-primary mr-4 text-2xl font-bold">4</span>
              <div className="flex-1 text-muted-foreground">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Reboot to System</h3>
                <p className="mb-2">Reboot the phone normally:</p>
                <CodeBlock command="fastboot reboot" />
              </div>
            </div>

            <div className="flex items-start border-t border-border/40 pt-6">
              <span className="text-primary mr-4 text-2xl font-bold">5</span>
              <div className="flex-1 text-muted-foreground">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Install the KernelSU Next Manager</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Copy one of the downloaded KernelSU Next Manager APKs to your phone.</li>
                  <li>Install the APK file.</li>
                  <li>Open the <strong>KernelSU Next</strong> manager app.</li>
                  <li>Root access should now be shown as active/working! You can start granting root permissions and flashing modules.</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-accent" />
              Troubleshooting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Bootloops:</strong> If your phone does not boot after flashing, reboot to recovery and dirty flash the ROM ZIP file to restore the stock boot image.</li>
              <li><strong>Root Not Detected:</strong> Make sure you have installed the correct and latest KernelSU Next manager APK matching the GKI version of the custom boot image.</li>
              <li><strong>Manager Version:</strong> For most users, the standard APK version is recommended. Use the spoofed version only if you require spoofing features for specific apps.</li>
            </ul>
            <div className="pt-4 border-t border-border/40 flex justify-between items-center text-sm">
              <Link href="/flashing-guide/lineageos" className="text-primary hover:underline flex items-center gap-1 font-medium">
                Back to LineageOS Flashing Guide <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
