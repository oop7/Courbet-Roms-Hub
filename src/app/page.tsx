import Link from "next/link";
import { ArrowRight, GitBranch, HardDriveDownload, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RomCard } from "@/components/RomCard";
import { roms } from "@/lib/roms";

export default function Home() {
  const features = [
    {
      icon: <GitBranch className="h-8 w-8 text-primary" />,
      title: "Latest ROMs",
      description: "Access a curated list of stable and beta custom ROMs for your device."
    },
    {
      icon: <HardDriveDownload className="h-8 w-8 text-primary" />,
      title: "Easy Flashing",
      description: "Follow our comprehensive guides to safely root your device and flash new ROMs."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Stable & Secure",
      description: "Compare release status, security updates, and known ROM information before flashing."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full overflow-hidden py-20 text-center md:py-28 lg:py-32">
        <div className="container px-4 md:px-6 z-10 relative">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-foreground">
              Courbet ROMs Hub
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Unlock the full potential of your Mi 11 Lite 4G. The ultimate destination for custom ROMs, guides, and more.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="outline" className="shadow-glow-primary hover:bg-primary/10 transition-all duration-300">
                <Link href="/roms">
                  Explore ROMs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="hover:bg-muted/80">
                <Link href="/flashing-guide">View Guides</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/40 bg-secondary/20 py-12 md:py-16">
        <div className="container grid gap-6 px-4 md:grid-cols-[1.4fr_1fr] md:px-6">
          <div className="rounded-2xl border border-primary/20 bg-card/60 p-6 shadow-lg shadow-black/10">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">Built for enthusiasts</p>
            <h2 className="text-2xl font-bold md:text-3xl">Everything for your Courbet in one place.</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Browse current ROM releases, compare stability, and follow safer flashing and rooting guides.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge variant="outline">Xiaomi Mi 11 Lite 4G</Badge>
              <Badge variant="outline">Codename: courbet</Badge>
              <Badge variant="outline">{roms.length} ROM entries</Badge>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
            {[
              ['1', 'Choose a ROM', '/roms'],
              ['2', 'Follow the guide', '/flashing-guide'],
              ['3', 'Root when ready', '/root-guide'],
            ].map(([step, label, href]) => (
              <Link key={step} href={href} className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card/40 p-4 transition-colors hover:border-primary/60 hover:bg-primary/5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">{step}</span>
                <span className="font-medium">{label}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">Recently updated</p>
            <h2 className="text-3xl font-bold">Latest releases</h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/roms">View all <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {roms.slice(0, 3).map((rom) => <RomCard key={rom.slug} rom={rom} />)}
        </div>
      </section>

      <section className="bg-transparent py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-3 lg:gap-12">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center p-6 border-0 bg-transparent shadow-none">
                <CardHeader className="items-center">
                  <div className="mb-4 rounded-full bg-secondary/80 p-4">{feature.icon}</div>
                  <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardDescription>{feature.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
