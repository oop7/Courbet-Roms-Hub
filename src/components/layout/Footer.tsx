import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex items-center justify-center h-16">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Courbet ROMs Hub. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
