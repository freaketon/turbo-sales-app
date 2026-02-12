// Second Discovery Path - For "solved chaos but not speed" scenarios
// When they have NAS/naming conventions but still have moment-finding pain

import { Step } from './salesFlow';

export const momentFindingDiscoveryStep: Step = {
  id: 'moment-finding-discovery',
  type: 'problem',
  title: 'Moment-Finding Discovery',
  subtitle: 'Alternative Path: Solved Chaos, Not Speed',
  content: [
    'They have organization (NAS, naming conventions) but still have pain.',
    'The pain is not chaos - it\'s moment-finding inside long-form content.',
    'Use these questions to surface the hidden time tax.'
  ],
  scriptLines: [
    '"Sounds like you\'ve solved the chaos problem with your NAS setup."',
    '',
    '"Let me ask about a different scenario..."',
    '',
    '"When a topic spikes - say, a news event or trending subject - and you need every historical clip on that topic..."',
    '',
    '"How long does it take to find all those moments across your archive?"',
    '',
    '[Wait for answer]',
    '',
    '"And when you do find the right file, how much time do editors spend scrubbing inside that long-form content to find the specific moment they need?"',
    '',
    '[Wait for answer]',
    '',
    '"How often does someone on your team ask \'where is that moment?\' per week?"',
    '',
    '[Wait for answer]',
    '',
    '"And how many times do they just give up and don\'t reuse it because it\'s too annoying to find?"'
  ],
  questions: [
    {
      id: 'moment-topic-search',
      text: 'When a topic spikes and you need every historical clip on that topic, how long does it take?',
      type: 'multiple',
      options: [
        { value: 'minutes', label: 'Minutes', isDisqualifying: true },
        { value: '30-60min', label: '30-60 minutes' },
        { value: 'hours', label: 'Hours' },
        { value: 'half-day', label: 'Half day or more' }
      ],
      guidance: 'If minutes: They don\'t have this pain. Disqualify on this path.'
    },
    {
      id: 'moment-scrub-time',
      text: 'How much time do editors spend scrubbing inside long-form content to find specific moments?',
      type: 'multiple',
      options: [
        { value: '5-15min', label: '5-15 minutes per search' },
        { value: '15-30min', label: '15-30 minutes per search' },
        { value: '30min+', label: '30+ minutes per search' },
        { value: 'rarely', label: 'Rarely happens', isDisqualifying: true }
      ]
    },
    {
      id: 'moment-frequency',
      text: 'How often does someone ask "where is that moment?" per week?',
      type: 'multiple',
      options: [
        { value: 'daily', label: 'Daily (5+ times/week)' },
        { value: 'few-times', label: 'Few times per week' },
        { value: 'weekly', label: 'Once a week' },
        { value: 'rarely', label: 'Rarely', isDisqualifying: true }
      ],
      guidance: 'Frequency indicates pain level'
    },
    {
      id: 'moment-give-up',
      text: 'How often do they give up and not reuse because it\'s too annoying to find?',
      type: 'multiple',
      options: [
        { value: 'often', label: 'Often - happens regularly' },
        { value: 'sometimes', label: 'Sometimes' },
        { value: 'rarely', label: 'Rarely' },
        { value: 'never', label: 'Never', isDisqualifying: true }
      ],
      guidance: 'Giving up = lost value = strong pain signal'
    },
    {
      id: 'moment-examples',
      text: 'Capture specific examples they mentioned:',
      type: 'text',
      placeholder: 'e.g., "Last week we needed all clips mentioning sustainability..."'
    }
  ],
  tips: [
    'This path is for teams with good organization but moment-finding pain',
    'Key insight: Organization ≠ Intelligence',
    'They can find files but not moments inside files',
    'If they don\'t have this pain, disqualify gracefully'
  ],
  nextStep: 'moment-cost-lock'
};

export const momentCostLockStep: Step = {
  id: 'moment-cost-lock',
  type: 'cost-lock',
  title: 'Moment-Finding Cost Lock',
  subtitle: 'Quantify the Scrubbing Tax',
  content: [
    'Now lock in the cost of moment-finding.',
    'Use their numbers from the discovery questions.',
    'This is different from the chaos tax - it\'s the scrubbing tax.'
  ],
  scriptLines: [
    '"Let me reflect this back to you."',
    '',
    '"You said editors spend [X minutes] scrubbing through content [Y times per week]."',
    '',
    '"That\'s [calculate: X * Y] minutes per week per editor just on moment-finding."',
    '',
    '"Across [Z] editors, that\'s [calculate total hours] hours per week."',
    '',
    '"At $75-100/hour, that\'s roughly $[calculate annual] per year burned on scrubbing."',
    '',
    '[Pause - let it land]',
    '',
    '"And that doesn\'t count the moments you just give up on and never reuse."',
    '',
    '[Pause again]',
    '',
    '"Does that math feel directionally right?"',
    '',
    '[WAIT FOR YES]'
  ],
  questions: [
    {
      id: 'moment-cost-agreement',
      text: 'Do they agree on the scrubbing tax math?',
      type: 'binary',
      options: [
        { value: 'yes', label: 'Yes - that\'s accurate' },
        { value: 'no', label: 'No - needs adjustment' }
      ],
      guidance: 'Do not move forward without agreement'
    }
  ],
  tips: [
    'This is a different value prop than chaos-solving',
    'Emphasize: "You solved organization. We solve intelligence."',
    'The cost is hidden because they think organization = solved',
    'Get explicit agreement before moving to solution'
  ],
  nextStep: 'reframe'
};
