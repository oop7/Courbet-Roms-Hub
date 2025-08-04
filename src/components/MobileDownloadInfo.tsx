import { Smartphone, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const MobileDownloadInfo = () => {
  return (
    <Alert className="bg-secondary/80 md:hidden">
        <Smartphone className="h-4 w-4" />
        <AlertTitle>Mobile User Tip</AlertTitle>
        <AlertDescription>
         On the next page, tap the green <strong>"Try To Download Anyway"</strong> button to start your download.
        </AlertDescription>
    </Alert>
  );
};
