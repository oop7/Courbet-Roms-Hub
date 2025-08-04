
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Clipboard } from 'lucide-react';

export const CodeBlock = ({ command }: { command: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
    };

    return (
        <div className="bg-muted/50 border border-border rounded-lg p-3 pr-12 relative group my-2">
            <pre className="text-sm text-foreground font-code overflow-x-auto whitespace-pre-wrap break-words">
                <code>{command}</code>
            </pre>
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleCopy}
                aria-label="Copy command"
            >
                {copied ? <Check className="h-4 w-4 text-primary" /> : <Clipboard className="h-4 w-4" />}
            </Button>
        </div>
    );
};
