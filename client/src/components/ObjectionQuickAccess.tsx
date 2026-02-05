/*
Design: Kinetic Energy Interface
- Floating action button for quick objection access
- Modal with objection selection and response
- Mark as cleared/not cleared before returning to flow
*/

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, CheckCircle, XCircle, DollarSign, Shield, Clock, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Objection {
  id: string;
  category: 'money' | 'trust' | 'timing' | 'competition';
  categoryLabel: string;
  icon: React.ReactNode;
  color: string;
  label: string;
  script: string[];
}

const objections: Objection[] = [
  // Money objections
  {
    id: 'money-expensive',
    category: 'money',
    categoryLabel: 'Money',
    icon: <DollarSign className="w-5 h-5" />,
    color: 'secondary',
    label: '$5k feels expensive',
    script: [
      '"Totally fair. Let\'s ground it."',
      '',
      '"One editor losing 5 hours a week costs you $13–26k a year."',
      '',
      '"With two editors, this pays for itself even if TURBO only works halfway."',
      '',
      'Anchor:',
      '"$5k isn\'t the cost. It\'s the cap on how much this can fail."',
      '',
      'Close:',
      '"Given the guarantee, this either saves you real money — or costs you nothing."',
      '',
      '[Stop talking]'
    ]
  },
  {
    id: 'money-budget',
    category: 'money',
    categoryLabel: 'Money',
    icon: <DollarSign className="w-5 h-5" />,
    color: 'secondary',
    label: 'We don\'t have budget right now',
    script: [
      'Clarify:',
      '"Is that because cash is tight — or because this isn\'t a priority?"',
      '',
      'If not a priority → disqualify.',
      '',
      'If cash timing:',
      '"Understood. The Invisible Tax doesn\'t pause though."',
      '',
      '"Every month you wait is another few thousand burned in editor time."',
      '',
      'Close:',
      '"If it fixes the problem, waiting costs more than moving forward."'
    ]
  },
  // Trust objections
  {
    id: 'trust-early',
    category: 'trust',
    categoryLabel: 'Trust',
    icon: <Shield className="w-5 h-5" />,
    color: 'accent',
    label: 'This feels early',
    script: [
      'Agree + flip:',
      '"You\'re right. It is early."',
      '',
      '"That\'s exactly why the Founders Circle exists."',
      '',
      'Anchor:',
      '"Early doesn\'t mean risky. It means influence, priority, and downside protection."',
      '',
      'Guarantee kill shot:',
      '"If it doesn\'t recover 50 hours in 90 days, we refund everything and pay you $500."',
      '',
      '[Silence]'
    ]
  },
  {
    id: 'trust-setup',
    category: 'trust',
    categoryLabel: 'Trust',
    icon: <Shield className="w-5 h-5" />,
    color: 'accent',
    label: 'What if it doesn\'t work for our setup?',
    script: [
      'Reframe:',
      '"That\'s why we don\'t sell self-serve."',
      '',
      '"This is Zero-Touch / White-Glove. We connect your storage, index your archive, and validate it with your editors."',
      '',
      'Anchor:',
      '"If it doesn\'t work in your environment, you don\'t pay."'
    ]
  },
  {
    id: 'trust-burned',
    category: 'trust',
    categoryLabel: 'Trust',
    icon: <Shield className="w-5 h-5" />,
    color: 'accent',
    label: 'We\'ve been burned by tools before',
    script: [
      'Acknowledge:',
      '"Makes sense. Most tools add workflow."',
      '',
      'Differentiate:',
      '"TURBO removes work. Editors stop searching. Nothing else changes."',
      '',
      'Guarantee again:',
      '"And if it doesn\'t change behavior, you get your money back."'
    ]
  },
  // Timing objections
  {
    id: 'timing-not-right',
    category: 'timing',
    categoryLabel: 'Timing',
    icon: <Clock className="w-5 h-5" />,
    color: 'primary',
    label: 'Now isn\'t the right time',
    script: [
      'Clarify first:',
      '"What would need to change for it to be the right time?"',
      '',
      'If vague → not real pain → disqualify.',
      '',
      'If specific (launch, hiring, deadline):',
      'Reframe:',
      '"That\'s actually when the footage hunt gets worse."',
      '',
      '"The more you publish, the more expensive this problem becomes."',
      '',
      'Close:',
      '"Solving this before things ramp usually saves the most."'
    ]
  },
  {
    id: 'timing-think',
    category: 'timing',
    categoryLabel: 'Timing',
    icon: <Clock className="w-5 h-5" />,
    color: 'primary',
    label: 'Let me think about it',
    script: [
      'Interrupt the stall (politely):',
      '"Totally fine — what specifically do you need to think through?"',
      '',
      'If they can\'t answer → no urgency.',
      '',
      'Anchor:',
      '"This is a yes-or-no problem."',
      '',
      '"Either the footage hunt is expensive enough to fix — or it isn\'t."',
      '',
      'Close:',
      '"Which side are you on right now?"'
    ]
  },
  // Competition objections
  {
    id: 'competition-organized',
    category: 'competition',
    categoryLabel: 'Competition',
    icon: <Package className="w-5 h-5" />,
    color: 'primary',
    label: 'We already organize our files',
    script: [
      'Reframe (key TURBO positioning):',
      '"Organization fails at scale."',
      '',
      '"TURBO isn\'t organization. It\'s comprehension."',
      '',
      'Follow-up question (trapdoor):',
      '"How long does it take to find a very specific moment from six months ago?"',
      '',
      '[Let them answer. Then shut up.]'
    ]
  },
  {
    id: 'competition-dam',
    category: 'competition',
    categoryLabel: 'Competition',
    icon: <Package className="w-5 h-5" />,
    color: 'primary',
    label: 'We use a DAM / asset manager',
    script: [
      'Differentiate:',
      '"DAMs manage files."',
      '',
      '"TURBO understands footage."',
      '',
      'Anchor:',
      '"If your editor still has to remember filenames, timelines, or folders — the hunt still exists."'
    ]
  }
];

export default function ObjectionQuickAccess() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedObjection, setSelectedObjection] = useState<Objection | null>(null);
  const [showResponse, setShowResponse] = useState(false);

  const handleSelectObjection = (objection: Objection) => {
    setSelectedObjection(objection);
    setShowResponse(true);
  };

  const handleCleared = () => {
    toast.success('Objection cleared! Returning to flow...');
    setIsOpen(false);
    setSelectedObjection(null);
    setShowResponse(false);
  };

  const handleNotCleared = () => {
    toast.error('Objection not cleared. Consider disqualifying or trying different approach.');
    setIsOpen(false);
    setSelectedObjection(null);
    setShowResponse(false);
  };

  const handleBack = () => {
    setShowResponse(false);
    setSelectedObjection(null);
  };

  return (
    <>
      {/* Floating action button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          delay: 0.5
        }}
      >
        <Button
          size="lg"
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow animate-pulse-glow"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Objection modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gradient-text">
              {showResponse ? 'Objection Response' : 'Quick Objection Handler'}
            </DialogTitle>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {!showResponse ? (
              // Objection selection
              <motion.div
                key="selection"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-3 mt-4"
              >
                <p className="text-sm text-muted-foreground mb-4">
                  Select the objection you're hearing to see the response script:
                </p>
                {objections.map((objection) => (
                  <button
                    key={objection.id}
                    onClick={() => handleSelectObjection(objection)}
                    className="w-full p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-${objection.color}/20 flex items-center justify-center text-${objection.color} group-hover:scale-110 transition-transform`}>
                        {objection.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wide">
                          {objection.categoryLabel}
                        </p>
                        <p className="font-semibold text-foreground">
                          {objection.label}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </motion.div>
            ) : (
              // Objection response
              <motion.div
                key="response"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mt-4"
              >
                {selectedObjection && (
                  <>
                    {/* Objection header */}
                    <div className="mb-6 p-4 rounded-lg bg-muted/20 border border-border/50">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg bg-${selectedObjection.color}/20 flex items-center justify-center text-${selectedObjection.color}`}>
                          {selectedObjection.icon}
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wide">
                            {selectedObjection.categoryLabel} Objection
                          </p>
                          <p className="font-semibold text-foreground">
                            "{selectedObjection.label}"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Script */}
                    <div className="bg-muted/10 border border-border/50 rounded-xl p-6 mb-6 font-mono text-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-destructive/80" />
                        <div className="w-3 h-3 rounded-full bg-secondary/80" />
                        <div className="w-3 h-3 rounded-full bg-accent/80" />
                        <span className="ml-2 text-xs text-muted-foreground">RESPONSE SCRIPT</span>
                      </div>
                      <div className="space-y-2">
                        {selectedObjection.script.map((line, index) => (
                          <p
                            key={index}
                            className={`${
                              line.startsWith('[') || line.startsWith('If ')
                                ? 'text-muted-foreground italic text-xs'
                                : line.includes(':') && !line.startsWith('"')
                                ? 'text-accent font-semibold'
                                : 'text-foreground/90'
                            }`}
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Re-close reminder */}
                    <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
                      <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">
                        After Response - Re-Close
                      </p>
                      <p className="text-sm font-mono text-foreground/90">
                        "Given the guarantee, this either works or it doesn't — but waiting keeps the tax running. Do you want me to send the link, or should I release the seat?"
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={handleBack}
                        className="flex-1"
                      >
                        Back to List
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleNotCleared}
                        className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Not Cleared
                      </Button>
                      <Button
                        onClick={handleCleared}
                        className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Cleared
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
