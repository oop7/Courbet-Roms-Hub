'use client';

import Link from 'next/link';
import { Smartphone, Menu, X, ArrowUpRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/roms', label: 'ROMs' },
  { href: '/root-guide', label: 'Root Guide' },
  { href: '/flashing-guide', label: 'Flashing Guide' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, label, className, isExternal }: { href: string; label: string; className?: string, isExternal?: boolean }) => {
    const isActive = !isExternal && (pathname === href || (href !== '/' && pathname.startsWith(href)));
    return (
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={cn(
          'text-sm font-medium transition-colors duration-300 flex items-center gap-1',
          isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary',
          className
        )}
        onClick={() => {
          if (!isExternal) setIsMobileMenuOpen(false)
        }}
      >
        {label}
        {isExternal && <ArrowUpRight className="h-4 w-4" />}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-black/30 backdrop-blur-lg">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Smartphone className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block text-foreground">Courbet ROMs Hub</span>
        </Link>
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="pr-0 w-full h-full bg-black/30 backdrop-blur-xl flex flex-col items-center justify-center border-r-white/20"
            >
               <SheetClose asChild>
                <Button variant="ghost" className="absolute top-4 right-4 h-auto p-2 md:hidden">
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </SheetClose>
              <nav className="flex flex-col items-center justify-center gap-8 text-center">
                {navItems.map((item) => (
                   <NavLink key={item.href} {...item} className="text-3xl font-bold uppercase tracking-wider" />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
