// Improved Objection Handling: Acknowledge → Clarify → Reframe
// Overcomes tendency to pivot away or counter with enthusiasm

export type ObjectionCategory = 'trust' | 'timing' | 'money' | 'competition';

export interface ObjectionResponse {
  objection: string;
  category: ObjectionCategory;
  acknowledge: string;
  clarify: string[];
  reframe: string;
  reclose: string;
}

export const improvedObjectionResponses: ObjectionResponse[] = [
  // TRUST OBJECTIONS
  {
    objection: 'This is early/unproven',
    category: 'trust',
    acknowledge: '"I hear you. You\'re being asked to trust something that\'s still being hardened."',
    clarify: [
      '"Let me ask: Is the concern about the product working, or about what happens if it doesn\'t?"',
      '[Wait for answer]',
      '"What would you need to see to feel confident this removes risk instead of adding it?"'
    ],
    reframe: '"That\'s exactly why we built the Double-Win Guarantee. If you don\'t recover 50+ hours in 90 days, you get a full refund plus $500. The risk is on us, not you. Either this works and saves you thousands, or it costs you nothing."',
    reclose: '"So the question is: Do you want to test this with zero risk, or stay with the current system that\'s definitely costing you money?"'
  },
  {
    objection: 'Need to see it work first',
    category: 'trust',
    acknowledge: '"Makes sense. You want proof before committing."',
    clarify: [
      '"What specifically would you need to see to know it works?"',
      '[Wait for answer]',
      '"And if you saw that in the first 30 days, would that remove the concern?"'
    ],
    reframe: '"That\'s what the 90-day guarantee is for. You get to see it work on your actual archive, with your actual team. If it doesn\'t deliver, you get your money back plus $500. You\'re essentially getting a paid trial with downside protection."',
    reclose: '"So do you want to secure a Founders Circle seat and test it with zero risk, or pass and keep the current system?"'
  },
  {
    objection: 'What if it doesn\'t work for us?',
    category: 'trust',
    acknowledge: '"Fair question. You\'re thinking about downside risk."',
    clarify: [
      '"What does \'doesn\'t work\' mean to you - technically broken, or doesn\'t save enough time?"',
      '[Wait for answer]',
      '"And if we guarantee it saves 50+ hours in 90 days or you get a full refund plus $500, does that address it?"'
    ],
    reframe: '"The guarantee removes all risk. Worst case: You try it for 90 days, it doesn\'t deliver, and you get your money back plus $500 for your time. Best case: You recover hundreds of hours and get council seat influence. There\'s no scenario where you lose."',
    reclose: '"So the real question is: Do you want to test this with zero risk, or stick with the system that\'s definitely costing you money right now?"'
  },

  // TIMING OBJECTIONS
  {
    objection: 'Not the right time / too busy',
    category: 'timing',
    acknowledge: '"I hear you. You\'ve got a lot going on."',
    clarify: [
      '"Let me ask: Is this a \'now problem\' or a \'later problem\'?"',
      '[Wait for answer]',
      '"If it\'s a later problem, I respect that. But if it\'s a now problem that you\'re just too busy to fix, that\'s the problem compounding."'
    ],
    reframe: '"Here\'s the thing: The setup is zero-touch. We do all the work. You don\'t lift a finger. Your team starts searching on day one. The question isn\'t whether you have time to implement it - the question is whether you can afford to keep burning $X per month while you\'re too busy."',
    reclose: '"So: Is this a real \'later problem\', or is it a now problem you\'re delaying because you think it requires effort? Because if it\'s the latter, we remove that barrier entirely."'
  },
  {
    objection: 'Need to focus on other priorities',
    category: 'timing',
    acknowledge: '"Understood. You have competing priorities."',
    clarify: [
      '"What\'s the priority that\'s more important than recovering [X hours/month]?"',
      '[Wait for answer]',
      '"And does that priority require your editors to be more efficient, or less?"'
    ],
    reframe: '"This doesn\'t compete with your priorities - it enables them. Your editors get faster, your team reuses more, your output improves. The setup is zero-touch. This is the thing that makes your other priorities easier to hit."',
    reclose: '"So the question is: Do you want your team operating at current speed while you chase those priorities, or do you want them moving faster starting next week?"'
  },
  {
    objection: 'Maybe next quarter',
    category: 'timing',
    acknowledge: '"I get it. You\'re thinking about timing."',
    clarify: [
      '"Let me ask: What changes next quarter that makes this easier to do then versus now?"',
      '[Wait for answer]',
      '"And between now and then, how much does the current system cost you?"'
    ],
    reframe: '"Here\'s the math: Waiting one quarter costs you $[calculate 3 months of waste]. The Founders Circle is $5K for 12 months. You\'re spending more to wait than to fix it. And once these 10 seats fill, you lose council access and the guarantee."',
    reclose: '"So: Do you want to secure a seat now and stop the bleeding, or wait until next quarter and spend more money on the problem than the solution costs?"'
  },

  // MONEY OBJECTIONS
  {
    objection: 'Too expensive / Don\'t have budget',
    category: 'money',
    acknowledge: '"I hear you. $5K is real money."',
    clarify: [
      '"Let me ask: Is the concern that it\'s too expensive relative to the problem, or that you don\'t have $5K available right now?"',
      '[Wait for answer]',
      '"Because we agreed the problem costs you $[annual waste] per year. So this is [calculate %] of what you\'re already spending on the problem."'
    ],
    reframe: '"You\'re not spending $5K. You\'re redirecting money you\'re already burning. The current system costs you $[monthly waste] per month. TURBO costs $417/month. You\'re spending [X times] more to keep the problem than to fix it. And if it doesn\'t work, you get your money back plus $500."',
    reclose: '"So the question is: Do you want to keep spending $[monthly waste]/month on the problem, or redirect $417/month to the solution with zero risk?"'
  },
  {
    objection: 'Need to see ROI first',
    category: 'money',
    acknowledge: '"Makes sense. You want to know the return before investing."',
    clarify: [
      '"What ROI would make this a no-brainer for you?"',
      '[Wait for answer]',
      '"And we agreed you\'re burning $[annual waste] per year. If TURBO saves even 25% of that, is that enough ROI?"'
    ],
    reframe: '"The guarantee is the ROI proof. You get 90 days to measure it. If you don\'t recover at least 50 hours - which at your rate is $[calculate] - you get a full refund plus $500. You\'re getting a paid trial with downside protection. The ROI is guaranteed or you pay nothing."',
    reclose: '"So: Do you want to test the ROI with zero risk, or keep the system that definitely has negative ROI?"'
  },
  {
    objection: 'Can we start with a trial?',
    category: 'money',
    acknowledge: '"I get it. You want to test before committing."',
    clarify: [
      '"What would a successful trial look like to you?"',
      '[Wait for answer]',
      '"And if you saw that result, would you move forward?"'
    ],
    reframe: '"The Founders Circle is the trial. You get 90 days to test it on your real archive with your real team. If it doesn\'t deliver, you get your money back plus $500. The difference is: You get white-glove setup, council seat access, and 12 months of service. A free trial gives you none of that and puts you at the back of the line."',
    reclose: '"So: Do you want the full experience with zero risk and council access, or a limited trial that delays your results and loses you the founder benefits?"'
  },

  // COMPETITION OBJECTIONS
  {
    objection: 'We already organize our files / have a system',
    category: 'competition',
    acknowledge: '"Got it. You\'ve built a system that works for you."',
    clarify: [
      '"Let me ask: When you need a specific moment inside a long-form file, how long does it take to find it?"',
      '[Wait for answer]',
      '"And when a topic spikes and you need every clip on that topic across your archive, how long does that take?"'
    ],
    reframe: '"Organization and intelligence are different problems. You\'ve solved organization - files are findable. But TURBO solves intelligence - moments are findable. Your system tells you which file. TURBO tells you which second inside which file. That\'s the difference."',
    reclose: '"So the question is: Do you want to keep your file organization and add moment-finding intelligence, or stay with file-level search only?"'
  },
  {
    objection: 'We use a DAM / media management tool',
    category: 'competition',
    acknowledge: '"Makes sense. You\'ve invested in infrastructure."',
    clarify: [
      '"How long does it take your team to tag and organize new footage in the DAM?"',
      '[Wait for answer]',
      '"And when you search for something, do you get file-level results or moment-level results?"'
    ],
    reframe: '"DAMs are great for asset management. But they require tagging, which means the hunt happens during ingest instead of search. TURBO requires zero tagging - you upload and search immediately. And you get moment-level results, not file-level. You can keep your DAM for asset management and use TURBO for intelligent search."',
    reclose: '"So: Do you want to add zero-tag moment-finding on top of your DAM, or keep the current tag-dependent system?"'
  },
  {
    objection: 'We\'re building something internal',
    category: 'competition',
    acknowledge: '"Respect. You\'re solving it yourself."',
    clarify: [
      '"How long until your internal solution is live?"',
      '[Wait for answer]',
      '"And between now and then, what does the current problem cost you?"',
      '[Wait for answer]',
      '"What happens if your internal solution doesn\'t work or takes longer than expected?"'
    ],
    reframe: '"Here\'s the math: If your internal solution takes 6 months, that\'s $[calculate 6 months of waste] burned while you build. TURBO costs $5K for 12 months and goes live in days. Even if your solution works perfectly, you\'re spending more to wait than to fix it now. And if it doesn\'t work, you\'ve burned time and money with no fallback."',
    reclose: '"So: Do you want to stop the bleeding now with TURBO while you build your internal solution, or keep burning money while you hope your build works?"'
  }
];

// Helper function to get objection response by objection text
export function getObjectionResponse(objection: string): ObjectionResponse | undefined {
  return improvedObjectionResponses.find(o => 
    o.objection.toLowerCase().includes(objection.toLowerCase()) ||
    objection.toLowerCase().includes(o.objection.toLowerCase())
  );
}

// Helper function to get all objections by category
export function getObjectionsByCategory(category: ObjectionCategory): ObjectionResponse[] {
  return improvedObjectionResponses.filter(o => o.category === category);
}
