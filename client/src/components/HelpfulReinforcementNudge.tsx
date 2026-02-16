import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const ONE_LINERS = [
  "That's really helpful.",
  "That's insightful.",
  "Thanks for the detail.",
  "I hadn't thought of that.",
  "Super useful context.",
];

export default function HelpfulReinforcementNudge() {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleMarkAsHelpful = () => {
    setShowSuggestions(true);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Card className="p-4 bg-accent/10 border-accent/30">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-accent/20 text-accent">
          <Heart className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-accent">Helpful Insight</h4>
          <p className="text-xs text-muted-foreground">
            Mark when prospect shares valuable feedback
          </p>
        </div>
      </div>

      {!showSuggestions ? (
        <Button
          onClick={handleMarkAsHelpful}
          variant="outline"
          size="sm"
          className="w-full"
        >
          Mark as Helpful Insight
        </Button>
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground mb-2">
            Say one of these:
          </p>
          {ONE_LINERS.map((line, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 rounded-lg bg-background/50 border border-border hover:border-accent/50 transition-colors"
            >
              <p className="text-sm text-foreground flex-1">{line}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(line, index)}
                className="h-8 w-8 p-0"
              >
                {copiedIndex === index ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </Button>
            </div>
          ))}
          <Button
            onClick={() => setShowSuggestions(false)}
            variant="ghost"
            size="sm"
            className="w-full mt-2"
          >
            Close
          </Button>
        </div>
      )}
    </Card>
  );
}
