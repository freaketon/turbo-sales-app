import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface CallFrameOpenerProps {
  prospectName?: string;
  onDelivered: () => void;
}

export default function CallFrameOpener({ prospectName, onDelivered }: CallFrameOpenerProps) {
  const [delivered, setDelivered] = useState(false);

  const handleDelivered = () => {
    setDelivered(true);
    onDelivered();
  };

  const name = prospectName || '[Name]';
  const opener = `Hey ${name}, appreciate you making time. We're super early on this, still beta. I'm not here to sell you on anything today. I'm trying to learn how you run video and where the friction is so we build the right thing. I'm going to ask a bunch of questions, and if we have time I can show a rough prototype to get your feedback. Cool?`;

  return (
    <Card className="p-6 bg-accent/10 border-accent/30">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-accent/20 text-accent">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-accent">Mandatory Call Frame</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Read this opener before asking any questions
          </p>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-background/50 border border-border mb-4">
        <p className="text-foreground leading-relaxed">
          {opener}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={handleDelivered}
          disabled={delivered}
          className="flex items-center gap-2"
        >
          {delivered ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Delivered
            </>
          ) : (
            'Mark as Delivered'
          )}
        </Button>
        {delivered && (
          <p className="text-sm text-muted-foreground">
            ✓ Frame delivered. Proceed to discovery questions.
          </p>
        )}
      </div>

      {!delivered && (
        <p className="text-xs text-muted-foreground mt-3">
          💡 Wait for their "yes" or agreement before clicking "Mark as Delivered"
        </p>
      )}
    </Card>
  );
}
