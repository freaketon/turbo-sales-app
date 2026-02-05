// Enhanced sales flow based on Rocket Demo framework analysis
// Key improvements: Better qualification, cost lock, stop rule, hard close

export type StepType = 'opening' | 'problem' | 'qualification' | 'cost-lock' | 'stop-rule' | 'reframe' | 'solution' | 'offer' | 'close' | 'objection' | 'disqualify' | 'success';

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
  scriptLines?: string[];
  tips?: string[];
}

export const salesFlow: Step[] = [
  {
    id: 'opening',
    type: 'opening',
    title: 'Opening',
    subtitle: 'Recording Consent + Binary Question',
    content: [
      'Start with recording consent, then move to a concrete binary question.',
      'This is founder-to-founder. Direct and respectful.'
    ],
    scriptLines: [
      '"Before we get started, I just want you to know that we record this to ensure that we capture everything in the event that you move forward to work with us, so you don\'t have to repeat yourself. Is that okay with you?"',
      '',
      '[Wait for consent]',
      '',
      '"Founder to founder — quick gut check."',
      '"When an editor needs a very specific clip from a few months ago, does it show up in seconds… or does it turn into a hunt?"'
    ],
    questions: [
      {
        id: 'opening-q1',
        text: 'When an editor needs a specific clip from months ago, does it show up in seconds or turn into a hunt?',
        type: 'binary',
        options: [
          { value: 'seconds', label: 'Seconds', nextStep: 'problem' },
          { value: 'hunt', label: 'Hunt', nextStep: 'problem' }
        ]
      }
    ],
    tips: [
      'Let them answer. Do not interrupt.',
      'Their answer reveals pain level immediately.'
    ],
    nextStep: 'problem'
  },
  {
    id: 'problem',
    type: 'problem',
    title: 'Install the Invisible Tax',
    subtitle: 'Quantify the Hidden Cost',
    content: [
      'Paint the picture of what the hunt actually looks like.',
      'Attach real dollar amounts to the wasted time.',
      'Get explicit agreement on the math.'
    ],
    scriptLines: [
      '"Got it. That\'s consistent with what we see."',
      '"Most teams end up digging through folders, old timelines, Slack threads — instead of editing."',
      '[Pause]',
      '"Across teams like yours, that hunt costs 5–10 hours per editor, per week."',
      '[Pause]',
      '"At real rates — call it $75–$100 an hour — that\'s $2,000 to $4,000 per editor, per month burned on work you already paid to produce."',
      '[Pause again]',
      '"Does that math feel directionally right for you?"'
    ],
    questions: [
      {
        id: 'problem-q1',
        text: 'Does that math feel directionally right?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes', nextStep: 'qualification' },
          { value: 'no', label: 'No - dig deeper', nextStep: 'qualification' }
        ],
        guidance: 'If they say no, ask clarifying questions about their actual costs before moving forward.'
      }
    ],
    tips: [
      'Use pauses strategically. Let the numbers sink in.',
      'This is not a pitch. It\'s a diagnosis.',
      'If you\'re explaining, you\'re losing control - keep it tight'
    ],
    nextStep: 'qualification'
  },
  {
    id: 'qualification',
    type: 'qualification',
    title: 'Hard-Gate Qualification',
    subtitle: 'Disqualify Fast - Best-in-Class Questions',
    content: [
      'These questions are designed to disqualify fast and quantify the invisible tax.',
      'Use them in order. They confirm fit, scale, complexity, and ability to buy.',
      'STOP if they don\'t own/reuse, publish rarely, or it\'s single-person with tiny archive.'
    ],
    questions: [
      {
        id: 'qual-ownership',
        text: 'Who owns the footage/library you want TURBO to index?',
        type: 'multiple',
        options: [
          { value: 'you', label: 'You' },
          { value: 'client', label: 'Client', isDisqualifying: true },
          { value: 'platform', label: 'Platform', isDisqualifying: true },
          { value: 'mixed', label: 'Mixed' }
        ],
        guidance: 'Hard gate: Must own or control the footage'
      },
      {
        id: 'qual-reuse',
        text: 'Do you reuse footage across outputs today?',
        type: 'multiple',
        options: [
          { value: 'weekly', label: 'Weekly' },
          { value: 'monthly', label: 'Monthly' },
          { value: 'rarely', label: 'Rarely', isDisqualifying: true },
          { value: 'never', label: 'Never', isDisqualifying: true }
        ],
        guidance: 'If they don\'t reuse, TURBO has no value'
      },
      {
        id: 'qual-publish',
        text: 'How often do you publish?',
        type: 'multiple',
        options: [
          { value: 'daily', label: 'Daily' },
          { value: 'weekly', label: 'Weekly' },
          { value: 'monthly', label: 'Monthly' },
          { value: 'adhoc', label: 'Ad hoc', isDisqualifying: true }
        ],
        guidance: 'Publishing frequency indicates urgency'
      },
      {
        id: 'qual-editors',
        text: 'How many people touch footage each month?',
        type: 'multiple',
        options: [
          { value: '1', label: '1', isDisqualifying: true },
          { value: '2-3', label: '2-3' },
          { value: '4-8', label: '4-8' },
          { value: '9+', label: '9+' }
        ],
        guidance: 'Need 2+ editors for real value'
      },
      {
        id: 'qual-storage',
        text: 'Where does your archive live today?',
        type: 'multiple',
        options: [
          { value: 'cloud', label: 'Drive/Dropbox/Box' },
          { value: 'nas', label: 'NAS/Server' },
          { value: 'external', label: 'External drives' },
          { value: 's3', label: 'S3' },
          { value: 'mixed', label: 'Mixed/Scattered' }
        ],
        guidance: 'Scattered = more pain = better fit'
      },
      {
        id: 'qual-years',
        text: 'How many years of footage do you actively keep?',
        type: 'multiple',
        options: [
          { value: '0-1', label: '0-1 years', isDisqualifying: true },
          { value: '1-3', label: '1-3 years' },
          { value: '3-7', label: '3-7 years' },
          { value: '7+', label: '7+ years' }
        ],
        guidance: 'Scale indicator - need 1+ years minimum'
      },
      {
        id: 'qual-size',
        text: 'Rough archive size right now?',
        type: 'multiple',
        options: [
          { value: '<2tb', label: 'Less than 2TB', isDisqualifying: true },
          { value: '2-10tb', label: '2-10TB' },
          { value: '10-50tb', label: '10-50TB' },
          { value: '50tb+', label: '50TB+' }
        ],
        guidance: 'Ideal: 10TB+. Under 2TB is too small.'
      },
      {
        id: 'qual-centralized',
        text: 'Is your archive centralized or scattered?',
        type: 'multiple',
        options: [
          { value: 'one', label: 'One place' },
          { value: '2-3', label: '2-3 places' },
          { value: 'chaos', label: 'Drives chaos' }
        ],
        guidance: 'Scattered = higher pain = better fit'
      }
    ],
    tips: [
      'Disqualify immediately if: client-owned footage, never reuse, 1 editor only, or under 2TB',
      'These questions build to the cost lock in the next step',
      'Ideal buyer: 10TB+, scattered, 2+ editors, weekly reuse'
    ],
    nextStep: 'cost-lock'
  },
  {
    id: 'cost-lock',
    type: 'cost-lock',
    title: 'Cost Lock',
    subtitle: 'Force Agreement on the Math - Critical',
    content: [
      'This is the MOST IMPORTANT step. Do not skip.',
      'You must get explicit agreement on the cost of inaction BEFORE discussing price.',
      'If they don\'t agree on the math, price objections will persist.',
      'Rocket Demo rule: "Make the cost of inaction painful and undeniable."'
    ],
    scriptLines: [
      '"Let me sanity-check this with you."',
      '',
      '[Use their numbers from qualification]',
      '',
      '"If you have [X] editors × [Y] hours/week hunting × $75-100/hr × 48 weeks..."',
      '',
      '"That\'s roughly $[CALCULATE] per year burned on work you already paid for."',
      '',
      '[Pause - let it land]',
      '',
      '"Is that directionally right for your situation?"',
      '',
      '[WAIT FOR YES. Do not continue until they agree.]'
    ],
    questions: [
      {
        id: 'cost-editors',
        text: 'How many editors are actively hunting for footage?',
        type: 'number',
        placeholder: 'e.g., 2'
      },
      {
        id: 'cost-hours',
        text: 'On a typical project, how many hours are spent hunting footage?',
        type: 'multiple',
        options: [
          { value: '0-2', label: '0-2 hours', isDisqualifying: true },
          { value: '3-5', label: '3-5 hours' },
          { value: '6-10', label: '6-10 hours' },
          { value: '10+', label: '10+ hours' }
        ],
        guidance: 'Under 3 hours = not enough pain'
      },
      {
        id: 'cost-rate',
        text: 'What\'s your blended editing cost per hour?',
        type: 'number',
        placeholder: 'e.g., 75'
      },
      {
        id: 'cost-frequency',
        text: 'How often do you say: "We know it exists but can\'t find it"?',
        type: 'multiple',
        options: [
          { value: 'weekly', label: 'Weekly' },
          { value: 'monthly', label: 'Monthly' },
          { value: 'rarely', label: 'Rarely', isDisqualifying: true }
        ]
      },
      {
        id: 'cost-consequence',
        text: 'When you can\'t find it, what happens?',
        type: 'multiple',
        options: [
          { value: 'search-longer', label: 'Search longer' },
          { value: 'reshoot', label: 'Reshoot' },
          { value: 'buy-stock', label: 'Buy stock' },
          { value: 'ship-anyway', label: 'Ship anyway' }
        ]
      },
      {
        id: 'cost-agreement',
        text: 'Based on this math, is this cost directionally accurate for you?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - that\'s accurate' },
          { value: 'no', label: 'No - let me clarify', isDisqualifying: true }
        ],
        guidance: 'MUST get YES before proceeding. No agreement = no pitch.'
      }
    ],
    tips: [
      'Do the math live with them. Use their actual numbers.',
      'Quick formula: Hours hunting/month × $/hr × # editors = visible cost',
      'Add reshoots + stock purchases = true cost',
      'If they won\'t agree on the math, STOP. You cannot sell without cost lock.',
      'Rocket Demo: "Never negotiate before value is locked."'
    ],
    nextStep: 'stop-rule'
  },
  {
    id: 'stop-rule',
    type: 'stop-rule',
    title: 'Stop Rule - 15 Minute Check',
    subtitle: 'Now Problem or Later Problem?',
    content: [
      'This is your forcing function. Ask this at the 15-minute mark.',
      'If they say "later problem" - end the call politely.',
      'Rocket Demo rule: "Clear next step, scheduled, owned - or end it."'
    ],
    scriptLines: [
      '"Based on what we\'ve discussed so far..."',
      '',
      '"Does this feel like a NOW problem or a LATER problem?"',
      '',
      '[Stop talking. Wait for their answer.]'
    ],
    questions: [
      {
        id: 'stop-urgency',
        text: 'Is this a NOW problem or a LATER problem?',
        type: 'binary',
        options: [
          { value: 'now', label: 'NOW problem - we need to fix this', nextStep: 'reframe' },
          { value: 'later', label: 'LATER problem - not urgent yet', nextStep: 'disqualify', isDisqualifying: true }
        ]
      }
    ],
    tips: [
      'If "later" → disqualify immediately and end call',
      'If "now" → proceed with confidence',
      'This saves everyone time and protects your pipeline quality',
      'Acceptable endings: meeting booked, qualified intro, or clear disqualification',
      'Unacceptable: "let me think", "I\'ll talk to them", "send me something"'
    ],
    nextStep: 'reframe'
  },
  {
    id: 'reframe',
    type: 'reframe',
    title: 'Reframe the Problem',
    subtitle: 'Name the Real Issue',
    content: [
      'This is where you shift their mental model.',
      'It\'s not about organization. It\'s about intelligence.',
      'Say this verbatim.'
    ],
    scriptLines: [
      '"This isn\'t an organization problem."',
      '"It\'s an archive intelligence failure."',
      '"Editors aren\'t searching ideas. They\'re searching folders."',
      '"That\'s the Invisible Tax most teams quietly accept."'
    ],
    tips: [
      'Deliver this with calm authority',
      'You\'re diagnosing, not selling',
      'This reframe is the foundation for the solution',
      'Talk less. Anchor pain harder. Control scope.'
    ],
    nextStep: 'solution'
  },
  {
    id: 'solution',
    type: 'solution',
    title: 'The Solution',
    subtitle: 'Short and Inevitable',
    content: [
      'Now that the problem is clear, the solution is obvious.',
      'Keep this section brief. Show, don\'t tell.',
      'Phase 1: Stop the bleeding. Phase 2 comes later.'
    ],
    scriptLines: [
      '"That\'s exactly what TURBO removes."',
      '"Instead of filenames and folders, editors search meaning."',
      '',
      'Examples (say one, not all):',
      '• "Founder talking about Q3 revenue"',
      '• "Drone shot at sunset"',
      '• "Casual office B-roll"',
      '',
      '"Results come back in seconds."',
      '"No tagging. No re-organizing. No workflow changes."'
    ],
    tips: [
      'Use one example that matches their use case',
      'Emphasize zero workflow disruption',
      'This should feel inevitable, not innovative',
      'No roadmap talk. No future pricing. Just Phase 1.'
    ],
    nextStep: 'offer'
  },
  {
    id: 'offer',
    type: 'offer',
    title: 'The Offer',
    subtitle: 'Founders Circle',
    content: [
      'Based on what they\'ve shared, this is a clean fit.',
      'Present the offer with calm confidence.',
      'This is not early access. It\'s a paid partnership.'
    ],
    scriptLines: [
      '"Based on what you\'ve shared, this is a clean fit."',
      '',
      '"We\'re onboarding 10 teams only into our Founders Circle."',
      '"This is not early access. It\'s a paid partnership while we finish hardening the product."',
      '',
      'The terms:',
      '• $5,000 for 12 months',
      '• Zero-Touch / White-Glove setup (we do the work)',
      '• God-Mode Archive from day one',
      '• Council Seat — direct roadmap influence',
      '',
      'Double-Win Guarantee:',
      '"If you don\'t recover at least 50 hours in the first 90 days, we issue a full refund — and we pay you $500 for wasting your time."',
      '',
      '[Pause]',
      '',
      '"Once these 10 seats are filled, the Founders Circle closes. Future customers come in on monthly pricing without council access."'
    ],
    tips: [
      'State the terms calmly and clearly',
      'The guarantee removes all risk',
      'Scarcity is real, not manufactured',
      'Never defend the price - the cost lock did that work already'
    ],
    nextStep: 'close'
  },
  {
    id: 'close',
    type: 'close',
    title: 'The Hard Close',
    subtitle: 'Calendar or No - Nothing Else',
    content: [
      'This is the moment of truth.',
      'Do not improvise. Say this exactly.',
      'Then stop talking.',
      'Acceptable endings: Meeting booked, qualified intro, or clear disqualification.',
      'Unacceptable: "let me think", "I\'ll talk to them", "send me something"'
    ],
    scriptLines: [
      '"This either removes a real profit leak in the next 90 days — or costs you nothing."',
      '',
      '"Do you want to secure a seat, or should I give it to the next team?"',
      '',
      '[Stop talking]'
    ],
    questions: [
      {
        id: 'close-q1',
        text: 'Response?',
        type: 'multiple',
        options: [
          { value: 'yes', label: 'Yes - send link', nextStep: 'success' },
          { value: 'hesitation', label: 'Hesitation', nextStep: 'objection' },
          { value: 'no', label: 'No', nextStep: 'disqualify' }
        ]
      }
    ],
    tips: [
      'Silence is part of the close',
      'Do not fill the gap',
      'Let them make the decision',
      'Close every call with a calendar or a no - nothing else',
      'If they say "let me think" → ask "what specifically do you need to think through?"'
    ],
    nextStep: 'objection'
  },
  {
    id: 'objection',
    type: 'objection',
    title: 'Objection Handling',
    subtitle: 'Diagnose First, Answer Second',
    content: [
      'Before you respond to any objection, categorize it.',
      'There are only three real categories: trust, timing, or money.',
      'Ask this question first.',
      'Remember: If you\'re explaining, you\'re losing control.'
    ],
    scriptLines: [
      '"Before we unpack it — is the hesitation about trust, timing, or money?"'
    ],
    questions: [
      {
        id: 'objection-q1',
        text: 'What\'s the hesitation about?',
        type: 'multiple',
        options: [
          { value: 'money', label: 'Money / Price' },
          { value: 'trust', label: 'Trust / Risk' },
          { value: 'timing', label: 'Timing' }
        ]
      }
    ],
    tips: [
      'Click on each objection type below to see detailed responses',
      'After handling any objection, always re-close with the guarantee',
      'Use silence strategically - let them process the response',
      'Never negotiate before value is locked'
    ],
    nextStep: 'close'
  },
  {
    id: 'disqualify',
    type: 'disqualify',
    title: 'Disqualification',
    subtitle: 'Exit Cleanly',
    content: [
      'Not every prospect is a fit. That\'s okay.',
      'Exit with grace and leave the door open.',
      'Use this script verbatim.'
    ],
    scriptLines: [
      '"I appreciate your time. Based on what you\'ve shared, it sounds like this isn\'t a pressing issue for you right now."',
      '',
      '"That\'s totally fine — we only work with teams where the footage search problem is costing real time and money."',
      '',
      '"If things change and it becomes painful later, feel free to reach back out."',
      '',
      '"Quick question before we wrap: Do you know any other production companies or post houses with 3+ editors who are drowning in footage? Someone who\'s constantly searching through archives or dealing with re-shoots because they can\'t find the right clip?"',
      '',
      '[Wait for response]',
      '',
      'If yes: "Would you be comfortable making a quick intro via email? I\'ll keep it brief and mention you sent me their way."',
      '',
      'If no: "No worries at all. Thanks again for your time, and best of luck with your projects."'
    ],
    tips: [
      'Do not chase curious buyers',
      'Protect your time',
      'A clean exit preserves the relationship',
      'Better to disqualify fast than waste time on "maybe" deals'
    ]
  },
  {
    id: 'success',
    type: 'success',
    title: 'Payment Handoff',
    subtitle: 'Close the Deal',
    content: [
      'They said yes. Now make it easy.',
      'Send the link and set clear expectations.',
      'Payment Link: https://pay.turbobroll.com/b/dRmaEZehHahQ4aFh268IU00'
    ],
    scriptLines: [
      '"Perfect. I\'m sending you the payment link now."',
      '',
      '"Once that\'s completed:',
      '• Your access clock starts after indexing completes',
      '• Our team reaches out within 24 hours',
      '• We schedule your onboarding and connect storage"',
      '',
      '"You\'ll be searching your archive within days, not weeks."'
    ],
    tips: [
      'Send the link immediately',
      'Set clear next steps',
      'Make them feel confident in their decision',
      'This is a calendar close - schedule the onboarding call NOW'
    ]
  }
];

// Helper function to get step by ID
export function getStepById(id: string): Step | undefined {
  return salesFlow.find(step => step.id === id);
}

// Enhanced qualification scoring based on analysis
export function isQualified(answers: Record<string, string>): boolean {
  // Hard gates
  const ownership = answers['qual-ownership'];
  const reuse = answers['qual-reuse'];
  const editors = answers['qual-editors'];
  const size = answers['qual-size'];
  const years = answers['qual-years'];
  
  // Pain quantification
  const hours = answers['cost-hours'];
  const frequency = answers['cost-frequency'];
  const costAgreement = answers['cost-agreement'];
  
  // Urgency
  const urgency = answers['stop-urgency'];
  
  // Scoring rule: Must hit all 3
  // 1. Scale: 10TB+ or 3+ years footage
  const hasScale = size === '10-50tb' || size === '50tb+' || years === '3-7' || years === '7+';
  
  // 2. Complexity: 2+ editors
  const hasComplexity = editors === '2-3' || editors === '4-8' || editors === '9+';
  
  // 3. Pain: 6+ hours/week hunting or recurring issues
  const hasPain = (hours === '6-10' || hours === '10+') && frequency === 'weekly';
  
  // Plus: Cost lock agreement + NOW urgency
  const hasCostLock = costAgreement === 'yes';
  const hasUrgency = urgency === 'now';
  
  return hasScale && hasComplexity && hasPain && hasCostLock && hasUrgency;
}

// Calculate annual cost for display
export function calculateAnnualCost(
  editors: number,
  hoursPerWeek: number,
  ratePerHour: number
): number {
  return editors * hoursPerWeek * ratePerHour * 48; // 48 working weeks
}
