import Link from "next/link";
import { ArrowRight, GitBranch, HardDriveDownload, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const features = [
    {
      icon: <GitBranch className="h-8 w-8 text-primary" />,
      title: "Latest ROMs",
      description: "Access a curated list of the most popular and stable custom ROMs for your device."
    },
    {
      icon: <HardDriveDownload className="h-8 w-8 text-primary" />,
      title: "Easy Flashing",
      description: "Follow our comprehensive guides to safely root your device and flash new ROMs."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Stable & Secure",
      description: "We prioritize stable builds and provide information on the latest security patches."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full py-24 md:py-32 lg:py-40 text-center overflow-hidden">
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

      <section className="py-16 md:py-24 lg:py-32 bg-transparent">
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
