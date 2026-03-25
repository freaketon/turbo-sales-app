// TURBO Discovery Call Script - 11 Sections (~15 Minutes)
// Flow: Frame → Problem Exposure → Dream Outcome → Price Anchor → Transition → Demo → ROI → Recap → Availability → Offer → Close

export type StepType =
  | 'frame-call'
  | 'problem-exposure'
  | 'dream-outcome'
  | 'price-anchor'
  | 'transition-to-demo'
  | 'demo'
  | 'roi'
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
  optional?: boolean;
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
  // SECTION 1 — FRAME THE CALL (1 min)
  {
    id: 'frame-call',
    type: 'frame-call',
    title: 'Section 1: Frame the Call',
    subtitle: 'Set expectations and get agreement (1 minute)',
    duration: '1 min',
    content: [
      'Start by framing what today\'s call is about.',
      'Get their agreement before diving in.',
      'This sets the tone for a consultative conversation, not a pitch.'
    ],
    scriptLines: [
      '"Hey [Name], appreciate you making time. We\'re early — still in beta. I\'m not here to pitch you anything today. I want to understand how you find content ideas and where the frustration is, so we build the right thing. I\'ll ask a few questions, and if there\'s time I can show you a rough prototype. Cool?"',
      '',
      '[Wait for yes before moving]'
    ],
    tips: [
      'Keep it casual and founder-to-founder',
      'The pause after "Cool?" is critical — wait for their yes',
      'You\'re asking permission, not pitching yet'
    ],
    nextStep: 'problem-exposure'
  },

  // SECTION 2 — PROBLEM EXPOSURE (3–4 min)
  {
    id: 'problem-exposure',
    type: 'problem-exposure',
    title: 'Section 2: Problem Exposure',
    subtitle: 'Uncover pain, failed attempts, and emotional cost (3–4 minutes)',
    duration: '3–4 min',
    content: [
      'Do NOT mention TURBO. Capture their exact words.',
      'These questions expose chaos, waste, failed solutions, and emotional pain.',
      'Mirror back everything at the end to lock in agreement.'
    ],
    scriptLines: [
      'Ask these 4 questions — let them talk after each one:',
      '',
      '1. "How do you currently figure out what to post next week?"',
      '',
      '2. "How much time does that take, and what percentage actually leads to something usable?"',
      '',
      '3. "What have you tried to fix this — and why didn\'t it work?"',
      '',
      '4. "What does it feel like when a competitor posts something that blows up and you missed it?"',
      '',
      '━━━ MIRROR BACK ━━━',
      '',
      '"So what I\'m hearing is: you\'re spending roughly [X hours] a week, you\'ve tried [A, B, C], and you still feel like you\'re always one step behind. Did I get that right?"'
    ],
    questions: [
      {
        id: 'problem-1',
        text: 'How do you currently figure out what to post next week?',
        type: 'text',
        placeholder: 'Type their answer here...',
        guidance: 'Capture their exact words — this exposes the chaos'
      },
      {
        id: 'problem-2',
        text: 'How much time does that take, and what percentage actually leads to something usable?',
        type: 'text',
        placeholder: 'e.g., "5-10 hours, maybe 20% works"'
      },
      {
        id: 'tried-and-failed',
        text: 'What have you tried to fix this — and why didn\'t it work?',
        type: 'text',
        placeholder: 'e.g., "Later, Sprout Social — but they don\'t show what\'s trending"'
      },
      {
        id: 'competitor-pain',
        text: 'What does it feel like when a competitor posts something that blows up and you missed it?',
        type: 'text',
        placeholder: 'Capture the emotional response...',
        guidance: 'This is the emotional hook — let them feel it'
      }
    ],
    tips: [
      'Do NOT mention TURBO yet',
      'Let them talk — resist the urge to jump in',
      'Q3: if they say "nothing" they may not be a serious buyer',
      'Q4 is emotional — let the silence do the work',
      'Mirror back at the end: "So what I\'m hearing is..."'
    ],
    nextStep: 'dream-outcome'
  },

  // SECTION 3 — DREAM OUTCOME (1 min)
  {
    id: 'dream-outcome',
    type: 'dream-outcome',
    title: 'Section 3: Dream Outcome',
    subtitle: 'Let them describe their ideal state (1 minute)',
    duration: '1 min',
    content: [
      'Let them paint the picture of what perfect looks like.',
      'Their answer becomes your demo script.',
      'Summarize and confirm before moving on.'
    ],
    scriptLines: [
      '1. "If you could wave a magic wand — what would the perfect solution look like?"',
      '',
      '2. "What would that unlock for your business?"',
      '',
      '━━━ SUMMARIZE ━━━',
      '',
      '"So ideally you\'d wake up, know exactly what\'s breaking out in your niche right now, and have a clear idea ready to film. Accurate?"'
    ],
    questions: [
      {
        id: 'magic-wand',
        text: 'If you could wave a magic wand — what would the perfect solution look like?',
        type: 'text',
        placeholder: 'Their answer becomes your demo script...',
        guidance: 'Their words here become your bridge to the demo'
      },
      {
        id: 'what-would-unlock',
        text: 'What would that unlock for your business?',
        type: 'text',
        placeholder: 'e.g., "More time to create, less guessing, faster growth"'
      }
    ],
    tips: [
      'Let them dream big — don\'t interrupt',
      'Their answer to Q1 becomes your demo script',
      'Q2 connects the solution to business impact',
      'Summarize back to confirm alignment'
    ],
    nextStep: 'price-anchor'
  },

  // SECTION 4 — PRICE ANCHOR (1 min — BEFORE the demo)
  {
    id: 'price-anchor',
    type: 'price-anchor',
    title: 'Section 4: Price Anchor',
    subtitle: 'Set the value frame BEFORE showing the product (1 minute)',
    duration: '1 min',
    content: [
      'This is what made $5K a steal for Christina.',
      'Do NOT skip this. Anchoring before the demo makes the close effortless.',
      'Get their number — it becomes your reference point later.'
    ],
    scriptLines: [
      '1. "Hypothetically — if something eliminated the guesswork completely, what would that be worth to you per month?"',
      '',
      '[Capture their number]',
      '',
      '2. "At what price would it feel unreasonable, even if it worked perfectly?"',
      '',
      '[Capture their ceiling]',
      '',
      'Do NOT skip this. This is what made $5K a steal for Christina.'
    ],
    questions: [
      {
        id: 'hypothetical-value',
        text: 'Hypothetically — if something eliminated the guesswork completely, what would that be worth to you per month?',
        type: 'text',
        placeholder: 'e.g., "$500/mo", "$1,000/mo"',
        guidance: 'Their number becomes your reference point at the close'
      },
      {
        id: 'unreasonable-price',
        text: 'At what price would it feel unreasonable, even if it worked perfectly?',
        type: 'text',
        placeholder: 'e.g., "$2,000/mo"',
        guidance: 'This sets the ceiling — $5K/year will feel like a steal'
      }
    ],
    tips: [
      'Do NOT skip this section — it makes the close work',
      'Their "worth" answer becomes your price justification later',
      'If they say "$100/mo" they may not be your buyer',
      'If they say "$500+" you\'re in great shape for the $5K close'
    ],
    nextStep: 'transition-to-demo'
  },

  // SECTION 5 — TRANSITION TO DEMO (30 sec)
  {
    id: 'transition-to-demo',
    type: 'transition-to-demo',
    title: 'Section 5: Transition to Demo',
    subtitle: 'Get permission to show the prototype (30 seconds)',
    duration: '30 sec',
    content: [
      'Simple permission gate.',
      'No = disqualify. Yes = proceed to demo.'
    ],
    scriptLines: [
      '"If you have a few more minutes, I can show you an early prototype of TURBO. Still rough — but I\'d love your reaction. Up for it?"',
      '',
      '[Wait for yes]'
    ],
    questions: [
      {
        id: 'demo-permission',
        text: 'Did they agree to see the demo?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes — show demo' },
          { value: 'no', label: 'No — not interested', nextStep: 'disqualify', isDisqualifying: true }
        ]
      }
    ],
    tips: [
      'Lower expectations: "Still rough"',
      'If they say no, they\'re not a buyer — disqualify gracefully',
      'Their "yes" here means they\'re engaged'
    ],
    nextStep: 'demo'
  },

  // SECTION 6 — DEMO (3–4 min, 3 features max)
  {
    id: 'demo',
    type: 'demo',
    title: 'Section 6: Demo',
    subtitle: 'Only show features that match their pain (3–4 minutes)',
    duration: '3–4 min',
    content: [
      'Only show features that match their pain.',
      'For each: connect to their words → show it → validate.',
      'Max 3 features. Don\'t overload them.'
    ],
    scriptLines: [
      'For each feature: connect to their words → show it → "Would this work for you?" → "What wouldn\'t work?"',
      '',
      '┌─────────────────────────┬────────────────────────────────────┐',
      '│ Feature                 │ Use when they said...              │',
      '├─────────────────────────┼────────────────────────────────────┤',
      '│ Outlier Feed            │ "I\'m always a step behind"         │',
      '│ Why It\'s Working        │ "I don\'t know why things go viral" │',
      '│ Content Brief Generator │ "I don\'t know what to post"        │',
      '│ Trend Lifecycle Score   │ "By the time I see it, it\'s late"  │',
      '└─────────────────────────┴────────────────────────────────────┘',
      '',
      'After each feature:',
      '"Would this work for you?"',
      '"What wouldn\'t work?"'
    ],
    questions: [
      {
        id: 'biggest-impact-feature',
        text: 'Which feature would make the biggest difference for them?',
        type: 'text',
        placeholder: 'e.g., "Outlier Feed — they\'re tired of being late to trends"'
      },
      {
        id: 'demo-concerns',
        text: 'Any concerns raised during demo?',
        type: 'text',
        placeholder: 'e.g., "Worried about niche coverage" or "None — they loved it"',
        optional: true
      }
    ],
    tips: [
      'Only show features that address THEIR pain from Section 2',
      'Use their exact words when connecting pain to features',
      'Max 3 features — don\'t overload',
      'If they\'re not excited after 2 features, they may not be qualified',
      '"Would this work for you?" gets micro-commitments'
    ],
    nextStep: 'roi'
  },

  // SECTION 7 — ROI (1 min)
  {
    id: 'roi',
    type: 'roi',
    title: 'Section 7: ROI',
    subtitle: 'Quantify the value in their terms (1 minute)',
    duration: '1 min',
    content: [
      'Make the math real. Hours saved × rate × 52 = annual time recovered.',
      'Then ask about viral Reel value — let it sit.'
    ],
    scriptLines: [
      '"If TURBO worked as described — how many hours a week would it realistically save you?"',
      '',
      '[Capture number]',
      '',
      'Calculate live: Hours/week × rate × 52 = annual time recovered.',
      '',
      '"And what\'s one viral Reel worth to your business?"',
      '',
      '[Let it sit.]'
    ],
    questions: [
      {
        id: 'hours-saved',
        text: 'How many hours a week would TURBO realistically save them?',
        type: 'number',
        placeholder: 'e.g., 8'
      },
      {
        id: 'hourly-rate',
        text: 'What\'s their effective hourly rate? (for calculation)',
        type: 'number',
        placeholder: 'e.g., 75'
      },
      {
        id: 'viral-reel-value',
        text: 'What\'s one viral Reel worth to their business?',
        type: 'text',
        placeholder: 'e.g., "$5,000 in new clients", "10K new followers"'
      }
    ],
    tips: [
      'Calculate live: Hours × rate × 52 = annual savings',
      'The viral Reel question is emotional — let it sit',
      'Don\'t rush past this — the math justifies the price'
    ],
    nextStep: 'recap'
  },

  // SECTION 8 — RECAP (1 min)
  {
    id: 'recap',
    type: 'recap',
    title: 'Section 8: Recap',
    subtitle: 'Read back everything they said (1 minute)',
    duration: '1 min',
    content: [
      'Compile everything: pain, failed tools, dream outcome, ROI number.',
      'Read it back word-for-word.',
      'Do NOT move forward until they confirm.'
    ],
    scriptLines: [
      '[Read the AI-generated recap below — compile their pain, failed tools, dream outcome, and ROI number]',
      '',
      '"Did I get all that right?"',
      '',
      '[Do NOT move forward until they confirm.]'
    ],
    tips: [
      'Use their exact words — not your paraphrasing',
      'This is a trial close — their "yes" means they agree with the problem',
      'If they correct something, update and re-confirm',
      'No confirmation = no pitch'
    ],
    nextStep: 'availability-check'
  },

  // SECTION 9 — AVAILABILITY CHECK (30 sec)
  {
    id: 'availability-check',
    type: 'availability-check',
    title: 'Section 9: Availability Check',
    subtitle: 'Trial close before the offer (30 seconds)',
    duration: '30 sec',
    content: [
      'Simple yes/no gate.',
      'Yes → present the offer.',
      'Hesitation → isolate the objection before mentioning price.',
      'Can\'t resolve → disqualify.'
    ],
    scriptLines: [
      '"If TURBO were available today — would you want to use it?"',
      '',
      'Yes → move to the offer.',
      'Hesitation → isolate the objection before mentioning price.',
      'Can\'t resolve → disqualify.'
    ],
    questions: [
      {
        id: 'would-implement',
        text: 'If TURBO were available today — would they want to use it?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes — they want it' },
          { value: 'hesitation', label: 'Hesitation/objection' }
        ]
      },
      {
        id: 'hesitation-reason',
        text: 'If hesitation: What\'s their concern?',
        type: 'text',
        placeholder: 'Capture the objection — resolve before moving to price...',
        optional: true
      }
    ],
    tips: [
      'This is a trial close — not the real close',
      'If they hesitate, isolate the objection BEFORE mentioning price',
      'If you can\'t resolve the hesitation, disqualify gracefully',
      '"Yes" here means they\'re ready for the offer'
    ],
    nextStep: 'the-offer'
  },

  // SECTION 10 — THE OFFER (2 min)
  {
    id: 'the-offer',
    type: 'the-offer',
    title: 'Section 10: The Offer',
    subtitle: 'Bridge, permission, and present The Turbo Founders (2 minutes)',
    duration: '2 min',
    content: [
      'Bridge → Permission → Offer → Silence.',
      'Read the offer bullets verbatim. Lower your tone.',
      'After the price: STOP. Do not speak.'
    ],
    scriptLines: [
      '━━━ BRIDGE ━━━',
      '',
      '"[Name], this has been incredibly helpful. You clearly understand the content game, and you\'re exactly the kind of person we want shaping TURBO while we build it."',
      '',
      '━━━ PERMISSION ━━━',
      '',
      '"Before you go — if you\'ve got two more minutes, would you be open to hearing about something exclusive we\'re doing for a very small group of founders?"',
      '',
      '[Wait for YES]',
      '',
      '━━━ THE OFFER (lower your tone, read deliberately) ━━━',
      '',
      '"We\'re launching something called The Turbo Founders. Ten founding partners. That\'s it. Here\'s what it means if you\'re in:"',
      '',
      '• "Full white-glove setup — niches configured, first feed delivered within 48 hours. Zero work on your end."',
      '',
      '• "Full TURBO platform — real-time feed, pattern breakdowns, 3 shoot-ready briefs every week."',
      '',
      '• "Direct access to me and the engineering team in a private Slack. Your requests go to the top of the list."',
      '',
      '• "Private community of 10 teams sharing what\'s working."',
      '',
      '• "Pricing locked forever."',
      '',
      '• "Early access to every new feature."',
      '',
      '• "90-day guarantee — 20 niche outliers/week + 3 briefs/week or full refund plus $500."',
      '',
      '"The investment is $5,000 for 12 months. Ten spots. When they\'re gone, they\'re gone."',
      '',
      '[Stop. Do not speak.]'
    ],
    questions: [
      {
        id: 'interested-fc',
        text: 'Are they interested in The Turbo Founders program?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes — interested' },
          { value: 'no', label: 'No — not interested', nextStep: 'disqualify', isDisqualifying: true }
        ]
      }
    ],
    tips: [
      'The silence after "$5,000 for 12 months" is your close — DO NOT break it',
      'Read the bullets verbatim — don\'t paraphrase',
      'Lower your tone when presenting the offer',
      'If they ask questions, answer briefly and return to silence'
    ],
    nextStep: 'close'
  },

  // SECTION 11 — CLOSE
  {
    id: 'close',
    type: 'close',
    title: 'Section 11: Close',
    subtitle: 'Handle their response and secure next steps',
    duration: '1–2 min',
    content: [
      'Handle their response decisively.',
      'If yes — move fast, get details before the call ends.',
      'If price objection — return to the math.'
    ],
    scriptLines: [
      '━━━ IF YES ━━━',
      '',
      '"Great. Four things — your niche, your Instagram handle, how many Reels you post per week, and five competitor accounts you\'re watching. Want to do that now or should I send a quick form?"',
      '',
      '━━━ IF PRICE OBJECTION ━━━',
      '',
      '"You\'re already losing more than $5K in wasted research time and missed trends. This redirects that bleed — and you\'re guaranteed results or your money back plus $500."',
      '',
      '[Stop. Wait.]'
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
          { value: 'no', label: 'Not moving forward', nextStep: 'disqualify', isDisqualifying: true }
        ]
      },
      {
        id: 'next-steps',
        text: 'What are the next steps?',
        type: 'text',
        placeholder: 'e.g., "Send payment link", "Schedule onboarding call for Friday"',
        optional: true
      }
    ],
    tips: [
      'If they say yes, move fast — get payment or calendar invite before call ends',
      'If price objection, return to the calculator math and their own price anchor',
      'If they need to "think about it", you missed something earlier',
      '"You said $[X]/mo would be worth it — this is less than that."'
    ],
    nextStep: 'success'
  },

  // DISQUALIFY
  {
    id: 'disqualify',
    type: 'disqualify',
    title: 'Not Qualified',
    subtitle: 'Thank them for their time — always ask for referrals',
    content: [
      'Not every prospect is a fit.',
      'Thank them genuinely for their feedback.',
      'Keep the door open. Always ask for referrals.'
    ],
    scriptLines: [
      '"Thanks — you\'ve been genuinely helpful. I don\'t think TURBO is the right fit right now, but I really appreciate your time. If anything changes, reach out anytime."',
      '',
      '━━━ ALWAYS ASK FOR REFERRALS ━━━',
      '',
      '"One last thing — do you know anyone else in the content space who might be dealing with this problem? I\'d love an intro if so."'
    ],
    tips: [
      'Don\'t burn bridges',
      'They might refer someone else — always ask',
      'Capture why they were disqualified in your notes',
      'A referral from a "no" is still a win'
    ]
  },

  // SUCCESS
  {
    id: 'success',
    type: 'success',
    title: 'Deal Closed!',
    subtitle: 'Capture prospect details for your records',
    content: [
      'Congratulations! You closed a Turbo Founders founding partner.',
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
      '"Welcome to the Turbo Founders!"',
      '"I\'m excited to work with you."',
      '',
      'Next steps:',
      '1. Send payment link',
      '2. Schedule onboarding call',
      '3. Add to Turbo Founders private chat group',
      '4. Introduce to engineering team'
    ],
    tips: [
      'Move fast — send payment link immediately',
      'Schedule onboarding within 48 hours',
      'Add them to Turbo Founders Slack/Discord',
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
  const demoPermission = answers['demo-permission'] === 'yes';
  const interestedFC = answers['interested-fc'] === 'yes';

  return demoPermission && interestedFC;
};
