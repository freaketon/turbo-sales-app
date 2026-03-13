// OUTLIER Discovery Call Script - 5 Sections (15 Minutes)
// Optimized for closing: Quick discovery → Demo while energy is high → Calculator agitation → Close

export type StepType =
  | 'frame-call'
  | 'discovery'
  | 'demo'
  | 'impact-calculator'
  | 'recap-and-close'
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
      '"Hey [Name], appreciate you making time. We\'re early on this — still in beta. I\'m not here to pitch you anything today. I want to understand how you currently find content ideas and where the frustration is, so we build the right thing. I\'ll ask some questions, and if there\'s time I can show you a rough prototype. Cool?"',
      '',
      '[Wait for their agreement before proceeding]'
    ],
    tips: [
      'Keep it casual and founder-to-founder',
      'The pause after "Cool?" is critical - wait for their yes',
      'You\'re asking permission, not pitching yet'
    ],
    nextStep: 'discovery'
  },

  // SECTION 2 — DISCOVERY (4 min)
  // Merged: Problem Exposure + Alternative Solutions + Dream Outcome
  // Every question serves the close
  {
    id: 'discovery',
    type: 'discovery',
    title: 'Section 2: Discovery',
    subtitle: 'Uncover pain, failed attempts, and their ideal state (4 minutes)',
    duration: '4 min',
    content: [
      'Four questions that each serve the close.',
      'Do NOT mention OUTLIER yet — let them describe their pain.',
      'Their answer to Q4 becomes your bridge to the demo.'
    ],
    scriptLines: [
      'Ask these 4 questions — let them talk after each one:',
      '',
      '1. "How do you currently figure out what content to post next week?"',
      '   → Exposes the chaos. Sets up the Outlier Feed demo.',
      '',
      '2. "How much time per week does that take, and what percentage actually leads to something usable?"',
      '   → Gets the number for the calculator AND makes them feel the waste.',
      '',
      '3. "What have you tried to fix this, and why didn\'t it work?"',
      '   → Kills competitors before you even demo. If they say "nothing" they\'re not a buyer.',
      '',
      '4. "If you could wave a magic wand, what would the perfect solution look like?"',
      '   → Their answer becomes your demo script.',
      '',
      'Bridge to demo:',
      '"Funny you say that — let me show you something."'
    ],
    questions: [
      {
        id: 'problem-1',
        text: 'How do you currently figure out what content to post next week?',
        type: 'text',
        placeholder: 'Type their answer here...',
        guidance: 'Capture their exact words — this exposes the chaos'
      },
      {
        id: 'problem-2',
        text: 'How much time per week does that take, and what percentage actually leads to something usable?',
        type: 'text',
        placeholder: 'e.g., "5-10 hours, maybe 20% works"'
      },
      {
        id: 'tried-and-failed',
        text: 'What have you tried to fix this, and why didn\'t it work?',
        type: 'text',
        placeholder: 'e.g., "Later, Sprout Social — but they don\'t show what\'s trending"'
      },
      {
        id: 'magic-wand',
        text: 'If you could wave a magic wand, what would the perfect solution look like?',
        type: 'text',
        placeholder: 'Their answer becomes your demo script...',
        guidance: 'Bridge: "Funny you say that — let me show you something."'
      }
    ],
    tips: [
      'Do NOT mention OUTLIER yet',
      'Let them talk — resist the urge to jump in',
      'Q3: if they say "nothing" they may not be a serious buyer',
      'Q4 is your bridge: "Funny you say that — let me show you something."'
    ],
    nextStep: 'demo'
  },

  // SECTION 3 — DEMO (4 min)
  // Moved earlier — show value while energy is HIGH
  // Permission gate + AI-prioritized features + 2 validation questions
  {
    id: 'demo',
    type: 'demo',
    title: 'Section 3: Demo',
    subtitle: 'Show value while energy is high (4 minutes)',
    duration: '4 min',
    content: [
      'Show features that directly address their pain.',
      'The AI will prioritize which features to show based on their answers.',
      'Don\'t log every objection — just demo and validate.'
    ],
    scriptLines: [
      '"Let me show you something we\'re building — it\'s rough, still beta, but I\'d love your reaction."',
      '',
      '🖥️ Open OUTLIER Demo → https://app.outliervid.io/setup',
      '',
      'Feature 1 — Outlier Feed',
      '"You mentioned [their pain]. OUTLIER flags Reels outperforming their account baseline by 5–50x within the first 6 hours — before they hit the discovery page."',
      '',
      'Feature 2 — Why It\'s Working Breakdown',
      '"OUTLIER breaks down the hook, audio, format, and topic angle of every flagged Reel."',
      '',
      'Feature 3 — Content Brief Generator',
      '"Based on what\'s breaking out in your niche right now, OUTLIER generates 3 ready-to-shoot briefs in under 60 seconds."',
      '',
      'Feature 4 — Trend Lifecycle Score',
      '"OUTLIER scores every trend — emerging, peaking, or saturated — so you know if you\'re early or too late."',
      '',
      'After showing features, ask:',
      '"Which of those would make the biggest difference for you?"',
      '"Any concerns so far?"'
    ],
    questions: [
      {
        id: 'demo-permission',
        text: 'Did they agree to see the demo?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - show demo' },
          { value: 'no', label: 'No - not interested', nextStep: 'disqualify', isDisqualifying: true }
        ]
      },
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
      'Lower expectations: "It\'s rough, still beta"',
      'Only show features that address THEIR pain from Q1-Q4',
      'Use their exact words when connecting pain to features',
      'If they\'re not excited after 2-3 features, they may not be qualified'
    ],
    nextStep: 'impact-calculator'
  },

  // SECTION 4 — IMPACT CALCULATOR (2 min)
  // Now they WANT the numbers to be big — the demo created desire
  // Calculator is your price anchor (not a hypothetical question)
  {
    id: 'impact-calculator',
    type: 'impact-calculator',
    title: 'Section 4: The Invisible Tax',
    subtitle: 'Make the cost of inaction painful (2 minutes)',
    duration: '2 min',
    content: [
      'Now that they\'ve seen the product and want it, quantify what guesswork is costing them.',
      'The calculator is your price anchor — when it shows $28k/year in waste, $5k feels like nothing.',
      'Get agreement on the math before moving to the close.'
    ],
    scriptLines: [
      '"Let\'s put some numbers to what we talked about."',
      '',
      '"How many hours a week do you spend scrolling, searching for trends, figuring out what to post?"',
      '[Capture number]',
      '',
      '"What does it cost to produce one video that doesn\'t work? Including your time, editing, production?"',
      '[Capture number]',
      '',
      '[Calculator shows total annual waste]',
      '',
      '"So you\'re spending roughly $[X]/year on research that leads nowhere and videos that flop. Does that math sound directionally right to you?"',
      '',
      '[WAIT for agreement. No agreement = no pitch.]'
    ],
    questions: [
      {
        id: 'hours-searching',
        text: 'How many hours per week do you spend searching for trends and figuring out what to post?',
        type: 'number',
        placeholder: 'e.g., 8'
      },
      {
        id: 'cost-per-video',
        text: 'What does it cost to produce one video that doesn\'t work? (your time, editing, production)',
        type: 'number',
        placeholder: 'e.g., 200'
      }
    ],
    tips: [
      'They just saw the demo — they WANT the numbers to be big (justifies buying)',
      'The calculator is more powerful than asking "what would you pay?"',
      'Frame it as: "This is money you already spent that produced zero return"',
      'If annual waste is under $15k, they might not be a fit for $5k/year',
      'Get agreement on the math: "Does that sound directionally right?"'
    ],
    nextStep: 'recap-and-close'
  },

  // SECTION 5 — RECAP + OFFER + CLOSE (4 min)
  // One fluid motion: mirror everything → bridge → offer → silence
  {
    id: 'recap-and-close',
    type: 'recap-and-close',
    title: 'Section 5: Recap & Close',
    subtitle: 'Mirror, bridge, offer, silence (4 minutes)',
    duration: '4 min',
    content: [
      'This is ONE fluid motion — don\'t break it into pieces.',
      '1. Read the AI-generated recap of everything they said.',
      '2. Bridge: "You\'re exactly the kind of person we want shaping OUTLIER."',
      '3. Present the Founders Circle offer — read bullets verbatim.',
      '4. Silence. Do not speak after the price.'
    ],
    scriptLines: [
      '━━━ STEP 1: THE RECAP (Trial Close) ━━━',
      '',
      '[Read the AI-generated recap below word-for-word]',
      '"Did I get all that right?"',
      '[Wait for yes — if they don\'t agree, don\'t move forward]',
      '',
      '━━━ STEP 2: BRIDGE ━━━',
      '',
      '"[Name], this has been incredibly helpful. You clearly understand the content game, and you\'re exactly the kind of person we want shaping OUTLIER while we build it."',
      '',
      '"Would you be open to hearing about something exclusive we\'re doing for a very small group of founders?"',
      '[Wait for YES]',
      '',
      '━━━ STEP 3: THE OFFER (Read verbatim, lower your tone) ━━━',
      '',
      '"We\'re launching something called The Outliers. Ten founding partners. That\'s it. Here\'s what it means if you\'re in:"',
      '',
      '• "We do a full white-glove setup — configure your niches, tune your thresholds, deliver your first Outlier Feed within 48 hours. Zero work on your end."',
      '',
      '• "You get the full OUTLIER platform — real-time Outlier Feed, pattern breakdowns, and 3 shoot-ready content briefs every week, tailored to your niche."',
      '',
      '• "Direct access to me and the engineering team in a private Slack. Your feature requests go to the top of the list."',
      '',
      '• "A private community of 10 teams — sharing what\'s working, swapping playbooks, collaborating on formats."',
      '',
      '• "Your pricing is locked forever. Future customers pay more. Yours never changes as long as you stay active."',
      '',
      '• "Early access to every new OUTLIER feature before general release."',
      '',
      '• "And we back it with a 90-day guarantee — if we don\'t deliver at least 20 niche outliers per week and 3 shoot-ready briefs per week within 90 days, you get a full refund plus $500."',
      '',
      '"The investment is $5,000 for 12 months. Ten spots. When they\'re gone, they\'re gone."',
      '',
      '[Full stop. Do not speak.]',
      '',
      '━━━ STEP 4: HANDLE RESPONSE ━━━',
      '',
      'If YES:',
      '"Great. To get you in I just need four things — your niche, your Instagram handle, how many Reels you post per week, and five competitor accounts you\'re watching. Want to do that now or should I send you a quick form?"',
      '',
      'If PRICE OBJECTION:',
      '"You\'re already losing more than $5K in wasted research time and missed trends. This redirects that bleed — and you\'re guaranteed results or your money back plus $500."',
      '[Stop. Wait.]'
    ],
    questions: [
      {
        id: 'would-implement',
        text: 'After the recap — if this were available today, would they want it?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - they want it' },
          { value: 'hesitation', label: 'Hesitation/objection' }
        ]
      },
      {
        id: 'hesitation-reason',
        text: 'If hesitation: What\'s their concern?',
        type: 'text',
        placeholder: 'Capture the objection...',
        optional: true
      },
      {
        id: 'interested-fc',
        text: 'Are they interested in The Outliers program?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - interested' },
          { value: 'no', label: 'No - not interested', nextStep: 'disqualify', isDisqualifying: true }
        ]
      },
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
      'This is ONE fluid motion — recap → bridge → offer → silence',
      'The silence after "$5,000 for 12 months" is your close — DO NOT break it',
      'If price objection, return to the calculator math',
      '"You\'re already losing more than $5k. This just redirects the bleed."',
      'If they say yes, move fast — get payment or calendar invite before call ends',
      'If they need to "think about it", you missed something earlier'
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
    title: 'Deal Closed!',
    subtitle: 'Capture prospect details for your records',
    content: [
      'Congratulations! You closed an Outliers founding partner.',
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
  const demoPermission = answers['demo-permission'] === 'yes';
  const interestedFC = answers['interested-fc'] === 'yes';

  return demoPermission && interestedFC;
};
