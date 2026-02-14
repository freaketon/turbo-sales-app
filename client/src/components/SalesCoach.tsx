import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Send, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface Note {
  id: string;
  text: string;
  timestamp: Date;
  aiGuidance?: string;
  type: 'user' | 'system' | 'mirror';
}

interface SalesCoachProps {
  currentStep: string;
  answers: Record<string, string>;
}

// Section-specific prompts for what to capture
const SECTION_PROMPTS: Record<string, string> = {
  'problem-exposure': '💡 Capture their answers: What slows them down? How do they find footage? Time spent searching?',
  'alternative-solutions': '💡 Capture: What have they tried? Why didn\'t it work? How much invested?',
  'dream-outcome': '💡 Capture: Their magic wand solution. What would it solve? Financial impact?',
  'price-anchor': '💡 Capture: Reasonable price? Unreasonable price?',
  'demo-ask-loop': '💡 Capture: Their reaction to each feature. Any objections?',
  'impact-measurement': '💡 Capture: Hours saved per week. Number of editors. Hourly rate.',
  'recap': '💡 Time to repeat EVERYTHING back - check your notes!',
  'the-offer': '💡 Capture: Their reaction to Founders Circle. Price objection?'
};

export function SalesCoach({ currentStep, answers }: SalesCoachProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const getGuidanceMutation = trpc.salesCoach.analyzeNote.useMutation();
  const generateMirrorMutation = trpc.salesCoach.generateMirror.useMutation();

  // Show section-specific prompt when step changes
  useEffect(() => {
    if (SECTION_PROMPTS[currentStep]) {
      const promptNote: Note = {
        id: `prompt-${currentStep}-${Date.now()}`,
        text: SECTION_PROMPTS[currentStep],
        timestamp: new Date(),
        type: 'system'
      };
      setNotes(prev => {
        // Don't add duplicate prompts
        if (prev.some(n => n.text === promptNote.text)) return prev;
        return [...prev, promptNote];
      });
    }
  }, [currentStep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      text: input.trim(),
      timestamp: new Date(),
      type: 'user'
    };

    setNotes(prev => [...prev, newNote]);
    setInput('');

    // Get AI guidance
    try {
      const result = await getGuidanceMutation.mutateAsync({
        note: newNote.text,
        currentStep,
        previousNotes: notes.filter(n => n.type === 'user').map(n => n.text),
        answers
      });

      // Convert guidance to string if it's an array
      const guidanceText = typeof result.guidance === 'string' 
        ? result.guidance 
        : result.guidance.map(c => c.type === 'text' ? c.text : '').join('');
      
      setNotes(prev => prev.map(n => 
        n.id === newNote.id 
          ? { ...n, aiGuidance: guidanceText }
          : n
      ));
    } catch (error) {
      console.error('Failed to get AI guidance:', error);
      setNotes(prev => prev.map(n => 
        n.id === newNote.id 
          ? { ...n, aiGuidance: 'Unable to get guidance at this time.' }
          : n
      ));
    }
  };

  const handleGenerateMirror = async () => {
    // Get all user notes from current section
    const userNotes = notes.filter(n => n.type === 'user').map(n => n.text);
    
    if (userNotes.length === 0) {
      return;
    }

    try {
      const result = await generateMirrorMutation.mutateAsync({
        customerAnswers: userNotes,
        currentStep,
        answers
      });

      const mirrorNote: Note = {
        id: `mirror-${Date.now()}`,
        text: result.mirrorStatement,
        timestamp: new Date(),
        type: 'mirror'
      };

      setNotes(prev => [...prev, mirrorNote]);
    } catch (error) {
      console.error('Failed to generate mirror:', error);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Show "Generate Mirror" button for sections that need mirroring
  const showMirrorButton = ['problem-exposure', 'alternative-solutions', 'dream-outcome', 'recap'].includes(currentStep);

  return (
    <>
      {/* Floating button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Button
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageSquare className="w-6 h-6" />
          )}
        </Button>
        {notes.filter(n => n.type === 'user').length > 0 && !isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {notes.filter(n => n.type === 'user').length}
          </motion.div>
        )}
      </motion.div>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="glass-card rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
              {/* Header */}
              <div className="p-4 border-b border-border bg-card/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">Sales Coach</h3>
                    <p className="text-xs text-muted-foreground">
                      Capture answers • Get perfect framing
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {notes.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm font-medium">
                      Your Co-Pilot for Perfect Framing
                    </p>
                    <p className="text-xs mt-2 px-4">
                      Type what the customer says during the call.
                      <br />
                      I'll help you repeat it back perfectly.
                    </p>
                  </div>
                ) : (
                  notes.map(note => (
                    <div key={note.id} className="space-y-2">
                      {/* System prompt */}
                      {note.type === 'system' && (
                        <div className="bg-accent/10 border border-accent/30 rounded-lg px-3 py-2">
                          <p className="text-xs text-accent-foreground">{note.text}</p>
                        </div>
                      )}

                      {/* User note */}
                      {note.type === 'user' && (
                        <div className="flex justify-end">
                          <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2 max-w-[85%]">
                            <p className="text-sm">{note.text}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {note.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Mirror statement */}
                      {note.type === 'mirror' && (
                        <div className="bg-secondary/20 border-2 border-secondary rounded-lg px-4 py-3">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <p className="text-xs font-semibold text-secondary-foreground">
                              🎯 REPEAT BACK (Copy & Use)
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopy(note.text, note.id)}
                              className="h-6 px-2"
                            >
                              {copiedId === note.id ? (
                                <CheckCircle2 className="w-3 h-3 text-green-500" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </Button>
                          </div>
                          <p className="text-sm text-foreground whitespace-pre-wrap">{note.text}</p>
                        </div>
                      )}

                      {/* AI guidance */}
                      {note.type === 'user' && note.aiGuidance && (
                        <div className="flex justify-start">
                          <div className="bg-accent/20 text-accent-foreground rounded-2xl rounded-tl-sm px-4 py-2 max-w-[85%] border border-accent/30">
                            <p className="text-xs font-semibold text-accent mb-1">
                              Coach
                            </p>
                            <p className="text-sm">{note.aiGuidance}</p>
                          </div>
                        </div>
                      )}

                      {/* Loading indicator */}
                      {note.type === 'user' && !note.aiGuidance && (
                        <div className="flex justify-start">
                          <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-2">
                            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Mirror button */}
              {showMirrorButton && notes.filter(n => n.type === 'user').length > 0 && (
                <div className="px-4 pb-2">
                  <Button
                    onClick={handleGenerateMirror}
                    disabled={generateMirrorMutation.isPending}
                    className="w-full gap-2"
                    variant="secondary"
                    size="sm"
                  >
                    {generateMirrorMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4" />
                        Generate "Repeat Back" Statement
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-card/50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type what customer said..."
                    className="flex-1 px-4 py-2 rounded-lg bg-background/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    disabled={getGuidanceMutation.isPending}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || getGuidanceMutation.isPending}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
