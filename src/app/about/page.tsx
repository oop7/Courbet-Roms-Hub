import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, Github, Send, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
          About Courbet ROMs Hub
        </h1>
        <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
          Our mission, our story, and the amazing people who make this project possible.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Cpu className="h-6 w-6 text-accent" />
              Our Purpose
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              Courbet ROMs Hub was created out of a passion for customizing the Xiaomi Mi 11 Lite 4G (courbet). This site, developed by <a href="https://github.com/oop7" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">oop7</a>, aims to provide a centralized, reliable resource for enthusiasts to find the best custom ROMs built by melo159, alongside up-to-date guides and support. We believe in the power of community to push the boundaries of our devices.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Users className="h-6 w-6 text-accent" />
              Credits & Acknowledgements
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p className="mb-4">
              This project is a collaboration and wouldn't be possible without the incredible work of:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><a href="https://github.com/meloalfa159" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"><strong>melo159</strong></a>, for tirelessly building and maintaining all the custom ROMs featured here.</li>
              <li>The teams behind KernelSU, KernelSU Next, TWRP, and OrangeFox.</li>
              <li>Teplaothis, for providing valuable testing and feedback.</li>
              <li>PixelOS devs, aryan and other devs for the trees and the kernel</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card className="max-w-4xl mx-auto mt-8 bg-secondary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Send className="h-6 w-6 text-accent" />
              Join the Community
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="w-full" variant="outline">
               <a href="https://t.me/melo159roms" target="_blank" rel="noopener noreferrer">
                  <Send className="mr-2 h-4 w-4" /> ROM Releases Channel
                </a>
            </Button>
            <Button asChild className="w-full" variant="outline">
                <a href="https://t.me/melo159chat" target="_blank" rel="noopener noreferrer">
                  <Users className="mr-2 h-4 w-4" /> Discussion Channel
                </a>
            </Button>
          </CardContent>
        </Card>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">Want to contribute?</h2>
        <p className="text-muted-foreground mb-6">This project is open-source. We welcome contributions of all kinds.</p>
        <a href="https://github.com/oop7/Courbet-Roms-Hub" target="_blank" rel="noopener noreferrer">
          <Button variant="outline">
            <Github className="mr-2 h-4 w-4" /> View on GitHub
          </Button>
        </a>
      </div>
    </div>
  );
}
