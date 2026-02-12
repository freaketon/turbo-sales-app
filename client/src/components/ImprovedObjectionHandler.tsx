/*
Improved Objection Handler: Acknowledge → Clarify → Reframe
Structured framework to overcome tendency to pivot away or counter with enthusiasm
*/

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, DollarSign, Shield, Clock, Users } from 'lucide-react';
import { improvedObjectionResponses, type ObjectionCategory } from '@/lib/improvedObjections';

const categoryConfig = {
  trust: {
    title: 'Trust Objections',
    icon: <Shield className="w-5 h-5" />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  },
  timing: {
    title: 'Timing Objections',
    icon: <Clock className="w-5 h-5" />,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30'
  },
  money: {
    title: 'Money Objections',
    icon: <DollarSign className="w-5 h-5" />,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30'
  },
  competition: {
    title: 'Competition Objections',
    icon: <Users className="w-5 h-5" />,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30'
  }
};

export default function ImprovedObjectionHandler() {
  const [expandedCategory, setExpandedCategory] = useState<ObjectionCategory | null>(null);
  const [expandedObjection, setExpandedObjection] = useState<string | null>(null);

  const groupedObjections = improvedObjectionResponses.reduce((acc, obj) => {
    if (!acc[obj.category]) {
      acc[obj.category] = [];
    }
    acc[obj.category].push(obj);
    return acc;
  }, {} as Record<ObjectionCategory, typeof improvedObjectionResponses>);

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-lg p-4 border border-border">
        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Objection Handling Framework
        </h4>
        <p className="text-sm text-muted-foreground mb-3">
          Follow this structure for every objection:
        </p>
        <ol className="text-sm space-y-2 text-foreground">
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-500">1. Acknowledge:</span>
            <span>Validate their concern without agreeing or disagreeing</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-500">2. Clarify:</span>
            <span>Ask questions to understand the root cause</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-green-500">3. Reframe:</span>
            <span>Shift perspective using their words and your cost lock</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-purple-500">4. Re-close:</span>
            <span>Binary choice - move forward or stay with current system</span>
          </li>
        </ol>
      </div>

      <div className="space-y-3">
        {(Object.keys(groupedObjections) as ObjectionCategory[]).map(category => {
          const config = categoryConfig[category];
          const isExpanded = expandedCategory === category;
          const objections = groupedObjections[category];

          return (
            <div key={category} className="glass-card rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : category)}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center ${config.color}`}>
                    {config.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground">{config.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {objections.length} common objection{objections.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 space-y-2">
                      {objections.map(obj => {
                        const isObjExpanded = expandedObjection === obj.objection;

                        return (
                          <div
                            key={obj.objection}
                            className={`border rounded-lg overflow-hidden ${config.borderColor} ${config.bgColor}`}
                          >
                            <button
                              onClick={() => setExpandedObjection(isObjExpanded ? null : obj.objection)}
                              className="w-full p-3 text-left hover:bg-background/50 transition-colors flex items-center justify-between"
                            >
                              <span className="text-sm font-medium text-foreground">
                                {obj.objection}
                              </span>
                              <motion.div
                                animate={{ rotate: isObjExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                              </motion.div>
                            </button>

                            <AnimatePresence>
                              {isObjExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-4 pt-0 space-y-4 bg-background/50">
                                    {/* Acknowledge */}
                                    <div>
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-xs font-bold">
                                          1
                                        </div>
                                        <h5 className="text-xs font-bold text-blue-500 uppercase">
                                          Acknowledge
                                        </h5>
                                      </div>
                                      <p className="text-sm text-foreground/90 pl-8">
                                        {obj.acknowledge}
                                      </p>
                                    </div>

                                    {/* Clarify */}
                                    <div>
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-xs font-bold">
                                          2
                                        </div>
                                        <h5 className="text-xs font-bold text-amber-500 uppercase">
                                          Clarify
                                        </h5>
                                      </div>
                                      <div className="space-y-2 pl-8">
                                        {obj.clarify.map((question, idx) => (
                                          <p key={idx} className="text-sm text-foreground/90">
                                            {question}
                                          </p>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Reframe */}
                                    <div>
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-xs font-bold">
                                          3
                                        </div>
                                        <h5 className="text-xs font-bold text-green-500 uppercase">
                                          Reframe
                                        </h5>
                                      </div>
                                      <p className="text-sm text-foreground/90 pl-8">
                                        {obj.reframe}
                                      </p>
                                    </div>

                                    {/* Re-close */}
                                    <div>
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 text-xs font-bold">
                                          4
                                        </div>
                                        <h5 className="text-xs font-bold text-purple-500 uppercase">
                                          Re-close
                                        </h5>
                                      </div>
                                      <p className="text-sm text-foreground/90 pl-8">
                                        {obj.reclose}
                                      </p>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
        <p className="text-sm text-foreground font-medium mb-2">
          Remember: Never pivot away or counter with enthusiasm
        </p>
        <p className="text-xs text-muted-foreground">
          Stay calm. Follow the framework. Use their words. Reference the cost lock. Binary close.
        </p>
      </div>
    </div>
  );
}
