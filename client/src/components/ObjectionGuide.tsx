import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface Objection {
  id: string;
  title: string;
  acknowledge: string;
  associate: string;
  ask: string;
  bridge?: string;
  reclose: string;
}

const objections: Objection[] = [
  {
    id: 'too-expensive',
    title: '"It\'s too expensive / $5k is a lot."',
    acknowledge: 'Totally—$5k isn\'t nothing.',
    associate: 'That\'s exactly what disciplined operators say before they compare it to the time tax.',
    ask: 'Roughly how many hours per week do your editors lose searching right now?',
    bridge: 'If that math is already bigger than $5k—and it\'s guaranteed—want me to send the payment link now?',
    reclose: 'Want me to send the payment link now?'
  },
  {
    id: 'need-roi',
    title: '"I need to see ROI first."',
    acknowledge: 'Yep, you want proof it pays for itself.',
    associate: 'That\'s how our best customers buy—by tying it to hours saved.',
    ask: 'If Turbo saves 50 hours in 90 days, what\'s that worth to you in editor time alone?',
    reclose: 'If it\'s worth more than $5k, want the payment link now?'
  },
  {
    id: 'monthly-payment',
    title: '"Can you do monthly / can we do $500/mo instead?"',
    acknowledge: 'I get wanting smaller bites.',
    associate: 'Most teams ask that before they realize the guarantee makes it low-risk anyway.',
    ask: 'If it\'s fully refundable plus $500 if we don\'t hit 50 hours, what does monthly solve for you—cashflow or uncertainty?',
    reclose: 'If uncertainty is handled by the guarantee, want me to send the payment link now?'
  },
  {
    id: 'build-ourselves',
    title: '"We can build this ourselves."',
    acknowledge: 'Makes sense—you\'ve probably built internal tools before.',
    associate: 'The teams who say that usually underestimate the hidden cost: setup + tuning + support.',
    ask: 'If you built it, who owns ongoing accuracy, edge cases, and editor adoption—one person, or does it spread across the team?',
    reclose: 'If you\'d rather buy certainty + guarantee than start a new internal project, payment link now?'
  },
  {
    id: 'ai-accuracy',
    title: '"AI isn\'t accurate / it\'ll hallucinate / won\'t find the right clip."',
    acknowledge: 'You\'re worried search won\'t be trustworthy.',
    associate: 'That\'s the exact question our most operationally serious customers ask.',
    ask: 'What would "accurate enough" mean for you—finding the right moment in under 60 seconds, or something stricter?',
    bridge: 'If we can meet that bar, does anything else stop you?',
    reclose: 'Want me to send the payment link now?'
  },
  {
    id: 'messy-footage',
    title: '"Our footage is messy / unlabeled / chaotic."',
    acknowledge: 'Totally—most archives are messy.',
    associate: 'That\'s actually who benefits most, because Turbo isn\'t based on perfect folder hygiene.',
    ask: 'When it\'s messy today, what happens—editors give up, reshoot, or spend hours hunting?',
    reclose: 'If we remove that hunt time, payment link now?'
  },
  {
    id: 'integration-painful',
    title: '"Integration sounds painful (Drive/Dropbox/NAS/external drives)."',
    acknowledge: 'Yeah—integrations can be where tools die.',
    associate: 'That\'s why our setup is zero-touch: we connect, index, and calibrate it for you.',
    ask: 'Is your concern time to set up or risk it disrupts your workflow?',
    reclose: 'If we handle setup and your workflow doesn\'t change, want the payment link now?'
  },
  {
    id: 'storage-not-search',
    title: '"Our biggest problem is storage/transfer, not search."',
    acknowledge: 'Got it—moving files is a headache.',
    associate: 'A lot of teams start there, then realize the bigger cost is editors searching after the footage is already stored.',
    ask: 'Once the footage is on your drives, how long does it take to find the exact moment you need?',
    reclose: 'If we solve finding, want me to send the payment link now?'
  },
  {
    id: 'have-dam',
    title: '"We already have a DAM / Frame.io / a library."',
    acknowledge: 'Makes sense—you\'re not starting from zero.',
    associate: 'Our best customers already have systems—Turbo sits on top as intent-based archive search.',
    ask: 'Even with that tool, do editors still ask "do we have a clip of X?" and then dig for an hour?',
    reclose: 'If Turbo removes that digging, payment link now?'
  },
  {
    id: 'drive-search',
    title: '"We can just use search in Drive / file names."',
    acknowledge: 'Sure—Drive search helps when filenames are perfect.',
    associate: 'High-output teams hit the wall when they need the moment inside a file, not the filename.',
    ask: 'When you need "the exact quote" or "the shot where…", does Drive get you there—or do editors scrub timelines?',
    reclose: 'If Turbo gets you there instantly, want the payment link now?'
  },
  {
    id: 'security-concerns',
    title: '"Security / client footage / privacy concerns."',
    acknowledge: 'Totally fair—footage is sensitive.',
    associate: 'The serious teams always ask security first.',
    ask: 'What\'s your pass/fail requirement—SOC2, encryption, on-prem, client-approved handling, something else?',
    bridge: 'If we meet that requirement, does anything else block you?',
    reclose: 'Want me to send the payment link now?'
  },
  {
    id: 'no-time',
    title: '"We don\'t have time to implement."',
    acknowledge: 'You\'re slammed—adding tools is annoying.',
    associate: 'That\'s why we do zero-touch setup and no workflow change for editors.',
    ask: 'If your editors could search naturally without changing how they edit, would time still be the blocker?',
    reclose: 'If not, want the payment link now?'
  },
  {
    id: 'not-priority',
    title: '"Not a priority right now."',
    acknowledge: 'Got it—there are always bigger fires.',
    associate: 'The tricky part is the archive tax compounds every week you publish.',
    ask: 'If nothing changes, is the time lost to searching getting better, or worse each month?',
    reclose: 'If it\'s getting worse, want the payment link now?'
  },
  {
    id: 'next-quarter',
    title: '"Circle back next quarter."',
    acknowledge: 'Okay—timing matters.',
    associate: 'Most teams say that when they haven\'t quantified the weekly time loss yet.',
    ask: 'Before we punt it, can we do the quick math: hours/week/editor lost to search today?',
    reclose: 'If that math beats $5k and it\'s guaranteed, want the payment link now?'
  },
  {
    id: 'not-decision-maker',
    title: '"I\'m not the decision maker."',
    acknowledge: 'Totally—don\'t want to overstep.',
    associate: 'The fastest deals happen when we align on success criteria with the signer.',
    ask: 'What does the signer need to feel safe—ROI math, security requirements, or a demo of search quality?',
    reclose: 'Let\'s get them on a 15-minute decision call—can you intro today?'
  },
  {
    id: 'talk-to-team',
    title: '"I need to talk to my editors / team."',
    acknowledge: 'Yep—editors live the pain.',
    associate: 'When editors buy in, adoption is instant.',
    ask: 'What would your editors say is the #1 time-waster—finding b-roll, quotes, product shots, or old projects?',
    bridge: 'If we solve that for them, are you comfortable moving forward?',
    reclose: 'Payment link now?'
  },
  {
    id: 'dont-reuse',
    title: '"We don\'t reuse footage much."',
    acknowledge: 'Got it—reuse isn\'t central for you.',
    associate: 'Then the value is less "reuse" and more "stop hunting" when you do need something specific.',
    ask: 'When you need a past moment—even once a week—how long does it take to find?',
    reclose: 'If we cut that to seconds, payment link now?'
  },
  {
    id: 'just-reshoot',
    title: '"We just reshoot—easier than searching."',
    acknowledge: 'Honestly, that\'s common.',
    associate: 'Teams reshoot because search is painful, not because reshooting is cheap.',
    ask: 'If you could find the original shot in under a minute, would you still reshoot?',
    reclose: 'If not, payment link now?'
  },
  {
    id: 'is-it-storage',
    title: '"Is Turbo basically a storage solution?"',
    acknowledge: 'I see why it sounds like that.',
    associate: 'The real product is archive intelligence—finding the exact footage you already have.',
    ask: 'Where do you lose time today: storing files—or searching for the right moment?',
    reclose: 'If it\'s searching, want the payment link now?'
  },
  {
    id: 'replace-editors',
    title: '"Is Turbo going to edit for us / replace editors?"',
    acknowledge: 'No one wants a tool that threatens the team.',
    associate: 'Turbo doesn\'t replace editors—it removes the hunting so they can stay in creative flow.',
    ask: 'If we gave your editors "God-mode search", would that increase output without adding headcount?',
    reclose: 'Payment link now?'
  },
  {
    id: 'dont-believe-guarantee',
    title: '"I don\'t believe the guarantee."',
    acknowledge: 'Fair—guarantees are often marketing fluff.',
    associate: 'We use it because the outcome is measurable: hours saved in 90 days.',
    ask: 'What would you accept as proof—editor self-report, time tracking, or before/after search time samples?',
    reclose: 'If we measure it your way, want the payment link now?'
  },
  {
    id: 'want-free-pilot',
    title: '"I want a free pilot."',
    acknowledge: 'You want to test before paying.',
    associate: 'That\'s exactly why the guarantee exists—paid pilot with a refund + $500 if it fails.',
    ask: 'If it\'s refundable and we do the setup, what\'s the reason to delay?',
    reclose: 'Want me to send the payment link now?'
  },
  {
    id: 'too-small',
    title: '"We\'re too small / not sure we fit."',
    acknowledge: 'Good self-awareness—Turbo isn\'t for everyone.',
    associate: 'We only take teams where the archive tax is already real.',
    ask: 'Quick check: do you have 2+ editors, 10TB+ archive, publish weekly, and lose 1+ hour/week/editor searching?',
    reclose: 'If any "no": "Then I don\'t want to take your $5k—Turbo won\'t be worth it yet."'
  },
  {
    id: 'publish-occasionally',
    title: '"We only publish occasionally."',
    acknowledge: 'Makes sense.',
    associate: 'Turbo\'s value shows up when publishing is frequent and the archive is used constantly.',
    ask: 'When you\'re not publishing weekly, does search still cost you hours every week?',
    reclose: 'If not: disqualify cleanly.'
  },
  {
    id: 'solo-creator',
    title: '"We have 1 editor / solo creator."',
    acknowledge: 'Got it.',
    associate: 'Turbo is built for teams where search waste multiplies across editors.',
    ask: 'Do you expect to have 2+ editors and weekly output soon—or is it staying solo?',
    reclose: 'If staying solo: disqualify.'
  }
];

export default function ObjectionGuide() {
  const [selectedObjection, setSelectedObjection] = useState<string | null>(null);
  const selected = objections.find(o => o.id === selectedObjection);

  return (
    <div className="space-y-6">
      {/* 3A Loop Framework */}
      <Card className="p-6 bg-accent/10 border-accent/30">
        <h3 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
          <MessageSquare className="w-6 h-6" />
          The TURBO 3A Loop
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Use this framework for EVERY objection:
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 text-accent font-bold">
              1
            </div>
            <div>
              <p className="font-semibold text-foreground">Acknowledge</p>
              <p className="text-sm text-muted-foreground">Mirror their exact concern in their words</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 text-accent font-bold">
              2
            </div>
            <div>
              <p className="font-semibold text-foreground">Associate</p>
              <p className="text-sm text-muted-foreground">Normalize it ("our best customers ask this") or tie it to smart buyer behavior</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 text-accent font-bold">
              3
            </div>
            <div>
              <p className="font-semibold text-foreground">Ask</p>
              <p className="text-sm text-muted-foreground">A strategic question that reframes + moves you forward</p>
            </div>
          </div>
          <div className="flex items-start gap-3 pt-3 border-t border-accent/20">
            <ArrowRight className="w-5 h-5 text-accent mt-1" />
            <div>
              <p className="font-semibold text-foreground">Then: Bridge → Re-close</p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Bridge:</strong> "If we can solve that cleanly, does it make sense to move forward today?"
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Re-close:</strong> "Want me to send the payment link now?"
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-background/50 rounded-lg border border-accent/20">
          <p className="text-sm text-accent font-medium">💡 Pro tip:</p>
          <p className="text-sm text-muted-foreground">
            Make your Ask question do the isolating: "Is this mostly money, risk it won't work, timing, or authority?"
          </p>
        </div>
      </Card>

      {/* Objection List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          Common Objections ({objections.length})
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Click any objection to see the 3A script:
        </p>
        <div className="grid gap-2">
          {objections.map((objection) => (
            <button
              key={objection.id}
              onClick={() => setSelectedObjection(objection.id === selectedObjection ? null : objection.id)}
              className={`text-left p-3 rounded-lg border transition-colors ${
                selectedObjection === objection.id
                  ? 'bg-accent/20 border-accent text-accent'
                  : 'bg-background/50 border-border hover:bg-background/70 text-foreground'
              }`}
            >
              {objection.title}
            </button>
          ))}
        </div>
      </Card>

      {/* Selected Objection Script */}
      {selected && (
        <Card className="p-6 bg-primary/5 border-primary/30">
          <h3 className="text-lg font-semibold text-primary mb-4">
            {selected.title}
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-accent mb-1">1. Acknowledge:</p>
              <p className="text-foreground italic">"{selected.acknowledge}"</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-accent mb-1">2. Associate:</p>
              <p className="text-foreground italic">"{selected.associate}"</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-accent mb-1">3. Ask:</p>
              <p className="text-foreground italic">"{selected.ask}"</p>
            </div>
            {selected.bridge && (
              <div className="pt-3 border-t border-primary/20">
                <p className="text-sm font-semibold text-primary mb-1">Bridge:</p>
                <p className="text-foreground italic">"{selected.bridge}"</p>
              </div>
            )}
            <div className={selected.bridge ? '' : 'pt-3 border-t border-primary/20'}>
              <p className="text-sm font-semibold text-primary mb-1">Re-close:</p>
              <p className="text-foreground italic">"{selected.reclose}"</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
