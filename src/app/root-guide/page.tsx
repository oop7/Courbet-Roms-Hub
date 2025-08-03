
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Download, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Rooting Guide',
    description: 'Learn how to easily root your Xiaomi Mi 11 Lite 4G (Courbet) on our custom ROMs using KernelSU. Step-by-step instructions for a safe rooting process.',
};

export default function RootGuidePage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
          Rooting Guide
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
          A step-by-step guide to root your Courbet on our custom ROMs.
        </p>
      </div>

      <Alert variant="destructive" className="mb-8 max-w-4xl mx-auto bg-destructive/10 border-destructive/30 text-destructive-foreground/80 [&>svg]:text-destructive/80">
        <Terminal className="h-4 w-4" />
        <AlertTitle className="text-destructive font-bold">Disclaimer</AlertTitle>
        <AlertDescription>
          Rooting your device and unlocking the bootloader will void your warranty and may carry risks. Proceed at your own risk. We are not responsible for any damage to your device. Always back up your data before proceeding.
        </AlertDescription>
      </Alert>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="text-2xl">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              All custom ROMs in this hub have KernelSU support built directly into their source-inline-built kernel, which simplifies the rooting process compared to traditional methods. <strong className="text-primary">You don't need to flash additional kernels or modify system partitions manually.</strong> You only need to install the appropriate root manager app to get started.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="text-2xl">Step-by-Step Rooting Process</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start">
              <span className="text-primary mr-4 text-2xl font-bold">1</span>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Flash Your Custom ROM</h3>
                <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                    <li>Flash your chosen custom ROM following the standard installation procedure.</li>
                    <li>Complete the initial setup and boot into the system.</li>
                </ol>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-primary mr-4 text-2xl font-bold">2</span>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Identify the Root Manager Type</h3>
                <p className="text-muted-foreground">Check the ROM's release page or description to determine which root manager is supported:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                    <li><strong>KernelSU</strong> (original)</li>
                    <li><strong>KernelSU Next</strong> (newer variant)</li>
                </ul>
              </div>
            </div>
            <div className="flex items-start">
                <span className="text-primary mr-4 text-2xl font-bold">3</span>
                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Download the Appropriate Manager</h3>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h4 className="font-semibold mb-2 text-foreground">For KernelSU:</h4>
                            <Button asChild variant="outline" className="w-full">
                                <a href="https://github.com/tiann/KernelSU/releases/download/v1.0.5/KernelSU_v1.0.5_12081-release.apk" target="_blank" rel="noopener noreferrer">
                                    <Download className="mr-2 h-4 w-4" />
                                    KernelSU Manager v1.0.5
                                </a>
                            </Button>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-foreground">For KernelSU Next:</h4>
                            <Button asChild variant="outline" className="w-full">
                                <a href="https://github.com/KernelSU-Next/KernelSU-Next/releases/download/v1.0.9/KernelSU_Next_v1.0.9_12797-release.apk" target="_blank" rel="noopener noreferrer">
                                    <Download className="mr-2 h-4 w-4" />
                                    KernelSU Next Manager v1.0.9
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-start">
                <span className="text-primary mr-4 text-2xl font-bold">4</span>
                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Install and Enable Root</h3>
                    <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                        <li>Install the downloaded APK file.</li>
                        <li>Open the KernelSU manager app.</li>
                        <li>The app should automatically detect kernel support and enable root access.</li>
                        <li>Grant root permissions to apps as needed.</li>
                    </ol>
                </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <AlertTriangle className="h-6 w-6 text-accent" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Always check the ROM's release page for the correct root manager type.</li>
                <li>Backup your data before flashing any ROM.</li>
                <li>Root access can void warranties and potentially compromise security.</li>
                <li>Keep the manager app updated for optimal compatibility.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="text-2xl">Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>If root is not detected, verify you downloaded the correct manager for your ROM.</li>
                <li>Ensure your ROM actually supports the root method (check ROM documentation).</li>
                <li>Try rebooting after installing the manager app.</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground/70">
              *This guide is specifically for MI 11 Lite 4G (Courbet) custom ROMs with built-in GKI kernel support.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
