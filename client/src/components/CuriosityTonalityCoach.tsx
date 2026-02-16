import { Card } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { useState, useEffect } from 'react';

const TONE_PROMPTS = [
  'Curious. Act confused.',
  'Interesting. Tell me more.',
  'Why is that a problem?',
  'How does that impact you?',
  'Push for a real number.',
];

export default function CuriosityTonalityCoach() {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  useEffect(() => {
    // Rotate prompts every 15 seconds
    const interval = setInterval(() => {
      setCurrentPromptIndex((prev) => (prev + 1) % TONE_PROMPTS.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-4 bg-primary/10 border-primary/30">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/20 text-primary">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-primary">Tone</h4>
          <p className="text-sm text-foreground mt-1">
            {TONE_PROMPTS[currentPromptIndex]}
          </p>
        </div>
      </div>
    </Card>
  );
}
