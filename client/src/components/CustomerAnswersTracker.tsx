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
  
  // Problem Exposure (Section 2)
  const problemAnswers = Object.keys(answers)
    .filter(key => key.startsWith('problem-'))
    .reduce((acc, key) => ({ ...acc, [key]: answers[key] }), {});
  
  if (Object.keys(problemAnswers).length > 0) {
    mirroredSections.push({
      stepId: 'problem-exposure',
      stepTitle: 'Problem Exposure',
      answers: problemAnswers
    });
  }

  // Alternative Solutions (Section 3)
  const altAnswers = Object.keys(answers)
    .filter(key => key.startsWith('alt-') || key.startsWith('alternative-'))
    .reduce((acc, key) => ({ ...acc, [key]: answers[key] }), {});
  
  if (Object.keys(altAnswers).length > 0) {
    mirroredSections.push({
      stepId: 'alternative-solutions',
      stepTitle: 'Alternative Solutions',
      answers: altAnswers
    });
  }

  // Dream Outcome (Section 4)
  const dreamAnswers = Object.keys(answers)
    .filter(key => key.startsWith('dream-'))
    .reduce((acc, key) => ({ ...acc, [key]: answers[key] }), {});
  
  if (Object.keys(dreamAnswers).length > 0) {
    mirroredSections.push({
      stepId: 'dream-outcome',
      stepTitle: 'Dream Outcome',
      answers: dreamAnswers
    });
  }

  // Impact Measurement (Section 8)
  const impactAnswers = Object.keys(answers)
    .filter(key => key.startsWith('num-editors') || key.startsWith('hours-saved') || key.startsWith('hourly-rate'))
    .reduce((acc, key) => ({ ...acc, [key]: answers[key] }), {});
  
  if (Object.keys(impactAnswers).length > 0) {
    mirroredSections.push({
      stepId: 'impact-measurement',
      stepTitle: 'Impact Measurement',
      answers: impactAnswers
    });
  }

  if (mirroredSections.length === 0) {
    return null;
  }

  return (
    <Card className="fixed right-4 top-20 w-80 bg-card/95 backdrop-blur-sm border-border shadow-lg z-40">
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
          💡 Reference these when repeating back
        </p>
      </div>
    </Card>
  );
}
