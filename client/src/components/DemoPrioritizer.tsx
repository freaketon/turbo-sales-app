import { Card } from '@/components/ui/card';
import { Zap, Clock, Search, FolderTree, Sparkles } from 'lucide-react';
import { useMemo } from 'react';

interface DemoPrioritizerProps {
  answers: Record<string, string>;
}

interface DemoFeature {
  id: string;
  title: string;
  icon: React.ReactNode;
  painPoint: string;
  script: string[];
  validation: string;
  priority: number;
}

export default function DemoPrioritizer({ answers }: DemoPrioritizerProps) {
  const prioritizedFeatures = useMemo(() => {
    const features: DemoFeature[] = [];

    // Analyze answers to determine pain points
    const problemAnswers = Object.entries(answers)
      .filter(([key]) => key.startsWith('problem-'))
      .map(([_, value]) => value.toLowerCase());

    const allAnswersText = problemAnswers.join(' ');

    // Feature 1: Intent Search (if they mention time searching, finding clips, etc.)
    if (allAnswersText.includes('search') || 
        allAnswersText.includes('find') || 
        allAnswersText.includes('minutes') ||
        allAnswersText.includes('looking for')) {
      features.push({
        id: 'intent-search',
        title: 'Intent Search',
        icon: <Search className="w-5 h-5" />,
        painPoint: 'Time wasted searching for clips',
        script: [
          '"You mentioned it takes time to find specific moments."',
          '"Here\'s how we\'re thinking about that."',
          '',
          'Show: Search: "Find the clip where pricing was mentioned in Q3."',
          'Results appear instantly.',
        ],
        validation: '"Would this work for you? Could you see yourself using this?"',
        priority: 10
      });
    }

    // Feature 2: No Tagging (if they mention tagging, organization, metadata)
    if (allAnswersText.includes('tag') || 
        allAnswersText.includes('organiz') || 
        allAnswersText.includes('metadata') ||
        allAnswersText.includes('label')) {
      features.push({
        id: 'no-tagging',
        title: 'No Tagging Required',
        icon: <Sparkles className="w-5 h-5" />,
        painPoint: 'Tagging never sticks',
        script: [
          '"You also said tagging never sticks."',
          '',
          '"This requires no tagging."',
          '"No reorganization."',
          '"We index what already exists."',
        ],
        validation: '"Would that remove friction for your editors?"',
        priority: 8
      });
    }

    // Feature 3: Zero-Touch Setup (if they mention time, setup, migration, overhaul)
    if (allAnswersText.includes('time') || 
        allAnswersText.includes('setup') || 
        allAnswersText.includes('migration') ||
        allAnswersText.includes('overhaul')) {
      features.push({
        id: 'zero-touch',
        title: 'Zero-Touch Setup',
        icon: <Zap className="w-5 h-5" />,
        painPoint: 'No time to overhaul storage',
        script: [
          '"You mentioned no one has time to overhaul storage."',
          '',
          '"We connect to your storage."',
          '"Index your archive."',
          '"Calibrate."',
          '"You search."',
        ],
        validation: '"Would that work for your team?"',
        priority: 7
      });
    }

    // Feature 4: Archive Organization (if they mention scattered, chaos, multiple locations)
    if (allAnswersText.includes('scatter') || 
        allAnswersText.includes('chaos') || 
        allAnswersText.includes('location') ||
        allAnswersText.includes('drive')) {
      features.push({
        id: 'archive-org',
        title: 'Unified Archive View',
        icon: <FolderTree className="w-5 h-5" />,
        painPoint: 'Footage scattered across multiple locations',
        script: [
          '"You said footage lives in multiple places."',
          '',
          '"TURBO creates a single search layer."',
          '"Across all your storage."',
          '"No migration needed."',
        ],
        validation: '"Would that simplify things for you?"',
        priority: 6
      });
    }

    // Feature 5: Time Savings (if they mentioned hours, wasted time, efficiency)
    if (allAnswersText.includes('hour') || 
        allAnswersText.includes('waste') || 
        allAnswersText.includes('slow')) {
      features.push({
        id: 'time-savings',
        title: 'Instant Retrieval',
        icon: <Clock className="w-5 h-5" />,
        painPoint: 'Hours wasted on manual search',
        script: [
          '"You said editors spend hours searching."',
          '',
          '"TURBO turns 20 minutes into 20 seconds."',
          '"Natural language search."',
          '"Instant results."',
        ],
        validation: '"How much would that save your team per week?"',
        priority: 9
      });
    }

    // Sort by priority (highest first)
    return features.sort((a, b) => b.priority - a.priority).slice(0, 3);
  }, [answers]);

  if (prioritizedFeatures.length === 0) {
    return (
      <Card className="p-6 bg-muted/30 border-border">
        <p className="text-sm text-muted-foreground">
          💡 Complete the discovery questions to generate a personalized demo script
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
          Show these {prioritizedFeatures.length} features based on their pain points
        </p>
      </div>

      <div className="space-y-6">
        {prioritizedFeatures.map((feature, index) => (
          <div 
            key={feature.id}
            className="p-4 rounded-lg bg-background/50 border border-accent/20"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-accent/20 text-accent">
                {feature.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">
                  Feature {index + 1}: {feature.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Addresses: {feature.painPoint}
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
