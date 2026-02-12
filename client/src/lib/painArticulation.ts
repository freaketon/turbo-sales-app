// Pain Articulation Checkpoint - Discipline the Discovery Sequence
// Prospect must state pain in their own words and quantify it before any demo/pitch

import { Step } from './salesFlow';

export const painArticulationStep: Step = {
  id: 'pain-articulation',
  type: 'problem',
  title: 'Pain Articulation Checkpoint',
  subtitle: 'They Must Say It - Not You',
  content: [
    'CRITICAL: Before showing anything, prospect must articulate pain in their own words.',
    'If they can\'t state the problem clearly, don\'t pitch - ask better questions or disqualify.',
    'This is the discipline that separates strong closers from feature-dumpers.'
  ],
  scriptLines: [
    '"Before I show you anything..."',
    '',
    '"In your own words: What\'s the specific pain you\'re trying to solve?"',
    '',
    '[WAIT. Do not fill the silence.]',
    '',
    'Listen for:',
    '• Specific scenarios ("When we need X...")',
    '• Time quantification ("Editors spend Y hours...")',
    '• Frequency ("This happens Z times per week...")',
    '• Business impact ("We can\'t reuse...", "We have to reshoot...")',
    '',
    'If vague, dig deeper:',
    '"Can you walk me through the last time that happened?"',
    '"How much time did that cost you?"',
    '"How often does that happen?"'
  ],
  questions: [
    {
      id: 'pain-articulation-q1',
      text: 'Did they clearly articulate the pain in their own words?',
      type: 'binary',
      options: [
        { value: 'yes', label: 'Yes - clear pain stated', nextStep: 'pain-quantification' },
        { value: 'no', label: 'No - vague or unclear', nextStep: 'pain-articulation' }
      ],
      guidance: 'If no: Ask follow-up questions. Do not move forward until pain is clear.'
    },
    {
      id: 'pain-notes',
      text: 'Capture their exact words describing the pain:',
      type: 'text',
      placeholder: 'e.g., "We waste hours every week searching through old projects..."'
    }
  ],
  tips: [
    'This is a gate. Do not skip it.',
    'If they can\'t articulate pain, they won\'t buy.',
    'Your job: Ask questions until they say it themselves.',
    'Never pitch before this step is complete.'
  ],
  nextStep: 'pain-quantification'
};

export const painQuantificationStep: Step = {
  id: 'pain-quantification',
  type: 'problem',
  title: 'Pain Quantification',
  subtitle: 'They Must Give You Numbers',
  content: [
    'Now that they\'ve stated the pain, get them to quantify it.',
    'Use their words. Reflect back what they said.',
    'Get specific numbers: hours, frequency, team size, cost.'
  ],
  scriptLines: [
    '[Reflect their pain back]',
    '',
    '"So you said [their words]. Let\'s put some numbers on that."',
    '',
    '"How many hours per week does your team spend on this?"',
    '',
    '[Wait for answer]',
    '',
    '"How many people does this affect?"',
    '',
    '[Wait for answer]',
    '',
    '"How often does this happen - daily, weekly?"',
    '',
    '[Wait for answer]',
    '',
    '"What does that cost you - in time, money, or missed opportunities?"'
  ],
  questions: [
    {
      id: 'pain-hours',
      text: 'Hours per week spent on this problem:',
      type: 'number',
      placeholder: 'e.g., 10'
    },
    {
      id: 'pain-people',
      text: 'Number of people affected:',
      type: 'number',
      placeholder: 'e.g., 3'
    },
    {
      id: 'pain-frequency',
      text: 'How often does this happen?',
      type: 'multiple',
      options: [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'rarely', label: 'Rarely', isDisqualifying: true }
      ]
    },
    {
      id: 'pain-cost',
      text: 'What does this cost them? (their words)',
      type: 'text',
      placeholder: 'e.g., "We miss deadlines", "We have to reshoot", "Editors are frustrated"'
    }
  ],
  tips: [
    'Use their language, not yours',
    'Get specific numbers - vague answers = weak close',
    'This builds the foundation for cost lock',
    'If they can\'t quantify, dig deeper or disqualify'
  ],
  nextStep: 'qualification'
};
