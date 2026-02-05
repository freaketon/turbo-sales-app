/*
Design: Kinetic Energy Interface
- Collapsible sidebar showing all answers
- Organized by step with visual indicators
*/

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, FileText } from 'lucide-react';
import { salesFlow } from '@/lib/salesFlow';

interface AnswersSidebarProps {
  answers: Record<string, string>;
}

export default function AnswersSidebar({ answers }: AnswersSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Group answers by step
  const answersByStep = salesFlow.map(step => {
    if (!step.questions) return null;
    
    const stepAnswers = step.questions
      .map(question => {
        const answer = answers[question.id];
        if (!answer) return null;
        
        // Find the label for multiple choice
        const option = question.options?.find(opt => opt.value === answer);
        const displayAnswer = option?.label || answer;
        const isDisqualifying = option?.isDisqualifying || false;
        
        return {
          questionText: question.text,
          answer: displayAnswer,
          isDisqualifying
        };
      })
      .filter(Boolean);
    
    if (stepAnswers.length === 0) return null;
    
    return {
      stepTitle: step.title,
      stepType: step.type,
      answers: stepAnswers
    };
  }).filter(Boolean);

  const totalAnswers = Object.keys(answers).length;

  return (
    <>
      {/* Toggle button - fixed position */}
      <motion.div
        className="fixed top-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          delay: 0.8
        }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="lg"
          className="gap-2 bg-card/90 backdrop-blur-sm border-primary/30 hover:border-primary/50"
        >
          <FileText className="w-5 h-5" />
          <span className="hidden sm:inline">Answers</span>
          {totalAnswers > 0 && (
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {totalAnswers}
            </span>
          )}
          {isOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </motion.div>

      {/* Sidebar panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full sm:w-96 bg-card border-l border-border z-50 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30
              }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground font-['Outfit']">
                      Call Answers
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {totalAnswers} response{totalAnswers !== 1 ? 's' : ''} recorded
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>

                {/* Answers list */}
                {answersByStep.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground text-sm">
                      No answers recorded yet.
                      <br />
                      Start answering questions to see them here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {answersByStep.map((stepData, stepIndex) => stepData && (
                      <motion.div
                        key={stepIndex}
                        className="border border-border/50 rounded-lg p-4 bg-muted/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: stepIndex * 0.05,
                          type: 'spring',
                          stiffness: 300,
                          damping: 20
                        }}
                      >
                        {/* Step title */}
                        <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                          {stepData.stepTitle}
                        </h4>

                        {/* Answers for this step */}
                        <div className="space-y-3">
                          {stepData.answers.map((answerData, answerIndex) => answerData && (
                            <div
                              key={answerIndex}
                              className="space-y-1"
                            >
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {answerData.questionText}
                              </p>
                              <div className="flex items-start gap-2">
                                {answerData.isDisqualifying ? (
                                  <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                                ) : (
                                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                )}
                                <p className={`text-sm font-medium ${
                                  answerData.isDisqualifying 
                                    ? 'text-destructive' 
                                    : 'text-foreground'
                                }`}>
                                  {answerData.answer}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Footer note */}
                {totalAnswers > 0 && (
                  <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <p className="text-xs text-foreground/80">
                      <strong className="text-primary">Note:</strong> These answers are stored in your browser session. 
                      They'll be cleared when you restart the call or close the browser.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
