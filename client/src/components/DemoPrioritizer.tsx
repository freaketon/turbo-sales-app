import { Card } from '@/components/ui/card';
import { Zap, Clock, Search, FolderTree, Sparkles, Loader2, AlertCircle } from 'lucide-react';
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
  'intent-search': {
    title: 'Intent Search',
    icon: <Search className="w-5 h-5" />,
    script: (pain) => [
      `"You mentioned: ${pain}"`,
      '"Here\'s how we\'re thinking about that."',
      '',
      'Show: Search: "Find the clip where pricing was mentioned in Q3."',
      'Results appear instantly.',
    ],
    validation: '"Would this work for you? Could you see yourself using this?"',
  },
  'no-tagging': {
    title: 'No Tagging Required',
    icon: <Sparkles className="w-5 h-5" />,
    script: (pain) => [
      `"You said: ${pain}"`,
      '',
      '"This requires no tagging."',
      '"No reorganization."',
      '"We index what already exists."',
    ],
    validation: '"Would that remove friction for your editors?"',
  },
  'zero-touch': {
    title: 'Zero-Touch Setup',
    icon: <Zap className="w-5 h-5" />,
    script: (pain) => [
      `"You mentioned: ${pain}"`,
      '',
      '"We connect to your storage."',
      '"Index your archive."',
      '"Calibrate."',
      '"You search."',
    ],
    validation: '"Would that work for your team?"',
  },
  'archive-org': {
    title: 'Unified Archive View',
    icon: <FolderTree className="w-5 h-5" />,
    script: (pain) => [
      `"You said: ${pain}"`,
      '',
      '"OUTLIER creates a single search layer."',
      '"Across all your storage."',
      '"No migration needed."',
    ],
    validation: '"Would that simplify things for you?"',
  },
  'time-savings': {
    title: 'Instant Retrieval',
    icon: <Clock className="w-5 h-5" />,
    script: (pain) => [
      `"You mentioned: ${pain}"`,
      '',
      '"OUTLIER turns 20 minutes into 20 seconds."',
      '"Natural language search."',
      '"Instant results."',
    ],
    validation: '"How much would that save your team per week?"',
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
          💡 Complete the Problem Exposure questions (Section 2) to generate a personalized demo script
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
          💡 <strong>After each feature:</strong> Validate → Surface objections → Handle with Acknowledge/Agree/Reframe → Circle back
        </p>
      </div>
    </Card>
  );
}
