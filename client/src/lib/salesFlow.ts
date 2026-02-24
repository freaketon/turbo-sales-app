// OUTLIER Discovery Call Script - 12 Sections (20 Minutes)
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
      '"Hey [Name], appreciate you making time. We\'re early on this — still in beta. I\'m not here to pitch you anything today. I want to understand how you currently find content ideas and where the frustration is, so we build the right thing. I\'ll ask some questions, and if there\'s time I can show you a rough prototype. Cool?"',
      '',
      '[Wait for their agreement before proceeding]'
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
    subtitle: 'Discovery Questions - Do NOT mention OUTLIER (8-10 minutes)',
    duration: '8-10 min',
    content: [
      'Ask open-ended questions to understand their pain.',
      'Do NOT mention OUTLIER or any solution yet.',
      'Let them talk. Take notes in the chat.',
      'After all questions, mirror back what you heard.'
    ],
    scriptLines: [
      'Ask these questions:',
      '',
      '1. "How do you currently figure out what content to post next week?"',
      '2. "How much time do you spend scrolling competitors or discovery pages each week?"',
      '3. "What percentage of that time actually leads to a usable idea?"',
      '4. "When you spot a trend and post on it — how often does it feel too late?"',
      '5. "What does it feel like when a competitor posts something that blows up and you missed it?"',
      '6. "What\'s the hardest part about knowing what to post consistently?"',
      '7. "Have you ever posted something you were confident in that completely flopped? What happened?"',
      '8. "What tools are you using now to figure out what\'s working in your niche?"',
      '',
      '[Let them talk. Capture their answers in the chat.]',
      '',
      'Then mirror back:',
      '"So what I\'m hearing is: you\'re spending roughly [X hours] a week manually scrolling, you feel like you\'re always one step behind, and by the time you spot something it\'s already saturated. Did I get that right?"',
      '',
      '[Pause]'
    ],
    questions: [
      {
        id: 'problem-1',
        text: 'How do you currently figure out what content to post next week?',
        type: 'text',
        placeholder: 'Type their answer here...',
        guidance: 'Capture their exact words in the chat'
      },
      {
        id: 'problem-2',
        text: 'How much time do you spend scrolling competitors or discovery pages each week?',
        type: 'text',
        placeholder: 'e.g., "5-10 hours per week"'
      },
      {
        id: 'problem-3',
        text: 'What percentage of that time actually leads to a usable idea?',
        type: 'text',
        placeholder: 'e.g., "Maybe 20%"'
      },
      {
        id: 'problem-4',
        text: 'When you spot a trend and post on it — how often does it feel too late?',
        type: 'text',
        placeholder: 'Type their answer here...'
      },
      {
        id: 'problem-5',
        text: 'What does it feel like when a competitor posts something that blows up and you missed it?',
        type: 'text',
        placeholder: 'Type their answer here...'
      },
      {
        id: 'problem-6',
        text: 'What\'s the hardest part about knowing what to post consistently?',
        type: 'text',
        placeholder: 'Type their answer here...'
      },
      {
        id: 'problem-7',
        text: 'Have you ever posted something you were confident in that completely flopped? What happened?',
        type: 'text',
        placeholder: 'Type their answer here...'
      },
      {
        id: 'problem-8',
        text: 'What tools are you using now to figure out what\'s working in your niche?',
        type: 'text',
        placeholder: 'e.g., "Later, Sprout, Social Blade"'
      }
    ],
    tips: [
      'Do NOT mention OUTLIER yet',
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
      '"What have you tried to solve this?"',
      '',
      '[Let them answer]',
      '',
      '"Tools like Later, Sprout, Social Blade — have any of those helped?"',
      '',
      '[Let them answer]',
      '',
      '"Why hasn\'t that fully solved it?"',
      '',
      '[Let them answer]',
      '',
      '"How much time or money have you put into trying to crack this?"',
      '',
      '[Let them answer]',
      '',
      'Mirror:',
      '"So you\'ve tried [A, B, C], but you\'re still spending [X hours/week] guessing. Fair?"'
    ],
    questions: [
      {
        id: 'tried-1',
        text: 'What have you tried to solve this?',
        type: 'text',
        placeholder: 'e.g., "Later, Sprout Social, Social Blade, manual scrolling"'
      },
      {
        id: 'tried-2',
        text: 'Tools like Later, Sprout, Social Blade — have any of those helped?',
        type: 'text',
        placeholder: 'Type their answer...'
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
      '"If you could wave a magic wand — what would the perfect content intelligence tool look like?"',
      '',
      '[Let them answer]',
      '',
      '"What would it tell you, and when?"',
      '',
      '[Let them answer]',
      '',
      '"What would that unlock for your posting schedule or your results?"',
      '',
      '[Let them answer]',
      '',
      '"What would that mean for your business or your clients?"',
      '',
      '[Let them answer]',
      '',
      'Summarize:',
      '"So ideally you\'d wake up, know exactly what\'s breaking out in your niche right now, and have a clear idea ready to film. Accurate?"'
    ],
    questions: [
      {
        id: 'magic-wand',
        text: 'If you could wave a magic wand, what would the perfect solution look like?',
        type: 'text',
        placeholder: 'Capture their ideal solution...'
      },
      {
        id: 'what-solve',
        text: 'What would it tell you, and when?',
        type: 'text',
        placeholder: 'Type their answer...'
      },
      {
        id: 'what-unlock',
        text: 'What would that unlock for your posting schedule or your results?',
        type: 'text',
        placeholder: 'Type their answer...'
      },
      {
        id: 'financial-impact',
        text: 'What would that mean for your business or your clients?',
        type: 'text',
        placeholder: 'e.g., "More followers, more leads, faster growth"'
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
      '"Hypothetically — if something eliminated the guesswork and the manual scrolling completely, what would that be worth to you per month?"',
      '',
      '[Let them answer]',
      '',
      'Then:',
      '"And at what price would it feel unreasonable, even if it worked perfectly?"',
      '',
      '[Let them answer]',
      '',
      'Now you have their internal anchor.'
    ],
    questions: [
      {
        id: 'reasonable-price',
        text: 'If something eliminated the guesswork and the manual scrolling completely, what would that be worth to you per month?',
        type: 'text',
        placeholder: 'e.g., "$200-$500 per month"'
      },
      {
        id: 'unreasonable-price',
        text: 'At what price would this be so expensive, there\'s no way you\'d buy it even if it was the perfect solution?',
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
      '"If you have a few more minutes, I can show you an early prototype of OUTLIER. It\'s rough — still beta. But I\'d love your reaction. Up for it?"',
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
      '🖥️ Open OUTLIER Demo → https://app.outliervid.io/setup',
      '',
      'Feature 1 — Outlier Feed',
      '"You mentioned you feel like you\'re always a step behind."',
      '"OUTLIER flags Reels outperforming their account baseline by 5–50x within the first 6 hours — before they hit the discovery page."',
      '',
      'Validation:',
      '"Would this work for you?"',
      '"Could you see yourself using this?"',
      '',
      'Objection surfacing:',
      '"What wouldn\'t work about this?"',
      '',
      'Handle objection with ACR pattern',
      '',
      '---',
      '',
      'Feature 2 — Why It\'s Working Breakdown',
      '"You said you don\'t just want to see what went viral — you want to know why."',
      '"OUTLIER breaks down the hook, audio, format, and topic angle of every flagged Reel."',
      '',
      'Validation:',
      '"Would that help you understand what to replicate?"',
      '',
      '---',
      '',
      'Feature 3 — Content Brief Generator',
      '"You mentioned the hardest part is knowing what to post."',
      '"Based on what\'s breaking out in your niche right now, OUTLIER generates 3 ready-to-shoot briefs."',
      '"You go from zero ideas to 3 evidence-backed ones in under 60 seconds."',
      '',
      'Validation:',
      '"Would this save you research time?"',
      '',
      '---',
      '',
      'Feature 4 — Trend Lifecycle Score',
      '"You said by the time you spot something it\'s already dead."',
      '"OUTLIER scores every trend — emerging, peaking, or saturated — so you know if you\'re early or too late."',
      '',
      'Validation:',
      '"Would this help you time your posts better?"'
    ],
    questions: [
      {
        id: 'feature-1-validation',
        text: 'Feature 1 (Outlier Feed) - Would this work for them?',
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
        placeholder: 'e.g., "Worried about niche coverage", "Too many false positives"',
        optional: true
      },
      {
        id: 'feature-1-handled',
        text: 'Did you handle the objection successfully?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - resolved' },
          { value: 'no', label: 'No - still concerned' }
        ],
        optional: true
      },
      {
        id: 'feature-2-validation',
        text: 'Feature 2 (Why It\'s Working Breakdown) - Would this help them understand what to replicate?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - they see value' },
          { value: 'no', label: 'Not convinced' }
        ]
      },
      {
        id: 'feature-3-validation',
        text: 'Feature 3 (Content Brief Generator) - Would this save them research time?',
        type: 'binary',
        options: [
          { value: 'yes', label: 'Yes - they see value' },
          { value: 'no', label: 'Not convinced' }
        ]
      },
      {
        id: 'feature-4-validation',
        text: 'Feature 4 (Trend Lifecycle Score) - Would this help them time posts better?',
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
        optional: true,
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

  // SECTION 8 — IMPACT MEASUREMENT (Product Agitation)
  {
    id: 'impact-measurement',
    type: 'impact-measurement',
    title: 'Section 8: Impact Measurement',
    subtitle: 'Calculate the real cost of guessing — product agitation',
    content: [
      'Do the math with them in real-time to show what guesswork is costing them.',
      'Three buckets: time wasted on trend research, money burned on failed content, and the growth they\'re missing.',
      'This is product agitation — make the cost of inaction painful.'
    ],
    scriptLines: [
      '"Let\'s put some numbers to this."',
      '',
      '"How many hours a week do you spend scrolling, searching for trends, figuring out what to post?"',
      '',
      '[Let them answer — capture the number]',
      '',
      '"And out of all the videos you produce in a month, how many would you say just… don\'t work? Missed shots, wrong timing, flopped content?"',
      '',
      '[Let them answer]',
      '',
      '"What does it cost you to produce one of those videos? Including your time, editing, maybe a videographer?"',
      '',
      '[Let them answer]',
      '',
      '"And what\'s your growth goal? Where do you want to be in terms of followers per month?"',
      '',
      '[Let them answer]',
      '',
      '[The calculator will show the total annual waste]',
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
        id: 'missed-shots',
        text: 'Out of all the videos you produce each month, how many just don\'t work? (missed timing, flopped)',
        type: 'number',
        placeholder: 'e.g., 5'
      },
      {
        id: 'cost-per-video',
        text: 'What does it cost to produce one video? (your time, editing, production)',
        type: 'number',
        placeholder: 'e.g., 200'
      },
      {
        id: 'monthly-follower-goal',
        text: 'What\'s your monthly follower growth goal?',
        type: 'number',
        placeholder: 'e.g., 5000'
      }
    ],
    tips: [
      'Do this calculation OUT LOUD with them — let them see the waste',
      'The production waste (failed videos) is the most emotional number',
      'Frame it as: "This is money you already spent that produced zero return"',
      'The missed growth opportunity is the agitation kicker — their competitors ARE growing',
      'If annual waste is under $15k, they might not be a fit for $5k/year'
    ],
    nextStep: 'recap'
  },

  // SECTION 9 — RECAP
  {
    id: 'recap',
    type: 'recap',
    title: 'Section 9: Recap',
    subtitle: 'The Ultimate Mirror - Everything They Said',
    content: [
      'This is the BIGGEST mirror of the entire call.',
      'The AI will auto-generate a comprehensive recap of ALL the pain points, problems, and statements they shared.',
      'Read it back to them word-for-word, then pause and wait for confirmation.'
    ],
    scriptLines: [],
    // NO questions - this section auto-populates from all previous mirrors
    questions: [],
    tips: [
      'This is your trial close - if they don\'t agree here, don\'t move forward',
      'Use their exact words from the auto-generated recap',
      'The pause after "Did I get all that right?" is critical',
      'This section summarizes EVERYTHING from Problem Exposure, Alternative Solutions, and Dream Outcome'
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
      '"If OUTLIER were available today, would you want to use it?"',
      '',
      '[Wait for answer]',
      '',
      'If yes → move forward to the offer.',
      'If hesitation → isolate and handle the objection before any price mention.'
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
    subtitle: 'The Outliers Founding Partners Program',
    content: [
      'This is a 3-part structure: Bridge → Permission → Offer',
      'Lower your tone - this is intimate and exclusive.',
      'Read the offer bullets VERBATIM - don\'t paraphrase.'
    ],
    scriptLines: [
      '━━━ PART 1: BRIDGE ━━━',
      '',
      '"[Name], this has been incredibly helpful. You clearly understand the content game, and you\'re exactly the kind of person we want shaping OUTLIER while we build it."',
      '',
      '━━━ PART 2: PERMISSION ━━━',
      '',
      '"Before you go — if you\'ve got two more minutes, would you be open to hearing about something exclusive we\'re doing for a very small group of founders?"',
      '',
      '[Wait for their YES]',
      '',
      '━━━ PART 3: THE OFFER (Read these bullets verbatim, lower your tone) ━━━',
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
      '[Full stop. Do not speak.]'
    ],
    questions: [
      {
        id: 'interested-fc',
        text: 'Are they interested in The Outliers program?',
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
      '',
      '"Great. To get you in I just need four things — your niche, your Instagram handle, how many Reels you post per week, and five competitor accounts you\'re watching. Want to do that now or should I send you a quick form?"',
      '',
      '[Wait for answer]',
      '',
      'If price objection:',
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
  // Check if they passed key qualification gates
  const demoPermission = answers['demo-permission'] === 'yes';
  const wouldImplement = answers['would-implement'] === 'yes';
  const interestedFC = answers['interested-fc'] === 'yes';
  
  return demoPermission && wouldImplement && interestedFC;
};
