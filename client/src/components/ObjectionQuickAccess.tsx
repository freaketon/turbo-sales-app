/*
Objection Quick Access - Floating button with improved Acknowledge-Clarify-Reframe framework
*/

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, CheckCircle, XCircle, DollarSign, Shield, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { improvedObjectionResponses, type ObjectionCategory } from '@/lib/improvedObjections';

const categoryConfig = {
  trust: {
    icon: <Shield className="w-5 h-5" />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  timing: {
    icon: <Clock className="w-5 h-5" />,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10'
  },
  money: {
    icon: <DollarSign className="w-5 h-5" />,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  competition: {
    icon: <Users className="w-5 h-5" />,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  }
};

export default function ObjectionQuickAccess() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedObjection, setSelectedObjection] = useState<string | null>(null);
  const [objectionCleared, setObjectionCleared] = useState<boolean | null>(null);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedObjection(null);
    setObjectionCleared(null);
  };

  const handleMarkCleared = (cleared: boolean) => {
    setObjectionCleared(cleared);
    toast.success(
      cleared
        ? 'Objection cleared! Proceed to re-close.'
        : 'Objection not cleared. Consider disqualifying or asking more clarifying questions.'
    );
    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  const selectedObjData = improvedObjectionResponses.find(o => o.objection === selectedObjection);

  return (
    <>
      {/* Floating button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Objection modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-accent" />
              {selectedObjection ? 'Objection Response' : 'Quick Objection Handler'}
            </DialogTitle>
          </DialogHeader>

          {!selectedObjection ? (
            // Objection list
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select an objection to see the Acknowledge → Clarify → Reframe response:
              </p>

              {Object.entries(
                improvedObjectionResponses.reduce((acc, obj) => {
                  if (!acc[obj.category]) acc[obj.category] = [];
                  acc[obj.category].push(obj);
                  return acc;
                }, {} as Record<ObjectionCategory, typeof improvedObjectionResponses>)
              ).map(([category, objections]) => {
                const config = categoryConfig[category as ObjectionCategory];
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <div className={`w-8 h-8 rounded-full ${config.bgColor} flex items-center justify-center ${config.color}`}>
                        {config.icon}
                      </div>
                      <span className="capitalize">{category}</span>
                    </div>
                    <div className="grid gap-2 pl-10">
                      {objections.map(obj => (
                        <button
                          key={obj.objection}
                          onClick={() => setSelectedObjection(obj.objection)}
                          className="text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors text-sm"
                        >
                          {obj.objection}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Selected objection response
            <div className="space-y-4">
              <button
                onClick={() => setSelectedObjection(null)}
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                ← Back to objections
              </button>

              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <h4 className="font-semibold text-foreground mb-1">{selectedObjData?.objection}</h4>
                <p className="text-xs text-muted-foreground capitalize">
                  {selectedObjData?.category} objection
                </p>
              </div>

              {selectedObjData && (
                <div className="space-y-4">
                  {/* Acknowledge */}
                  <div className="bg-blue-500/5 rounded-lg p-4 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-xs font-bold">
                        1
                      </div>
                      <h5 className="text-sm font-bold text-blue-500 uppercase">Acknowledge</h5>
                    </div>
                    <p className="text-sm text-foreground/90">{selectedObjData.acknowledge}</p>
                  </div>

                  {/* Clarify */}
                  <div className="bg-amber-500/5 rounded-lg p-4 border border-amber-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-xs font-bold">
                        2
                      </div>
                      <h5 className="text-sm font-bold text-amber-500 uppercase">Clarify</h5>
                    </div>
                    <div className="space-y-2">
                      {selectedObjData.clarify.map((question, idx) => (
                        <p key={idx} className="text-sm text-foreground/90">
                          {question}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Reframe */}
                  <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-xs font-bold">
                        3
                      </div>
                      <h5 className="text-sm font-bold text-green-500 uppercase">Reframe</h5>
                    </div>
                    <p className="text-sm text-foreground/90">{selectedObjData.reframe}</p>
                  </div>

                  {/* Re-close */}
                  <div className="bg-purple-500/5 rounded-lg p-4 border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 text-xs font-bold">
                        4
                      </div>
                      <h5 className="text-sm font-bold text-purple-500 uppercase">Re-close</h5>
                    </div>
                    <p className="text-sm text-foreground/90">{selectedObjData.reclose}</p>
                  </div>
                </div>
              )}

              {objectionCleared === null && (
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => handleMarkCleared(true)}
                    className="flex-1 gap-2"
                    variant="default"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Objection Cleared
                  </Button>
                  <Button
                    onClick={() => handleMarkCleared(false)}
                    className="flex-1 gap-2"
                    variant="outline"
                  >
                    <XCircle className="w-4 h-4" />
                    Not Cleared
                  </Button>
                </div>
              )}

              {objectionCleared !== null && (
                <div
                  className={`p-4 rounded-lg border ${
                    objectionCleared
                      ? 'bg-accent/10 border-accent/30 text-accent'
                      : 'bg-destructive/10 border-destructive/30 text-destructive'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {objectionCleared ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Cleared! Proceed to re-close.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5" />
                        <span className="font-semibold">Not cleared. Consider disqualifying.</span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
