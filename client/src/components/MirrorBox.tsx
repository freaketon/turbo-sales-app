import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Loader2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';

interface MirrorBoxProps {
  stepId: string;
  answers: Record<string, string>;
  questionIds: string[];
  onAnswer: (questionId: string, answer: string) => void;
}

export default function MirrorBox({ stepId, answers, questionIds, onAnswer }: MirrorBoxProps) {
  const confirmationId = `${stepId}-mirror-confirmation`;
  
  const [mirrorText, setMirrorText] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(answers[confirmationId] || null);

  const generateMirror = trpc.salesCoach.generateMirror.useMutation();

  // Auto-generate mirror when answers change
  useEffect(() => {
    const relevantAnswers = questionIds
      .map(id => answers[id])
      .filter(Boolean);

    if (relevantAnswers.length === 0) {
      setMirrorText('');
      return;
    }

    setIsGenerating(true);
    generateMirror.mutate(
      {
        customerAnswers: relevantAnswers,
        currentStep: stepId,
        answers: questionIds.reduce((acc, id) => {
          if (answers[id]) {
            acc[id] = answers[id];
          }
          return acc;
        }, {} as Record<string, string>)
      },
      {
        onSuccess: (data) => {
          setMirrorText(data.mirrorStatement);
          setIsGenerating(false);
        },
        onError: () => {
          setIsGenerating(false);
        }
      }
    );
  }, [answers, questionIds, stepId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(mirrorText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mirrorText && !isGenerating) {
    return null;
  }

  return (
    <Card className="p-6 bg-accent/10 border-accent/30">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-accent flex items-center gap-2">
          <span className="text-2xl">🪞</span>
          Mirror Script - Read This Back
        </h3>
        {mirrorText && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </Button>
        )}
      </div>

      {isGenerating ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Generating mirror statement...
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Read this back to the prospect to confirm you understood correctly:
          </p>
          <div className="bg-background/50 rounded-lg p-4 border border-accent/20">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {mirrorText}
            </p>
          </div>
          <p className="text-xs text-muted-foreground italic">
            💡 Pause after reading and wait for their "yes, that's right"
          </p>
          <p className="text-xs text-accent font-medium mt-2">
            ✨ After they confirm: "This has been super valuable. Thank you."
          </p>
          
          {/* Mirror confirmation - always comes AFTER the mirror script */}
          <div className="mt-6 pt-4 border-t border-accent/20">
            <p className="text-sm font-medium text-foreground mb-3">
              Did they confirm your mirror was accurate?
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              Make sure they agree with your summary before moving forward
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setConfirmation('yes');
                  onAnswer(confirmationId, 'yes');
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  confirmation === 'yes'
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-accent/20 hover:bg-accent/30 text-accent'
                }`}
              >
                {confirmation === 'yes' && <Check className="w-4 h-4 inline mr-2" />}
                Yes - confirmed
              </button>
              <button 
                onClick={() => {
                  setConfirmation('clarified');
                  onAnswer(confirmationId, 'clarified');
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  confirmation === 'clarified'
                    ? 'bg-accent/20 border-accent text-accent'
                    : 'bg-background/50 hover:bg-background/70 text-foreground border-border'
                }`}
              >
                {confirmation === 'clarified' && <Check className="w-4 h-4 inline mr-2" />}
                They clarified/added more
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
