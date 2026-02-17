import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Copy } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { useState, useEffect } from 'react';

interface RecapSummaryProps {
  answers: Record<string, string>;
}

export default function RecapSummary({ answers }: RecapSummaryProps) {
  const [copied, setCopied] = useState(false);
  
  // Generate comprehensive recap from all discovery answers
  const generateRecapMutation = trpc.salesCoach.generateMirror.useMutation();
  
  const [recap, setRecap] = useState<string>('');
  
  // Auto-generate recap when component mounts or answers change
  useEffect(() => {
    if (Object.keys(answers).length > 0 && !recap && !generateRecapMutation.isPending) {
      // Collect all customer answers from discovery sections
      const customerAnswers = Object.entries(answers)
        .filter(([key, value]) => value && value.trim() !== '')
        .map(([key, value]) => value);
      
      if (customerAnswers.length > 0) {
        generateRecapMutation.mutate(
          {
            customerAnswers,
            currentStep: 'recap',
            answers
          },
          {
            onSuccess: (data) => {
              setRecap(data.mirrorStatement);
            }
          }
        );
      }
    }
  }, [answers, recap, generateRecapMutation.isPending]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(recap);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/20">
          <CheckCircle2 className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Complete Recap - Read This Back
          </h3>
          <p className="text-sm text-muted-foreground">
            This is the ultimate mirror - everything they told you, synthesized
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-2"
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
      
      {generateRecapMutation.isPending ? (
        <div className="py-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-3 text-sm text-muted-foreground">
            Generating comprehensive recap from all discovery answers...
          </p>
        </div>
      ) : recap ? (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-background/50 border border-border">
            <div className="prose prose-invert max-w-none">
              {recap.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-foreground mb-3 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-accent">💡</span>
            <span>
              Pause after reading and wait for their "yes, that's right" confirmation
            </span>
          </div>
          
          <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
            <p className="text-sm font-medium text-accent">
              After they confirm: "Thank you so much for sharing all of this. This has been incredibly valuable."
            </p>
          </div>
        </div>
      ) : (
        <div className="py-6 text-center text-muted-foreground">
          <p>Answer discovery questions to generate the recap</p>
        </div>
      )}
    </Card>
  );
}
