// TURBO Discovery Call Script - 12 Sections (20 Minutes)
// Updated to match new script structure

export type StepType = 
  | 'frame-call'
  | 'problem-exposure'
  | 'alternative-solutions'
  | 'dream-outcome'
  | 'price-anchor'
  | 'transition-demo'
  | 'demo-ask-loop'
  | 'impact-measurement'
  | 'recap'
  | 'availability-check'
  | 'the-offer'
  | 'close'
  | 'disqualify'
  | 'success';

export type QuestionType = 'binary' | 'multiple' | 'text' | 'number';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: {
    value: string;
    label: string;
    nextStep?: string;
    isDisqualifying?: boolean;
  }[];
  guidance?: string;
  placeholder?: string;
}

export interface Step {
  id: string;
  type: StepType;
  title: string;
  subtitle?: string;
  content: string[];
  questions?: Question[];
  nextStep?: string;
  previousStep?: string;
  scriptLines?: string[];
  tips?: string[];
  duration?: string;
}

export const salesFlow: Step[] = [
  // SECTION 1 — FRAME THE CALL (2 min)
  {
    id: 'frame-call',
    type: 'frame-call',
    title: 'Section 1: Frame the Call',
    subtitle: 'Set expectations and get agreement (2 minutes)',
    duration: '2 min',
    content: [
      'Start by framing what today\'s call is about.',
      'Get their agreement before diving in.',
      'This sets the tone for a consultative conversation, not a pitch.'
    ],
    scriptLines: [
      '"Appreciate you taking the time."',
      '"Today is simple."',
      '"I want to understand how your video operation works,"',
      '"What friction exists around your archive,"',
      '"And see if we\'re solving something real."',
      '',
      '"And if we have time, I\'d love to show you an early prototype of what we\'re building and get your feedback. That cool?"',
      '',
      '"Sound fair?"',
      '',
      '[Pause and wait for agreement]'
    ],
    tips: [
      'Keep it casual and founder-to-founder',
      'The pause after "Sound fair?" is critical - wait for their yes',
      'You\'re asking permission, not pitching yet'
    ],
    nextStep: 'problem-exposure'
  },

  // SECTION 2 — PROBLEM EXPOSURE (8–10 min)
  {
    id: 'problem-exposure',
    type: 'problem-exposure',
    title: 'Section 2: Problem Exposure',
    subtitle: 'Discovery Questions - Do NOT mention TURBO (8-10 minutes)',
    duration: '8-10 min',
    content: [
      'Ask open-ended questions to understand their pain.',
      'Do NOT mention TURBO or any solution yet.',
      'Let them talk. Take notes in the chat.',
      'After all questions, mirror back what you heard.'
    ],
    scriptLines: [
      'Ask these questions:',
      '',
      '1. "What slows down your video editing today?"',
      '2. "How do your editors currently find footage?"',
      '3. "What percentage of their week is hunting vs editing?"',
      '4. "When someone needs a specific moment from months ago, what happens?"',
      '5. "How long does that usually take?"',
      '6. "What\'s the hardest part about managing your archive?"',
      '7. "What slows production down?"',
      '8. "Do you ever re-shoot because something couldn\'t be found?"',
      '',
      '[Let them talk. Capture their answers in the chat.]',
      '',
      'Then mirror back:',
      '"So what I\'m hearing is:"',
      '[REPEAT WHAT THEY SAID]',
      '• Footage lives across X locations',
      '• Editors spend roughly Y hours searching',
      '• Sometimes things get re-shot or delayed',
      '',
      '"Did I get that right?"',
      '[Pause]'
    ],
    questions: [
      {
        id: 'problem-1',
        text: 'What slows down your video editing today?',
        type: 'text',
        placeholder: 'Type their answer here...',
        guidance: 'Capture their exact words in the chat'
      },
      {
        id: 'problem-2',
        text: 'How do your editors currently find footage?',
        type: 'text',
        placeholder: 'Type their answer here...'
      },
      {
        id: 'problem-3',
        text: 'What percentage of their week is hunting vs editing?',
        type: 'text',
        placeholder: 'e.g., "20-30% hunting"'
      },
      {
        id: 'problem-4',
        text: 'When someone needs a specific moment from months ago, what happens?',
        type: 'text',
        placeholder: 'Type their answer here...'
      },
      {
        id: 'problem-5',
        text: 'How long does that usually take?',
        type: 'text',
        placeholder: 'e.g., "20-40 minutes per search"'
      },
      {
        id: 'problem-6',
        text: 'What\'s the hardest part about managing your archive?',
        type: 'text',
        placeholder: 'Type their answer here...'
      },
      {
        id: 'problem-7',
        text: 'What slows production down?',
        type: 'text',
        placeholder: 'Type their answer here...'
      },
      {
        id: 'problem-8',
        text: 'Do you ever re-shoot because something couldn\'t be found?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        id: 'mirror-confirmation',
        text: 'Did they confirm your mirror was accurate?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - confirmed' },
          { value: 'clarified', label: 'They clarified/added more' }
        ],
        guidance: 'Make sure they agree with your summary before moving forward'
      }
    ],
    tips: [
      'Do NOT mention TURBO yet',
      'Let them talk - resist the urge to jump in',
      'Use the chat to capture their exact phrases',
      'The mirror is critical - repeat their words, not yours'
    ],
    nextStep: 'alternative-solutions'
  },

  // SECTION 3 — ALTERNATIVE SOLUTIONS
  {
    id: 'alternative-solutions',
    type: 'alternative-solutions',
    title: 'Section 3: Alternative Solutions',
    subtitle: 'What have they tried? Why didn\'t it work?',
    content: [
      'Understand what they\'ve already attempted.',
      'This reveals their sophistication and pain level.',
      'Mirror back their attempts and why they failed.'
    ],
    scriptLines: [
      '"What have you tried to fix this?"',
      '',
      '[Let them answer]',
      '',
      '"Anything else you\'ve tried?"',
      '',
      '[Let them answer]',
      '',
      '"Why hasn\'t that fully solved it?"',
      '',
      '[Let them answer]',
      '',
      '"How much time or money has gone into trying to fix it?"',
      '',
      '[Let them answer]',
      '',
      'Mirror again:',
      '"So you tried A, B, C."',
      '"But [REPEAT BACK WHAT THEY SAID]."',
      '"Fair?"'
    ],
    questions: [
      {
        id: 'tried-1',
        text: 'What have you tried to fix this?',
        type: 'text',
        placeholder: 'e.g., "Tried Frame.io, hired a DAM consultant, built Airtable system"'
      },
      {
        id: 'tried-2',
        text: 'Anything else you\'ve tried?',
        type: 'text',
        placeholder: 'Type additional attempts...'
      },
      {
        id: 'why-failed',
        text: 'Why hasn\'t that fully solved it?',
        type: 'text',
        placeholder: 'Capture why their attempts didn\'t work'
      },
      {
        id: 'investment',
        text: 'How much time or money has gone into trying to fix it?',
        type: 'text',
        placeholder: 'e.g., "$10k on consultants, 3 months of team time"'
      },
      {
        id: 'mirror-confirmation-2',
        text: 'Did they confirm your mirror of their attempts?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - confirmed' },
          { value: 'clarified', label: 'They clarified/added more' }
        ]
      }
    ],
    tips: [
      'This shows you understand their journey',
      'Failed attempts = higher pain = more likely to buy',
      'Use their exact words when mirroring'
    ],
    nextStep: 'dream-outcome'
  },

  // SECTION 4 — DREAM OUTCOME
  {
    id: 'dream-outcome',
    type: 'dream-outcome',
    title: 'Section 4: Dream Outcome',
    subtitle: 'Magic wand question - let them define ideal state',
    content: [
      'Let them paint the picture of the perfect solution.',
      'This gives you their buying criteria.',
      'Summarize their ideal state back to them.'
    ],
    scriptLines: [
      '"If you could wave a magic wand, what would the perfect search tool be?"',
      '',
      '[Let them answer]',
      '',
      '"What would it solve?"',
      '',
      '[Let them answer]',
      '',
      '"What would that unlock for your team?"',
      '',
      '[Let them answer]',
      '',
      '"What would that mean financially?"',
      '',
      '[Let them answer]',
      '',
      'Summarize:',
      '"So ideally:"',
      '[NOT SCRIPTED - REPEAT BACK]',
      '• Someone types what they\'re thinking',
      '• Finds the exact moment instantly',
      '• Stops re-shooting',
      '• Recovers X hours per week',
      '',
      '"Accurate?"'
    ],
    questions: [
      {
        id: 'magic-wand',
        text: 'If you could wave a magic wand, what would the perfect search tool be?',
        type: 'text',
        placeholder: 'Capture their ideal solution...'
      },
      {
        id: 'what-solve',
        text: 'What would it solve?',
        type: 'text',
        placeholder: 'Type their answer...'
      },
      {
        id: 'what-unlock',
        text: 'What would that unlock for your team?',
        type: 'text',
        placeholder: 'Type their answer...'
      },
      {
        id: 'financial-impact',
        text: 'What would that mean financially?',
        type: 'text',
        placeholder: 'e.g., "Save $50k/year, ship 2x faster"'
      },
      {
        id: 'dream-confirmation',
        text: 'Did they confirm your summary of their ideal state?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - confirmed' },
          { value: 'clarified', label: 'They clarified/added more' }
        ]
      }
    ],
    tips: [
      'Let them define success - don\'t lead them',
      'Their words = your demo script',
      'This is their buying criteria - write it down'
    ],
    nextStep: 'price-anchor'
  },

  // SECTION 5 — PRICE ANCHOR (Before Demo)
  {
    id: 'price-anchor',
    type: 'price-anchor',
    title: 'Section 5: Price Anchor',
    subtitle: 'Discover their price expectations BEFORE showing anything',
    content: [
      'This is critical - anchor price before the demo.',
      'You need to know their internal budget range.',
      'Two questions: reasonable price and unreasonable price.'
    ],
    scriptLines: [
      '"One of the things we\'re trying to figure out before launch is the right price point for something like this."',
      '',
      '"Hypothetically, if something eliminated that friction completely, what would that be worth per year?"',
      '',
      '[Let them answer]',
      '',
      'Then:',
      '"And at what price would it feel unreasonable, even if it solved it perfectly?"',
      '',
      '[Let them answer]',
      '',
      'Now you have their internal anchor.'
    ],
    questions: [
      {
        id: 'reasonable-price',
        text: 'If something eliminated that friction completely, what would that be worth per year?',
        type: 'text',
        placeholder: 'e.g., "$15k-$20k per year"'
      },
      {
        id: 'unreasonable-price',
        text: 'At what price would it feel unreasonable, even if it solved it perfectly?',
        type: 'text',
        placeholder: 'e.g., "$50k+ would be too much"'
      }
    ],
    tips: [
      'This is BEFORE the demo - critical sequencing',
      'Now you know if $5k is a steal or a stretch',
      'If they say "$2k max" you might disqualify or adjust offer'
    ],
    nextStep: 'transition-demo'
  },

  // SECTION 6 — TRANSITION TO DEMO
  {
    id: 'transition-demo',
    type: 'transition-demo',
    title: 'Section 6: Transition to Demo',
    subtitle: 'Set expectations - it\'s rough, early, feedback-focused',
    content: [
      'Lower expectations before showing anything.',
      'Frame it as early prototype, not finished product.',
      'Ask permission to show it.'
    ],
    scriptLines: [
      '"If you have a few more minutes, I can show you an early prototype we\'re building."',
      '',
      '"It\'s rough."',
      '"Still early."',
      '"But I\'d love your feedback."',
      '',
      '"Up for it?"',
      '',
      '[Wait for yes]'
    ],
    questions: [
      {
        id: 'demo-permission',
        text: 'Did they agree to see the demo?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - show demo', nextStep: 'demo-ask-loop' },
          { value: 'no', label: 'No - not interested', nextStep: 'disqualify', isDisqualifying: true }
        ]
      }
    ],
    tips: [
      'Lower expectations = easier to exceed them',
      'If they say no, they\'re not qualified'
    ],
    nextStep: 'demo-ask-loop'
  },

  // SECTION 7 — DEMO-ASK LOOP (Max 3-5 Features)
  {
    id: 'demo-ask-loop',
    type: 'demo-ask-loop',
    title: 'Section 7: Demo-Ask Loop',
    subtitle: 'Show 3-5 features based on what they said (Max 3-5 features)',
    content: [
      'Show features that directly address their pain.',
      'After each feature: validate, surface objections, handle them.',
      'Use the Acknowledge → Agree → Reframe pattern for objections.'
    ],
    scriptLines: [
      'Feature 1 — Intent Search',
      '"You mentioned it takes 20–40 minutes to find a specific moment."',
      '"Here\'s how we\'re thinking about that."',
      '',
      'Show: Search: "Find the clip where pricing was mentioned in Q3."',
      'Results appear instantly.',
      '',
      'Validation:',
      '"Would this work for you?"',
      '"Could you see yourself using this?"',
      '"Would this solve your problem?"',
      '"Would your team actually use this?"',
      '',
      'Objection surfacing:',
      '"What wouldn\'t work about this?"',
      '"Anything that would stop adoption?"',
      '',
      'Handle objection:',
      '• Acknowledge',
      '• Agree',
      '• Reframe',
      '',
      'Then circle back:',
      '"This is awesome feedback."',
      '"So if I understand correctly, if it did X, Y and Z and could connect to Z - then this would be perfect for you."',
      '"Did I get that right?"',
      '',
      '---',
      '',
      'Feature 2 — No Tagging / No Reorganization',
      '"You also said tagging never sticks."',
      '',
      'Explain:',
      '"This requires no tagging."',
      '"No reorganization."',
      '"We index what already exists."',
      '',
      'Validation:',
      '"Would that remove friction for your editors?"',
      '',
      '---',
      '',
      'Feature 3 — Zero-Touch Setup',
      '"You mentioned no one has time to overhaul storage."',
      '',
      'Explain:',
      '"We connect to your storage."',
      '"Index your archive."',
      '"Calibrate."',
      '"You search."',
      '',
      'Validation:',
      '"Does that remove implementation drag?"'
    ],
    questions: [
      {
        id: 'feature-1-validation',
        text: 'Feature 1 (Intent Search) - Would this work for them?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - they see value' },
          { value: 'objection', label: 'They raised objection' }
        ]
      },
      {
        id: 'feature-1-objection',
        text: 'If objection: What was their concern?',
        type: 'text',
        placeholder: 'e.g., "Worried about accuracy", "Need multi-language support"'
      },
      {
        id: 'feature-1-handled',
        text: 'Did you handle the objection successfully?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - resolved' },
          { value: 'no', label: 'No - still concerned' }
        ]
      },
      {
        id: 'feature-2-validation',
        text: 'Feature 2 (No Tagging) - Would this remove friction?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - they see value' },
          { value: 'no', label: 'Not convinced' }
        ]
      },
      {
        id: 'feature-3-validation',
        text: 'Feature 3 (Zero-Touch Setup) - Does this remove implementation drag?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - they see value' },
          { value: 'no', label: 'Not convinced' }
        ]
      },
      {
        id: 'additional-features',
        text: 'Did you show any additional features? (Optional)',
        type: 'text',
        placeholder: 'List any other features shown and their reaction...'
      }
    ],
    tips: [
      'Only show features that address THEIR pain',
      'Validate after each feature - don\'t keep going if they\'re not excited',
      'Objections are buying signals - handle them with ACR pattern',
      'If they\'re not excited after 3 features, they\'re not qualified'
    ],
    nextStep: 'impact-measurement'
  },

  // SECTION 8 — IMPACT MEASUREMENT
  {
    id: 'impact-measurement',
    type: 'impact-measurement',
    title: 'Section 8: Impact Measurement',
    subtitle: 'Calculate live: hours saved × $ value',
    content: [
      'Do the math with them in real-time.',
      'Make the ROI concrete and undeniable.',
      'This anchors the value before you mention price.'
    ],
    scriptLines: [
      '"If this worked exactly as described, how many hours per week would it realistically save?"',
      '',
      '[Let them answer]',
      '',
      'Calculate live:',
      '"How many editors?"',
      '"Multiply by X hours."',
      '"Roughly $____ per year recovered."',
      '',
      '[Pause and let it sink in]'
    ],
    questions: [
      {
        id: 'hours-saved',
        text: 'How many hours per week would this realistically save?',
        type: 'number',
        placeholder: 'e.g., 10'
      },
      {
        id: 'num-editors',
        text: 'How many editors?',
        type: 'number',
        placeholder: 'e.g., 3'
      },
      {
        id: 'hourly-rate',
        text: 'What\'s a reasonable hourly rate for your editors?',
        type: 'number',
        placeholder: 'e.g., 75'
      }
    ],
    tips: [
      'Do this calculation OUT LOUD with them',
      'The bigger the number, the easier the close',
      'If the annual savings is less than $20k, they might not be qualified'
    ],
    nextStep: 'recap'
  },

  // SECTION 9 — RECAP
  {
    id: 'recap',
    type: 'recap',
    title: 'Section 9: Recap',
    subtitle: 'Repeat EVERYTHING back - get final confirmation',
    content: [
      'This is the master summary.',
      'Repeat back all their pain, attempts, dream outcome, and math.',
      'Get their final "yes, that\'s right" before moving to close.'
    ],
    scriptLines: [
      '"To recap:"',
      '[REPEAT BACK what they said]',
      '',
      '"Okay, so I just want to make sure I\'ve got all this."',
      '',
      '"Your biggest challenges with editing are:"',
      '• A, B and C',
      '',
      '"You\'ve tried X, Y and Z solutions, and they didn\'t work because of E, F and G."',
      '',
      '"In a perfect world, there would be a tool that would do L, M, N, O and P."',
      '',
      '"And if that tool existed, it would save you about XXX hours per year and $YYY dollars per year, and you\'d be willing to invest about $AAA to $BBB to get that outcome."',
      '',
      '"Did I get all that right?"',
      '"Anything you would add to that?"',
      '',
      '[Pause]'
    ],
    questions: [
      {
        id: 'recap-confirmation',
        text: 'Did they confirm the entire recap?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - everything is correct' },
          { value: 'corrections', label: 'They made corrections' }
        ]
      },
      {
        id: 'recap-notes',
        text: 'Any corrections or additions they made?',
        type: 'text',
        placeholder: 'Note any changes to the recap...'
      }
    ],
    tips: [
      'This is your trial close - if they don\'t agree here, don\'t move forward',
      'Use their exact words from earlier in the call',
      'The pause after "Did I get all that right?" is critical'
    ],
    nextStep: 'availability-check'
  },

  // SECTION 10 — AVAILABILITY CHECK (Soft Close)
  {
    id: 'availability-check',
    type: 'availability-check',
    title: 'Section 10: Availability Check',
    subtitle: 'Soft close - would they implement if available today?',
    content: [
      'This is the soft close.',
      'If they hesitate, isolate the objection before mentioning price.',
      'If they say yes, move to the offer.'
    ],
    scriptLines: [
      '"If this were available today, would you want to implement it?"',
      '',
      '[Wait for answer]',
      '',
      'If yes → move forward to the offer.',
      'If hesitation → isolate objection before price.'
    ],
    questions: [
      {
        id: 'would-implement',
        text: 'If this were available today, would you want to implement it?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - they want it', nextStep: 'the-offer' },
          { value: 'hesitation', label: 'Hesitation/objection' }
        ]
      },
      {
        id: 'hesitation-reason',
        text: 'If hesitation: What\'s their concern?',
        type: 'text',
        placeholder: 'Capture the objection...'
      },
      {
        id: 'objection-resolved',
        text: 'Did you resolve the objection?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - resolved, moving forward' },
          { value: 'no', label: 'No - still hesitant', nextStep: 'disqualify', isDisqualifying: true }
        ]
      }
    ],
    tips: [
      'If they say yes immediately, they\'re ready to buy',
      'If they hesitate, handle the objection BEFORE mentioning price',
      'If you can\'t resolve hesitation, they\'re not qualified'
    ],
    nextStep: 'the-offer'
  },

  // SECTION 11 — THE OFFER (Founders Circle)
  {
    id: 'the-offer',
    type: 'the-offer',
    title: 'Section 11: The Offer',
    subtitle: 'Founders Circle - $5k with guarantee',
    content: [
      'Lower your tone - this is intimate.',
      'Frame it as exclusive and valuable.',
      'Present the offer: $5k for Founders Circle with guarantee.'
    ],
    scriptLines: [
      '[Lower tone]',
      '',
      '"I wasn\'t planning on bringing this up yet."',
      '"Because you\'ve been so helpful, and your feedback has been so valuable."',
      '"And it seems like what we\'re building here will end up being exactly what you\'re dreaming of."',
      '',
      '"We\'re working with a small group of early partners."',
      '"It\'s called the Early Adopters Founders Circle."',
      '',
      'Includes:',
      '• White-Glove activation',
      '• Direct line to engineering and Executive team',
      '• Roadmap influence',
      '• Beta access to releases',
      '• TURBO Founder Circle (TFC) private chat group',
      '',
      '"We\'re keeping it to 10 partners only that can really help us."',
      '',
      '"Is this group something you\'d be interested in being a part of?"',
      '',
      '[Wait for response]',
      '',
      'If yes:',
      '"Cool, here\'s how it works."',
      '',
      '"Usually we\'d charge $20K for the product + all these bonuses:"',
      '• White-Glove activation',
      '• Direct line to engineering',
      '• Roadmap influence',
      '• Beta access to releases',
      '• Founder Circle private chat group',
      '',
      '"But since the people enrolled are also being generous with their time and feedback, and their experience is vast, we\'re doing it for just $5k."',
      '',
      '"It includes a year of access to the product (after it\'s released) + all the bonuses I mentioned."',
      '',
      '"And if you don\'t save 50 hours of search and archiving in 90 days, you get your money back and I will pay you $500."',
      '',
      '"You in?"',
      '',
      '[Silence. Wait.]',
      '',
      '"Is that something you\'d want to be part of?"'
    ],
    questions: [
      {
        id: 'interested-fc',
        text: 'Are they interested in the Founders Circle?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - interested' },
          { value: 'no', label: 'No - not interested', nextStep: 'disqualify' }
        ]
      },
      {
        id: 'price-reaction',
        text: 'What was their reaction to the $5k price?',
        type: 'multiple',
        options: [
          { value: 'yes', label: 'Yes - ready to buy', nextStep: 'close' },
          { value: 'thinking', label: 'Thinking/considering' },
          { value: 'objection', label: 'Price objection' }
        ]
      },
      {
        id: 'price-objection-notes',
        text: 'If price objection: What did they say?',
        type: 'text',
        placeholder: 'Capture their concern...'
      }
    ],
    tips: [
      'Lower your tone - this is intimate and exclusive',
      'The silence after "You in?" is critical - DO NOT break it',
      'If price objection, return to the math from Section 8',
      'Remind them: "You\'re already losing more than $5k. This just redirects the bleed."'
    ],
    nextStep: 'close'
  },

  // SECTION 12 — CLOSE
  {
    id: 'close',
    type: 'close',
    title: 'Section 12: Close',
    subtitle: 'Get the commitment - activate now or schedule',
    content: [
      'If they said yes, close immediately.',
      'Give them two options: activate now or schedule.',
      'If price objection, return to the math and stop talking.'
    ],
    scriptLines: [
      'If yes:',
      '"Great."',
      '"Do you want to activate now here in the call?"',
      '"Or schedule activation and initial onboarding later on?"',
      '',
      '[Wait for answer]',
      '',
      'If price objection:',
      'Return to math:',
      '"You\'re already losing more than $5k."',
      '"This just redirects the bleed."',
      '',
      '[Stop talking. Wait.]'
    ],
    questions: [
      {
        id: 'close-decision',
        text: 'What did they decide?',
        type: 'multiple',
        options: [
          { value: 'activate-now', label: 'Activate now', nextStep: 'success' },
          { value: 'schedule', label: 'Schedule activation', nextStep: 'success' },
          { value: 'think', label: 'Need to think about it' },
          { value: 'no', label: 'Not moving forward', nextStep: 'disqualify' }
        ]
      },
      {
        id: 'next-steps',
        text: 'What are the next steps?',
        type: 'text',
        placeholder: 'e.g., "Send payment link", "Schedule onboarding call for Friday"'
      }
    ],
    tips: [
      'If they need to "think about it", they\'re not qualified or you missed something',
      'The silence after price objection handling is your close',
      'If they say yes, move fast - get payment or calendar invite before call ends'
    ],
    nextStep: 'success'
  },

  // DISQUALIFY
  {
    id: 'disqualify',
    type: 'disqualify',
    title: 'Not Qualified',
    subtitle: 'Thank them for their time',
    content: [
      'Not every prospect is a fit.',
      'Thank them genuinely for their feedback.',
      'Keep the door open for future.'
    ],
    scriptLines: [
      '"Thanks for your feedback, you have been extremely helpful and for sure this will make our product even better."',
      '',
      '"I don\'t think we\'re the right fit right now, but I really appreciate your time."',
      '',
      '"If things change, feel free to reach out."'
    ],
    tips: [
      'Don\'t burn bridges',
      'They might refer someone else',
      'Capture why they were disqualified in your notes'
    ]
  },

  // SUCCESS
  {
    id: 'success',
    type: 'success',
    title: 'Deal Closed! 🎉',
    subtitle: 'Capture prospect details for your records',
    content: [
      'Congratulations! You closed a Founders Circle member.',
      'Before exporting, capture their contact details for your CRM.'
    ],
    questions: [
      {
        id: 'prospect-name',
        text: 'Prospect Name',
        type: 'text',
        placeholder: 'John Smith'
      },
      {
        id: 'prospect-company',
        text: 'Company',
        type: 'text',
        placeholder: 'Acme Productions'
      },
      {
        id: 'prospect-email',
        text: 'Email (optional)',
        type: 'text',
        placeholder: 'john@acme.com'
      }
    ],
    scriptLines: [
      '"Welcome to the Founders Circle!"',
      '"I\'m excited to work with you."',
      '',
      'Next steps:',
      '1. Send payment link',
      '2. Schedule onboarding call',
      '3. Add to TFC private chat group',
      '4. Introduce to engineering team'
    ],
    tips: [
      'Move fast - send payment link immediately',
      'Schedule onboarding within 48 hours',
      'Add them to Founders Circle Slack/Discord',
      'Export call notes and add to CRM'
    ]
  }
];

// Helper functions
export const getStepById = (id: string): Step | undefined => {
  return salesFlow.find(step => step.id === id);
};

export const getStepIndex = (id: string): number => {
  return salesFlow.findIndex(step => step.id === id);
};

export const isQualified = (answers: Record<string, string>): boolean => {
  // Check if they passed key qualification gates
  const demoPermission = answers['demo-permission'] === 'yes';
  const wouldImplement = answers['would-implement'] === 'yes';
  const interestedFC = answers['interested-fc'] === 'yes';
  
  return demoPermission && wouldImplement && interestedFC;
};
