import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface DemoPermissionGateProps {
  onPermissionGranted: () => void;
}

export default function DemoPermissionGate({ onPermissionGranted }: DemoPermissionGateProps) {
  const [granted, setGranted] = useState(false);

  const handleGranted = () => {
    setGranted(true);
    onPermissionGranted();
  };

  return (
    <Card className="p-6 bg-primary/10 border-primary/30">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/20 text-primary">
          <Video className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-primary">Demo Permission</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Ask for permission before showing the demo
          </p>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-background/50 border border-border mb-4">
        <p className="text-foreground leading-relaxed">
          "Cool. Mind if I show you a quick rough prototype to get your feedback?"
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={handleGranted}
          disabled={granted}
          className="flex items-center gap-2"
        >
          {granted ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Permission Granted
            </>
          ) : (
            'Permission Granted'
          )}
        </Button>
        {granted && (
          <p className="text-sm text-muted-foreground">
            ✓ Permission granted. Proceed with demo.
          </p>
        )}
      </div>

      {!granted && (
        <p className="text-xs text-muted-foreground mt-3">
          💡 Wait for their "yes" or "sure" before clicking "Permission Granted"
        </p>
      )}
    </Card>
  );
}
