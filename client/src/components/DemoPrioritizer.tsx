import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Clock, Search, TrendingUp, Sparkles, Loader2, AlertCircle, ExternalLink, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { trpc } from '@/lib/trpc';

interface DemoPrioritizerProps {
  answers: Record<string, string>;
}

interface RankedPain {
  painPoint: string;
  severity: 'high' | 'medium' | 'low';
  feature: string;
  evidence: string;
}

interface DemoFeature {
  id: string;
  title: string;
  icon: React.ReactNode;
  painPoint: string;
  evidence: string;
  script: string[];
  validation: string;
  severity: 'high' | 'medium' | 'low';
}

const FEATURE_DETAILS: Record<string, {
  title: string;
  icon: React.ReactNode;
  script: (painPoint: string) => string[];
  validation: string;
}> = {
  'outlier-feed': {
    title: 'Outlier Feed',
    icon: <Zap className="w-5 h-5" />,
    script: (pain) => [
      `"You mentioned: ${pain}"`,
      '"OUTLIER flags Reels outperforming their account baseline by 5–50x within the first 6 hours — before they hit the discovery page."',
      '',
      'Show: The live Outlier Feed in the demo — real-time flagged content.',
    ],
    validation: '"Would this work for you? Could you see yourself using this?"',
  },
  'why-working': {
    title: 'Why It\'s Working Breakdown',
    icon: <Search className="w-5 h-5" />,
    script: (pain) => [
      `"You said: ${pain}"`,
      '',
      '"OUTLIER breaks down the hook, audio, format, and topic angle of every flagged Reel."',
      '"You don\'t just see what went viral — you understand WHY."',
    ],
    validation: '"Would that help you understand what to replicate?"',
  },
  'content-briefs': {
    title: 'Content Brief Generator',
    icon: <FileText className="w-5 h-5" />,
    script: (pain) => [
      `"You mentioned: ${pain}"`,
      '',
      '"Based on what\'s breaking out in your niche right now, OUTLIER generates 3 ready-to-shoot briefs."',
      '"You go from zero ideas to 3 evidence-backed ones in under 60 seconds."',
    ],
    validation: '"Would this save you research time?"',
  },
  'trend-lifecycle': {
    title: 'Trend Lifecycle Score',
    icon: <TrendingUp className="w-5 h-5" />,
    script: (pain) => [
      `"You said: ${pain}"`,
      '',
      '"OUTLIER scores every trend — emerging, peaking, or saturated."',
      '"So you know if you\'re early or too late."',
    ],
    validation: '"Would this help you time your posts better?"',
  },
  'time-savings': {
    title: 'Instant Trend Intelligence',
    icon: <Clock className="w-5 h-5" />,
    script: (pain) => [
      `"You mentioned: ${pain}"`,
      '',
      '"OUTLIER replaces hours of scrolling with a single dashboard."',
      '"Everything you need to know about what\'s working — right now."',
    ],
    validation: '"How much time would that save you each week?"',
  },
};

export default function DemoPrioritizer({ answers }: DemoPrioritizerProps) {
  const [features, setFeatures] = useState<DemoFeature[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzePains = trpc.salesCoach.analyzePainPoints.useMutation();

  useEffect(() => {
    // Check if we have problem-exposure answers
    const hasProblemAnswers = Object.keys(answers).some(key =>
      key.startsWith('problem-') && answers[key]
    );

    if (!hasProblemAnswers) {
      setFeatures([]);
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    analyzePains.mutate(
      { answers },
      {
        onSuccess: (data) => {
          const { rankedPains } = data;

          const demoFeatures: DemoFeature[] = rankedPains.map((pain: RankedPain) => {
            const featureDetail = FEATURE_DETAILS[pain.feature];
            if (!featureDetail) return null;

            return {
              id: pain.feature,
              title: featureDetail.title,
              icon: featureDetail.icon,
              painPoint: pain.painPoint,
              evidence: pain.evidence,
              script: featureDetail.script(pain.painPoint),
              validation: featureDetail.validation,
              severity: pain.severity,
            };
          }).filter(Boolean) as DemoFeature[];

          setFeatures(demoFeatures);
          setIsAnalyzing(false);
        },
        onError: (err) => {
          console.error('Failed to analyze pain points:', err);
          setError('Failed to analyze pain points. Using basic feature list.');
          setIsAnalyzing(false);
        },
      }
    );
  }, [answers]);

  if (isAnalyzing) {
    return (
      <Card className="p-6 bg-muted/30 border-border">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <p className="text-sm">Analyzing pain points to create personalized demo...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 bg-destructive/10 border-destructive/30">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      </Card>
    );
  }

  if (features.length === 0) {
    return (
      <Card className="p-6 bg-muted/30 border-border">
        <p className="text-sm text-muted-foreground">
          Complete the Problem Exposure questions (Section 2) to generate a personalized demo script
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-accent/10 border-accent/30">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-accent flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Personalized Demo Script
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Show these {features.length} features in order of pain severity (most painful first)
        </p>
      </div>

      {/* OUTLIER Demo MVP Link */}
      <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">Open OUTLIER Demo</p>
            <p className="text-xs text-muted-foreground mt-0.5">Share your screen and walk through features live</p>
          </div>
          <Button
            size="sm"
            className="gap-1.5"
            onClick={() => window.open('https://app.outliervid.io/setup', '_blank')}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Launch Demo
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {features.map((feature, index) => (
          <div
            key={`${feature.id}-${index}`}
            className="p-4 rounded-lg bg-background/50 border border-accent/20"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-accent/20 text-accent">
                {feature.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground">
                    Feature {index + 1}: {feature.title}
                  </h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    feature.severity === 'high'
                      ? 'bg-destructive/20 text-destructive'
                      : feature.severity === 'medium'
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {feature.severity} pain
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Solves: {feature.painPoint}
                </p>
                <p className="text-xs text-accent/70 mt-1 italic">
                  "{feature.evidence}"
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-3">
              {feature.script.map((line, i) => (
                <p
                  key={i}
                  className={`text-sm ${
                    line.startsWith('"')
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground italic'
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="pt-3 border-t border-border/50">
              <p className="text-sm text-accent font-medium">
                Validation: {feature.validation}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-muted/50">
        <p className="text-xs text-muted-foreground">
          <strong>After each feature:</strong> Validate → Surface objections → Handle with Acknowledge/Agree/Reframe → Circle back
        </p>
      </div>
    </Card>
  );
}
