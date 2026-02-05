// Sales call flow data structure based on TURBO sales materials

export type StepType = 'opening' | 'problem' | 'qualification' | 'urgency' | 'reframe' | 'solution' | 'offer' | 'close' | 'objection' | 'disqualify' | 'success';

export type QuestionType = 'binary' | 'multiple' | 'text';

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
    subtitle: 'Binary Question - Set the Frame',
    content: [
      'Start with a concrete, binary question that immediately surfaces the pain.',
      'This is founder-to-founder. Direct and respectful.'
    ],
    scriptLines: [
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
      'This is not a pitch. It\'s a diagnosis.'
    ],
    nextStep: 'qualification'
  },
  {
    id: 'qualification',
    type: 'qualification',
    title: 'Qualification',
    subtitle: 'Hard Gates Only',
    content: [
      'These are non-negotiable filters.',
      'You\'re looking for: scale, pain intensity, and operational impact.'
    ],
    questions: [
      {
        id: 'qual-q1',
        text: 'How many people touch footage in a typical month?',
        type: 'multiple',
        options: [
          { value: '1', label: '1 editor' },
          { value: '2-3', label: '2-3 editors' },
          { value: '4+', label: '4+ editors' }
        ],
        guidance: 'Editor leverage: More editors = more value from TURBO'
      },
      {
        id: 'qual-q2',
        text: 'When someone needs a specific moment, how long does it usually take?',
        type: 'multiple',
        options: [
          { value: '<5min', label: 'Less than 5 minutes' },
          { value: '10-30min', label: '10-30 minutes' },
          { value: '30-60+min', label: '30-60+ minutes' }
        ],
        guidance: 'Search cost: Longer searches = higher pain'
      },
      {
        id: 'qual-q3',
        text: 'Has this ever slowed delivery, reuse, or forced re-shoots?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ],
        guidance: 'Operational impact: Real business consequences'
      }
    ],
    tips: [
      'These questions reveal fit.',
      'Strong fit: 2+ editors, 5+ hrs/week lost, video is revenue-critical, pain acknowledged'
    ],
    nextStep: 'urgency'
  },
  {
    id: 'urgency',
    type: 'urgency',
    title: 'Urgency Gate',
    subtitle: 'Critical Decision Point',
    content: [
      'This is the most important question in the entire call.',
      'It separates real buyers from curious browsers.',
      'If they say "nice but not urgent" — you disqualify immediately.'
    ],
    scriptLines: [
      '"If this saved your team 40–60 hours over the next quarter, would that matter financially — or would it be nice but not urgent?"'
    ],
    questions: [
      {
        id: 'urgency-q1',
        text: 'If this saved your team 40-60 hours over the next quarter, would that matter financially — or be "nice but not urgent"?',
        type: 'binary',
        options: [
          { value: 'matters', label: 'Matters financially', nextStep: 'reframe' },
          { value: 'nice', label: 'Nice but not urgent', nextStep: 'disqualify', isDisqualifying: true }
        ]
      }
    ],
    tips: [
      'Do not pitch if they say "nice but not urgent"',
      'Go directly to disqualification script',
      'This protects your time and theirs'
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
      'This reframe is the foundation for the solution'
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
      'Keep this section brief. Show, don\'t tell.'
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
      'This should feel inevitable, not innovative'
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
      'Scarcity is real, not manufactured'
    ],
    nextStep: 'close'
  },
  {
    id: 'close',
    type: 'close',
    title: 'The Close',
    subtitle: 'Binary Choice',
    content: [
      'This is the moment of truth.',
      'Do not improvise. Say this exactly.',
      'Then stop talking.'
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
      'Let them make the decision'
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
      'Ask this question first.'
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
      'MONEY: Walk back to editor math + guarantee. "$5k isn\'t the cost. It\'s the cap on how much this can fail."',
      'TRUST: Remind them it\'s founder-led, white-glove, refundable. "If it doesn\'t work in your environment, you don\'t pay."',
      'TIMING: Cost of delay + scarcity. "The Invisible Tax doesn\'t pause. Every month you wait is another few thousand burned."',
      '',
      'Then re-close:',
      '"Given the guarantee, this either works or it doesn\'t — but waiting keeps the tax running."',
      '"Do you want me to send the link, or should I release the seat?"'
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
      '"Totally fair — this only makes sense when the footage hunt is already expensive."',
      '',
      '"I\'ll mark this as not now."',
      '',
      '"If it becomes painful later, reach back out."',
      '',
      'Optional (only if they offer):',
      '"If someone comes to mind with multiple editors and archive chaos, happy to talk — no pressure."'
    ],
    tips: [
      'Do not chase curious buyers',
      'Protect your time',
      'A clean exit preserves the relationship'
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
      'Make them feel confident in their decision'
    ]
  }
];

// Helper function to get step by ID
export function getStepById(id: string): Step | undefined {
  return salesFlow.find(step => step.id === id);
}

// Helper function to determine if prospect is qualified
export function isQualified(answers: Record<string, string>): boolean {
  const editorCount = answers['qual-q1'];
  const searchTime = answers['qual-q2'];
  const operationalImpact = answers['qual-q3'];
  const urgency = answers['urgency-q1'];
  
  const hasScale = editorCount === '2-3' || editorCount === '4+';
  const hasHighPain = searchTime === '10-30min' || searchTime === '30-60+min';
  const hasImpact = operationalImpact === 'yes';
  const isUrgent = urgency === 'matters';
  
  return hasScale && hasHighPain && hasImpact && isUrgent;
}
