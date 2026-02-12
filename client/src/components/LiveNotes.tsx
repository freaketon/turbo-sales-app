import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, Send, TrendingUp, AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface Note {
  id: string;
  text: string;
  timestamp: Date;
  guidance?: {
    type: 'positive' | 'warning' | 'neutral' | 'action';
    message: string;
  };
}

interface LiveNotesProps {
  currentStep: string;
}

export function LiveNotes({ currentStep }: LiveNotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const analyzeNote = (noteText: string, step: string): Note['guidance'] => {
    const lowerNote = noteText.toLowerCase();
    
    // Positive buying signals
    if (
      lowerNote.includes('budget') ||
      lowerNote.includes('when can we start') ||
      lowerNote.includes('sounds good') ||
      lowerNote.includes('interested') ||
      lowerNote.includes('this would help') ||
      lowerNote.includes('we need this') ||
      lowerNote.includes('pain point') ||
      lowerNote.includes('struggling with') ||
      lowerNote.includes('costing us')
    ) {
      return {
        type: 'positive',
        message: '🎯 Strong buying signal detected! They\'re showing pain and interest. Continue building urgency and move toward the offer.'
      };
    }
    
    // Red flags / objections
    if (
      lowerNote.includes('expensive') ||
      lowerNote.includes('too much') ||
      lowerNote.includes('not sure') ||
      lowerNote.includes('need to think') ||
      lowerNote.includes('talk to team') ||
      lowerNote.includes('maybe later') ||
      lowerNote.includes('not priority') ||
      lowerNote.includes('already have')
    ) {
      return {
        type: 'warning',
        message: '⚠️ Potential objection detected. Use the objection handler (bottom-right button) to address this concern before moving forward.'
      };
    }
    
    // Scale/complexity indicators
    if (
      lowerNote.includes('editor') ||
      lowerNote.includes('team') ||
      lowerNote.includes('hours') ||
      lowerNote.includes('footage') ||
      lowerNote.includes('archive') ||
      lowerNote.includes('search')
    ) {
      return {
        type: 'action',
        message: '💡 Good intel on scale/pain. Quantify this in the cost-lock step: ask for specific numbers (hours wasted, team size, frequency).'
      };
    }
    
    // Decision-maker signals
    if (
      lowerNote.includes('i decide') ||
      lowerNote.includes('my call') ||
      lowerNote.includes('i can approve') ||
      lowerNote.includes('founder') ||
      lowerNote.includes('owner')
    ) {
      return {
        type: 'positive',
        message: '✅ Decision-maker confirmed! You can close today. No need to involve others—push for calendar commitment.'
      };
    }
    
    // Timing concerns
    if (
      lowerNote.includes('busy') ||
      lowerNote.includes('next quarter') ||
      lowerNote.includes('next month') ||
      lowerNote.includes('later')
    ) {
      return {
        type: 'warning',
        message: '⏰ Timing objection. Use urgency check: "Is this a now problem or a later problem?" If later, consider disqualifying.'
      };
    }
    
    // Default neutral guidance based on step
    const stepGuidance: Record<string, string> = {
      opening: 'Listen for binary answer. If they say "hunt", dig into frequency and pain.',
      problem: 'Quantify the invisible tax. Get real numbers: hours, frequency, team size.',
      qualification: 'Hard gates: 3+ editors, frequent reuse, real operational impact. Disqualify fast if not fit.',
      'cost-lock': 'Lock in the math BEFORE discussing price. They must agree on annual waste.',
      'stop-rule': 'Decision point: now or later problem? If later, disqualify gracefully.',
      reframe: 'Position as workflow upgrade, not storage. Emphasize speed and confidence.',
      solution: 'Demo the value prop. Keep it brief—focus on their specific pain points.',
      offer: 'Present Founders Circle. Emphasize double-win guarantee and immediate start.',
      close: 'Calendar or no. Nothing else acceptable. If objection, handle and re-close.',
      objection: 'Diagnose root cause: money, trust, or timing. Address and re-close.',
      disqualify: 'Exit cleanly. Ask for referrals: "Know anyone with 3+ editors drowning in footage?"'
    };
    
    return {
      type: 'neutral',
      message: stepGuidance[step] || 'Note captured. Stay focused on their pain and buying signals.'
    };
  };

  const handleAddNote = () => {
    if (!currentNote.trim()) return;
    
    const newNote: Note = {
      id: Date.now().toString(),
      text: currentNote.trim(),
      timestamp: new Date(),
      guidance: analyzeNote(currentNote, currentStep)
    };
    
    setNotes([newNote, ...notes]);
    setCurrentNote('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  const getGuidanceIcon = (type?: 'positive' | 'warning' | 'neutral' | 'action') => {
    if (!type) return null;
    switch (type) {
      case 'positive':
        return <CheckCircle2 className="w-4 h-4 text-accent" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'action':
        return <Lightbulb className="w-4 h-4 text-primary" />;
      default:
        return <TrendingUp className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getGuidanceColor = (type?: 'positive' | 'warning' | 'neutral' | 'action') => {
    if (!type) return 'border-border bg-muted/20';
    switch (type) {
      case 'positive':
        return 'border-accent/30 bg-accent/5';
      case 'warning':
        return 'border-destructive/30 bg-destructive/5';
      case 'action':
        return 'border-primary/30 bg-primary/5';
      default:
        return 'border-border bg-muted/20';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-96 max-h-[600px] flex flex-col glass-card rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-card/80">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <StickyNote className="w-5 h-5 text-primary" />
                Live Call Notes
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Capture insights • Get real-time guidance
              </p>
            </div>

            {/* Notes list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notes.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  <StickyNote className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p>No notes yet</p>
                  <p className="text-xs mt-1">Type observations and press Enter</p>
                </div>
              ) : (
                notes.map((note) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-2"
                  >
                    {/* Note text */}
                    <Card className="p-3 bg-card/60 border-border">
                      <p className="text-sm text-foreground">{note.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {note.timestamp.toLocaleTimeString()}
                      </p>
                    </Card>
                    
                    {/* AI Guidance */}
                    {note.guidance && (
                      <Card className={`p-3 border ${getGuidanceColor(note.guidance.type)}`}>
                        <div className="flex items-start gap-2">
                          {getGuidanceIcon(note.guidance.type)}
                          <p className="text-xs text-foreground/90 leading-relaxed">
                            {note.guidance.message}
                          </p>
                        </div>
                      </Card>
                    )}
                  </motion.div>
                ))
              )}
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-border bg-card/80">
              <div className="flex gap-2">
                <Textarea
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type observation... (Enter to save)"
                  className="flex-1 min-h-[60px] resize-none text-sm"
                />
                <Button
                  onClick={handleAddNote}
                  disabled={!currentNote.trim()}
                  size="sm"
                  className="self-end"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Shift+Enter for new line • Enter to save
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        size="lg"
        className="rounded-full shadow-lg gap-2 h-14 px-6"
      >
        <StickyNote className="w-5 h-5" />
        <span className="font-semibold">
          {isExpanded ? 'Close Notes' : 'Live Notes'}
        </span>
        {notes.length > 0 && !isExpanded && (
          <span className="bg-primary-foreground text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {notes.length}
          </span>
        )}
      </Button>
    </div>
  );
}
