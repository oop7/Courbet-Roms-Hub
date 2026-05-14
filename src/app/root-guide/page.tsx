import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Download, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/CodeBlock';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Rooting Guide',
    description: 'Learn how to easily root your Xiaomi Mi 11 Lite 4G (Courbet) on our custom ROMs using KernelSU Next. Step-by-step instructions for a safe rooting process.',
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
              All custom ROMs that by melo have KernelSU support built directly into their kernel, which simplifies the rooting process. You only need to install the KernelSU Next manager app to get started.
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
                    <h3 className="text-xl font-semibold mb-2">Download the KernelSU Next Manager</h3>
                    <p className="text-muted-foreground mb-4">All ROMs on this hub use KernelSU Next. Download the manager app from the official source below.</p>
                    <Button asChild variant="outline" className="w-full">
                        <a href="https://github.com/KernelSU-Next/KernelSU-Next/releases/download/v1.1.1/KernelSU_Next_v1.1.1_12851-release.apk" target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-4 w-4" />
                            KernelSU Next Manager v1.1.1
                        </a>
                    </Button>
                </div>
            </div>
            <div className="flex items-start">
                <span className="text-primary mr-4 text-2xl font-bold">3</span>
                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Install and Enable Root</h3>
                    <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                        <li>Install the downloaded APK file.</li>
                        <li>Open the KernelSU Next manager app.</li>
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
                <li>Always back up your data before flashing any ROM.</li>
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
                <li>If root is not detected, ensure you have installed the correct KernelSU Next manager.</li>
                <li>Ensure your ROM was downloaded from this Hub, as they are confirmed to have kernel support.</li>
                <li>Try rebooting after installing the manager app.</li>
                <li>If an installed module that uses WebUI-X doesn't open its interface, try downgrading the KernelSU Next manager app.</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground/70">
              *This guide is specifically for MI 11 Lite 4G (Courbet) custom ROMs with built-in GKI kernel support.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="text-2xl">APatch Root Guide (Kernel 4.14.356)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="mb-4 bg-primary/10 border-primary/30 text-primary-foreground">
              <AlertTriangle className="h-4 w-4 text-primary" />
              <AlertTitle className="text-primary font-bold">Important Warnings Before Starting</AlertTitle>
              <AlertDescription className="mt-2 space-y-2">
                <ul className="list-disc list-inside">
                  <li><strong>Risks:</strong> Rooting can brick your device, trip safety features, or cause bootloops. Proceed at your own risk.</li>
                  <li><strong>Backup:</strong> Back up all important data + your original <code>boot.img</code>.</li>
                  <li><strong>4.14 Kernel Note:</strong> Your kernel is supported, but older <strong>KernelPatch 0.7.x</strong> builds (or slightly older APatch versions) often work more reliably for module loading and stability on 4.14 kernels. Start with the latest, and downgrade if needed.</li>
                  <li><strong>Prerequisites:</strong> Unlocked bootloader, ADB & Fastboot installed on your PC, Stock <code>boot.img</code> matching your current firmware (same build number).</li>
                </ul>
              </AlertDescription>
            </Alert>
            
            <div className="space-y-6 text-muted-foreground">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Step 1: Check Kernel Compatibility (Recommended)</h3>
                <p>Run this command (via Termux or ADB shell — root not always required for basic check):</p>
                <CodeBlock command='adb shell "zcat /proc/config.gz | grep CONFIG_KALLSYMS"' />
                <p>You need at least <code>CONFIG_KALLSYMS=y</code>. Ideally <code>CONFIG_KALLSYMS_ALL=y</code>.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Step 2: Extract the Correct boot.img</h3>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Download your device's <strong>ROM</strong></li>
                  <li>Extract the <code>boot.img</code></li>
                  <li>Copy the <code>boot.img</code> to your phone's internal storage (e.g., Downloads folder).</li>
                </ol>
                              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Step 3: Install APatch Manager</h3>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Go to the official GitHub: <a href="https://github.com/bmax121/APatch/releases" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">APatch Releases</a></li>
                  <li>Download the latest <strong>APatch Manager APK</strong>.</li>
                  <li>Install it (enable "Install from unknown sources" if needed). Do <strong>not</strong> install from untrusted sources.</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Step 4: Patch the boot.img</h3>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Open the <strong>APatch Manager</strong> app.</li>
                  <li>Tap the <strong>Patch</strong> button (usually top right) → <strong>Select a boot image to patch</strong>.</li>
                  <li>Choose your extracted <code>boot.img</code>.</li>
                  <li>Set a strong <strong>SuperKey</strong> (8–63 characters, mix of numbers + letters — <strong>no special characters</strong>). Save this key securely</li>
                  <li>Tap <strong>Start</strong> and wait for patching to complete.</li>
                  <li>The patched image (e.g., <code>apatch_patched_....img</code>) will be saved (usually in Downloads).</li>
                </ol>
                <p className="text-sm text-yellow-500/80 mt-2"><strong>If patching fails</strong> on latest version → Try an older APatch release or older KernelPatch tools.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Step 5: Flash the Patched Image</h3>
                <p><strong>Recommended method (Fastboot):</strong></p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Copy the patched image to your PC.</li>
                  <li>Reboot to bootloader: <CodeBlock command="adb reboot bootloader" /></li>
                  <li>Flash it: <CodeBlock command="fastboot flash boot patched_boot.img" /> (Rename the file to <code>boot.img</code> if needed.)</li>
                  <li>Reboot: <CodeBlock command="fastboot reboot" /></li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Step 6: Verify Root</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Open Apatch Manager enter your SuperKey.</li>
                  <li>It should show as installed/active.</li>
                  <li>Use a root checker app or run <code>su</code> in a terminal.</li>
                </ul>
              </div>

              <div className="space-y-2 pt-4 border-t border-border/50">
                <h3 className="text-xl font-semibold text-foreground">Post-Installation Tips</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Install <strong>APModules</strong> (Magisk-like) via the manager.</li>
                  <li>For kernel modules (KPM), explore options in the app.</li>
                  <li>After OTA updates, you usually need to re-patch and flash the new boot.img.</li>
                  <li>To unroot: Flash the original stock <code>boot.img</code> via fastboot.</li>
                </ul>
                <h3 className="text-xl font-semibold text-foreground mt-6">Troubleshooting for 4.14 Kernels</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Bootloop → Flash stock boot.img immediately.</li>
                  <li>Modules not loading → Try older APatch/KernelPatch version.</li>
                  <li>Patching errors → Ensure exact matching boot.img and strong SuperKey.</li>
                </ul>
                <p className="mt-4 break-words">Official docs: <a href="https://apatch.dev/install.html" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">apatch.dev/install.html</a></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
