import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface Note {
  id: string;
  text: string;
  timestamp: Date;
  aiGuidance?: string;
}

interface SalesCoachProps {
  currentStep: string;
}

export function SalesCoach({ currentStep }: SalesCoachProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState('');
  
  const getGuidanceMutation = trpc.salesCoach.analyzeNote.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      text: input.trim(),
      timestamp: new Date()
    };

    setNotes(prev => [...prev, newNote]);
    setInput('');

    // Get AI guidance
    try {
      const result = await getGuidanceMutation.mutateAsync({
        note: newNote.text,
        currentStep,
        previousNotes: notes.map(n => n.text),
        answers: {}
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
        {notes.length > 0 && !isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {notes.length}
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
            <div className="glass-card rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
              {/* Header */}
              <div className="p-4 border-b border-border bg-card/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">Sales Coach</h3>
                    <p className="text-xs text-muted-foreground">
                      Take notes • Get AI guidance
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
                    <p className="text-sm">
                      Type observations during the call.
                    </p>
                    <p className="text-xs mt-1">
                      AI will provide strategic coaching.
                    </p>
                  </div>
                ) : (
                  notes.map(note => (
                    <div key={note.id} className="space-y-2">
                      {/* User note */}
                      <div className="flex justify-end">
                        <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2 max-w-[85%]">
                          <p className="text-sm">{note.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {note.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>

                      {/* AI guidance */}
                      {note.aiGuidance && (
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
                      {!note.aiGuidance && (
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

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-card/50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your observation..."
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
