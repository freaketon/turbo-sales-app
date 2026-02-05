/*
Design: Kinetic Energy Interface
- Expandable objection response cards
- Color-coded by objection type
*/

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, DollarSign, Shield, Clock } from 'lucide-react';

interface ObjectionResponse {
  type: 'money' | 'trust' | 'timing';
  title: string;
  icon: React.ReactNode;
  color: string;
  responses: {
    label: string;
    script: string[];
  }[];
}

const objectionResponses: ObjectionResponse[] = [
  {
    type: 'money',
    title: 'Money / Price Objections',
    icon: <DollarSign className="w-5 h-5" />,
    color: 'secondary',
    responses: [
      {
        label: '"$5k feels expensive"',
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
        label: '"We don\'t have budget right now"',
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
      }
    ]
  },
  {
    type: 'trust',
    title: 'Trust / Risk Objections',
    icon: <Shield className="w-5 h-5" />,
    color: 'accent',
    responses: [
      {
        label: '"This feels early"',
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
        label: '"What if it doesn\'t work for our setup?"',
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
        label: '"We\'ve been burned by tools before"',
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
      }
    ]
  },
  {
    type: 'timing',
    title: 'Timing Objections',
    icon: <Clock className="w-5 h-5" />,
    color: 'primary',
    responses: [
      {
        label: '"Now isn\'t the right time"',
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
        label: '"Let me think about it"',
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
      }
    ]
  }
];

export default function ObjectionHandler() {
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [expandedResponse, setExpandedResponse] = useState<string | null>(null);

  const toggleType = (type: string) => {
    setExpandedType(expandedType === type ? null : type);
    setExpandedResponse(null);
  };

  const toggleResponse = (label: string) => {
    setExpandedResponse(expandedResponse === label ? null : label);
  };

  return (
    <div className="space-y-4 my-6">
      {objectionResponses.map((objection, index) => (
        <motion.div
          key={objection.type}
          className="border border-border/50 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3 + index * 0.1,
            type: 'spring',
            stiffness: 300,
            damping: 20
          }}
        >
          {/* Objection type header */}
          <button
            onClick={() => toggleType(objection.type)}
            className={`w-full p-5 flex items-center justify-between transition-colors ${
              expandedType === objection.type
                ? `bg-${objection.color}/20 border-b border-${objection.color}/30`
                : 'bg-card/50 hover:bg-card'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-${objection.color}/20 flex items-center justify-center text-${objection.color}`}>
                {objection.icon}
              </div>
              <span className="font-semibold text-foreground text-left">
                {objection.title}
              </span>
            </div>
            <motion.div
              animate={{ rotate: expandedType === objection.type ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </button>

          {/* Objection responses */}
          <AnimatePresence>
            {expandedType === objection.type && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-3 bg-muted/10">
                  {objection.responses.map((response, respIndex) => (
                    <div
                      key={respIndex}
                      className="border border-border/30 rounded-lg overflow-hidden bg-background/50"
                    >
                      {/* Response label */}
                      <button
                        onClick={() => toggleResponse(response.label)}
                        className="w-full p-4 flex items-center justify-between hover:bg-muted/20 transition-colors"
                      >
                        <span className="font-mono text-sm text-foreground/90 text-left">
                          {response.label}
                        </span>
                        <motion.div
                          animate={{ rotate: expandedResponse === response.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                      </button>

                      {/* Response script */}
                      <AnimatePresence>
                        {expandedResponse === response.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 space-y-2 font-mono text-sm">
                              {response.script.map((line, lineIndex) => (
                                <p
                                  key={lineIndex}
                                  className={`${
                                    line.startsWith('[') || line.startsWith('If ')
                                      ? 'text-muted-foreground italic text-xs'
                                      : line.includes(':') && !line.startsWith('"')
                                      ? `text-${objection.color} font-semibold`
                                      : 'text-foreground/90'
                                  }`}
                                >
                                  {line}
                                </p>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Re-close reminder */}
      <motion.div
        className="mt-6 p-5 rounded-xl bg-primary/10 border border-primary/30"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.6,
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
      >
        <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          After Handling Objection - Re-Close
        </h4>
        <div className="space-y-2 font-mono text-sm text-foreground/90">
          <p>"Given the guarantee, this either works or it doesn't — but waiting keeps the tax running."</p>
          <p className="font-semibold">"Do you want me to send the link, or should I release the seat?"</p>
          <p className="text-xs text-muted-foreground italic">[Stop talking again]</p>
        </div>
      </motion.div>
    </div>
  );
}
