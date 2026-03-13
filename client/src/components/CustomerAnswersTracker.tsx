import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface MirroredAnswer {
  stepId: string;
  stepTitle: string;
  answers: Record<string, string>;
  mirrorText?: string;
}

interface CustomerAnswersTrackerProps {
  answers: Record<string, string>;
  currentStepId: string;
}

export default function CustomerAnswersTracker({ answers, currentStepId }: CustomerAnswersTrackerProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Group answers by section
  const mirroredSections: MirroredAnswer[] = [];

  // Discovery (Section 2) - problem + tried + magic wand
  const discoveryAnswers = Object.keys(answers)
    .filter(key => key.startsWith('problem-') || key === 'tried-and-failed' || key === 'magic-wand')
    .reduce((acc, key) => ({ ...acc, [key]: answers[key] }), {});

  if (Object.keys(discoveryAnswers).length > 0) {
    mirroredSections.push({
      stepId: 'discovery',
      stepTitle: 'Discovery',
      answers: discoveryAnswers
    });
  }

  // Demo (Section 3)
  const demoAnswers = Object.keys(answers)
    .filter(key => key.startsWith('demo-') || key === 'biggest-impact-feature')
    .reduce((acc, key) => ({ ...acc, [key]: answers[key] }), {});

  if (Object.keys(demoAnswers).length > 0) {
    mirroredSections.push({
      stepId: 'demo',
      stepTitle: 'Demo',
      answers: demoAnswers
    });
  }

  // Impact Calculator (Section 4)
  const impactAnswers = Object.keys(answers)
    .filter(key => key === 'hours-searching' || key === 'cost-per-video')
    .reduce((acc, key) => ({ ...acc, [key]: answers[key] }), {});

  if (Object.keys(impactAnswers).length > 0) {
    mirroredSections.push({
      stepId: 'impact-calculator',
      stepTitle: 'Impact Calculator',
      answers: impactAnswers
    });
  }

  if (mirroredSections.length === 0) {
    return null;
  }

  return (
    <Card className="hidden lg:block fixed right-4 top-20 w-80 bg-card/95 backdrop-blur-sm border-border shadow-lg z-40">
      <div
        className="flex items-center justify-between p-4 cursor-pointer border-b border-border"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Customer Answers</h3>
        </div>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-4 space-y-4">
            {mirroredSections.map((section) => (
              <div
                key={section.stepId}
                className={`p-3 rounded-lg border ${
                  section.stepId === currentStepId
                    ? 'bg-accent/20 border-accent'
                    : 'bg-background/50 border-border/50'
                }`}
              >
                <h4 className="text-sm font-semibold text-accent mb-2">
                  {section.stepTitle}
                </h4>
                <div className="space-y-2">
                  {Object.entries(section.answers).map(([key, value]) => (
                    <div key={key} className="text-xs">
                      <p className="text-muted-foreground truncate">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      <div className="p-2 border-t border-border bg-muted/30">
        <p className="text-xs text-muted-foreground text-center">
          Reference these when repeating back
        </p>
      </div>
    </Card>
  );
}
