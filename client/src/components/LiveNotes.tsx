import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { StickyNote, Send, Loader2, AlertTriangle, CheckCircle2, Target, Lightbulb } from 'lucide-react';
import { trpc } from '@/lib/trpc';

type Note = {
  id: string;
  text: string;
  timestamp: Date;
  guidance?: {
    text: string;
    type: 'positive' | 'warning' | 'neutral' | 'action';
  };
};

type LiveNotesProps = {
  currentStep: string;
  answers?: Record<string, string>;
};

export function LiveNotes({ currentStep, answers = {} }: LiveNotesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState('');

  const analyzeNoteMutation = trpc.salesCoach.analyzeNote.useMutation();

  const handleAddNote = async () => {
    if (!currentNote.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      text: currentNote.trim(),
      timestamp: new Date(),
    };

    setNotes(prev => [newNote, ...prev]);
    setCurrentNote('');

    // Get AI guidance
    try {
      const result = await analyzeNoteMutation.mutateAsync({
        note: currentNote.trim(),
        currentStep,
        previousNotes: notes.map(n => n.text),
        answers,
      });

      // Update the note with guidance
      const guidanceText = typeof result.guidance === 'string' ? result.guidance : 'Note captured.';
      setNotes(prev =>
        prev.map(n =>
          n.id === newNote.id
            ? {
                ...n,
                guidance: {
                  text: guidanceText,
                  type: result.type,
                },
              }
            : n
        )
      );
    } catch (error) {
      console.error('Failed to get AI guidance:', error);
      // Add fallback guidance
      setNotes(prev =>
        prev.map(n =>
          n.id === newNote.id
            ? {
                ...n,
                guidance: {
                  text: 'Note captured. Continue gathering information and watch for buying signals.',
                  type: 'neutral' as const,
                },
              }
            : n
        )
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  const guidanceIcons = {
    positive: <CheckCircle2 className="w-4 h-4 text-green-500" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-500" />,
    action: <Target className="w-4 h-4 text-blue-500" />,
    neutral: <Lightbulb className="w-4 h-4 text-muted-foreground" />,
  };

  const guidanceColors = {
    positive: 'bg-green-500/10 border-green-500/30',
    warning: 'bg-amber-500/10 border-amber-500/30',
    action: 'bg-blue-500/10 border-blue-500/30',
    neutral: 'bg-muted/50 border-border',
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
                AI Sales Coach • Real-time guidance
              </p>
            </div>

            {/* Notes list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notes.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  <StickyNote className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p>No notes yet</p>
                  <p className="text-xs mt-1">Type observations and get expert coaching</p>
                </div>
              ) : (
                notes.map(note => (
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

                    {/* AI guidance */}
                    {note.guidance ? (
                      <Card
                        className={`p-3 border ${
                          guidanceColors[note.guidance.type]
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {guidanceIcons[note.guidance.type]}
                          <p className="text-xs text-foreground/90 leading-relaxed flex-1">
                            {note.guidance.text}
                          </p>
                        </div>
                      </Card>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground px-3 py-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <p className="text-xs">AI coach analyzing...</p>
                      </div>
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
                  onChange={e => setCurrentNote(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type observation... (Enter to save)"
                  className="flex-1 min-h-[60px] resize-none text-sm"
                  disabled={analyzeNoteMutation.isPending}
                />
                <Button
                  onClick={handleAddNote}
                  disabled={!currentNote.trim() || analyzeNoteMutation.isPending}
                  size="sm"
                  className="self-end"
                >
                  {analyzeNoteMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Shift+Enter for new line • Enter for AI coaching
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
