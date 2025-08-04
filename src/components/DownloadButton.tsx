
'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';

interface DownloadButtonProps {
  url: string;
  children: React.ReactNode;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
}

export function DownloadButton({ 
  url, 
  children, 
  variant = 'default',
  size = 'lg',
  className = 'w-full'
}: DownloadButtonProps) {
  
  const isExternal = !url.includes('sourceforge.net');

  return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button size={size} variant={variant} className={className}>
              {isExternal ? <ExternalLink /> : <Download />} {children}
          </Button>
      </a>
  )
}
