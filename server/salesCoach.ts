import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";

const SALES_COACH_SYSTEM_PROMPT = `You are an expert sales coach specializing in the TURBO sales framework for founder-to-founder B2B sales. Your role is to analyze sales call notes in real-time and provide strategic, actionable guidance.

**TURBO Framework Overview:**
- Opening: Binary question to surface pain immediately
- Problem Install: Quantify the "Invisible Tax" with real numbers
- Qualification: Hard gates (3+ editors, frequent reuse, operational impact)
- Cost Lock: Force agreement on annual waste BEFORE discussing price
- Stop Rule: At 15 min, ask "now or later problem?" - disqualify if later
- Reframe: Position as workflow upgrade, not storage
- Solution: Demo value prop briefly, focus on their pain
- Offer: Founders Circle with Double-Win Guarantee
- Close: Calendar or no - nothing else acceptable
- Objection Handling: Diagnose root (money/trust/timing), address, re-close
- Disqualify: Exit cleanly, ask for referrals

**Your Coaching Style:**
- Direct, tactical, and founder-friendly (not corporate sales jargon)
- Focus on what to do NEXT, not theory
- Identify buying signals, red flags, and decision-maker indicators
- Push for urgency and qualification discipline
- Celebrate strong moves, warn about risks
- Keep responses under 3 sentences - concise and actionable

**Key Principles:**
1. Talk less, listen more - quantify their pain
2. Anchor on cost of inaction before discussing price
3. Control scope - don't let them wander
4. Close hard - calendar or no
5. Disqualify fast if not a fit
6. Always ask for referrals on disqualification

When analyzing notes, consider:
- Buying signals: budget mentioned, urgency, pain quantified, decision-maker confirmed
- Red flags: "need to think", "talk to team", "maybe later", price concerns before value established
- Scale indicators: team size, hours wasted, frequency of problem
- Decision-making: who decides, timeline, process
- Qualification fit: 3+ editors, frequent reuse, real operational impact

Provide guidance that helps close the deal or disqualify quickly.`;

export const salesCoachRouter = router({
  analyzePainPoints: publicProcedure
    .input(
      z.object({
        answers: z.record(z.string(), z.string()),
      })
    )
    .mutation(async ({ input }) => {
      const { answers } = input;

      // Extract problem-exposure answers (Section 2)
      const problemAnswers = Object.entries(answers)
        .filter(([key]) => key.startsWith('problem-'))
        .map(([key, value]) => ({ question: key, answer: value }));

      if (problemAnswers.length === 0) {
        return {
          rankedPains: [],
          demoOrder: [],
        };
      }

      const analysisPrompt = `You are analyzing discovery call answers to identify the customer's MOST PAINFUL problems and rank them by severity.

Customer's answers to problem-exposure questions:
${problemAnswers.map(({ question, answer }) => `Q: ${question}\nA: ${answer}`).join('\n\n')}

Analyze these answers and:
1. Identify the TOP 3 most painful problems based on:
   - Emotional language (frustration, waste, chaos)
   - Quantified impact (hours, money, frequency)
   - Urgency indicators ("always", "every day", "constantly")
   - Consequences mentioned (missed deadlines, re-shoots, delays)

2. For each pain, determine which TURBO feature best solves it:
   - Intent Search: Solves time wasted searching, finding specific moments
   - No Tagging: Solves tagging/organization burden, metadata chaos
   - Zero-Touch Setup: Solves migration/setup time, no resources for overhaul
   - Unified Archive: Solves scattered footage, multiple locations, chaos
   - Instant Retrieval: Solves hours wasted, slow manual search

Return ONLY a JSON array of the top 3 pains in order of severity (most painful first):
[
  {
    "painPoint": "exact description of their pain in their words",
    "severity": "high"|"medium"|"low",
    "feature": "intent-search"|"no-tagging"|"zero-touch"|"archive-org"|"time-savings",
    "evidence": "quote from their answer showing this pain"
  }
]

Return ONLY the JSON array, no other text.`;

      try {
        const response = await invokeLLM({
          messages: [
            { role: "system", content: "You are an expert at analyzing B2B sales discovery calls and identifying customer pain points. You understand how to rank problems by severity and map them to product features." },
            { role: "user", content: analysisPrompt },
          ],
        });

        const content = response.choices[0]?.message?.content || '[]';
        const jsonMatch = typeof content === 'string' ? content.match(/\[[\s\S]*\]/) : null;
        const rankedPains = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

        return {
          rankedPains,
          demoOrder: rankedPains.map((p: any) => p.feature),
        };
      } catch (error) {
        console.error("Failed to analyze pain points:", error);
        return {
          rankedPains: [],
          demoOrder: [],
        };
      }
    }),

  generateMirror: publicProcedure
    .input(
      z.object({
        customerAnswers: z.array(z.string()),
        currentStep: z.string(),
        answers: z.record(z.string(), z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { customerAnswers, currentStep, answers = {} } = input;

      // Build context for mirror generation
      const contextInfo = `Current step: ${currentStep}\n\nCustomer's answers during this section:\n${customerAnswers.map((a, i) => `${i + 1}. ${a}`).join('\n')}`;

      const mirrorPrompt = `You are helping a salesperson repeat back what the customer said during a discovery call. Based on the customer's answers below, generate a natural "mirror" statement that repeats back what they said in their own words.\n\n${contextInfo}\n\nGenerate a mirror statement that:\n1. Starts with "So what I'm hearing is:" or "So if I understand correctly:"\n2. Summarizes their key points using their language\n3. Ends with "Did I get that right?" or "Is that accurate?"\n\nKeep it conversational and authentic. Use bullet points if there are multiple points to repeat back.`;

      try {
        const response = await invokeLLM({
          messages: [
            { role: "system", content: "You are an expert at active listening and mirroring customer statements in B2B sales conversations. Your mirrors are natural, conversational, and use the customer's own language." },
            { role: "user", content: mirrorPrompt },
          ],
        });

        const mirrorStatement = response.choices[0]?.message?.content || "So what I'm hearing is: [summarize their key points]. Did I get that right?";

        return {
          mirrorStatement: typeof mirrorStatement === 'string' ? mirrorStatement : '',
        };
      } catch (error) {
        console.error("Failed to generate mirror:", error);
        return {
          mirrorStatement: "So what I'm hearing is: [summarize their key points from your notes]. Did I get that right?",
        };
      }
    }),

  analyzeNote: publicProcedure
    .input(
      z.object({
        note: z.string(),
        currentStep: z.string(),
        previousNotes: z.array(z.string()).optional(),
        answers: z.record(z.string(), z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { note, currentStep, previousNotes = [], answers = {} } = input;

      // Build context about the call
      let contextInfo = `Current step: ${currentStep}\n`;
      
      if (Object.keys(answers).length > 0) {
        contextInfo += `\nKey answers so far:\n`;
        Object.entries(answers).forEach(([key, value]) => {
          contextInfo += `- ${key}: ${value}\n`;
        });
      }

      if (previousNotes.length > 0) {
        contextInfo += `\nPrevious notes from this call:\n`;
        previousNotes.slice(-3).forEach((n, i) => {
          contextInfo += `${i + 1}. ${n}\n`;
        });
      }

      const userPrompt = `${contextInfo}\n\nLatest note: "${note}"\n\nProvide tactical coaching on what to do next. Focus on: buying signals, red flags, qualification fit, and immediate next action. Keep it under 3 sentences.`;

      try {
        const response = await invokeLLM({
          messages: [
            { role: "system", content: SALES_COACH_SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
        });

        const guidance = response.choices[0]?.message?.content || "Note captured. Stay focused on their pain and buying signals.";

        // Determine guidance type based on content
        let guidanceType: 'positive' | 'warning' | 'neutral' | 'action' = 'neutral';
        
        const guidanceText = typeof guidance === 'string' ? guidance : '';
        const lowerGuidance = guidanceText.toLowerCase();
        if (lowerGuidance.includes('strong') || lowerGuidance.includes('great') || lowerGuidance.includes('good sign') || lowerGuidance.includes('buying signal')) {
          guidanceType = 'positive';
        } else if (lowerGuidance.includes('warning') || lowerGuidance.includes('red flag') || lowerGuidance.includes('concern') || lowerGuidance.includes('risk')) {
          guidanceType = 'warning';
        } else if (lowerGuidance.includes('ask') || lowerGuidance.includes('quantify') || lowerGuidance.includes('push') || lowerGuidance.includes('move to')) {
          guidanceType = 'action';
        }

        return {
          guidance,
          type: guidanceType,
        };
      } catch (error) {
        console.error("Failed to get AI guidance:", error);
        return {
          guidance: "Note captured. Continue gathering information and watch for buying signals.",
          type: 'neutral' as const,
        };
      }
    }),
  
  generateObjectionResponse: publicProcedure
    .input(
      z.object({
        objection: z.string(),
      })
    )
    .output(
      z.object({
        acknowledge: z.string(),
        associate: z.string(),
        ask: z.string(),
        bridge: z.string(),
        reclose: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `You are an expert sales coach specializing in the TURBO 3A Loop objection handling framework.

**The 3A Loop Framework:**
1. **Acknowledge** - Mirror their exact concern in their words
2. **Associate** - Normalize it ("our best customers ask this") or tie it to smart buyer behavior
3. **Ask** - A strategic question that reframes + moves you forward
4. **Bridge** - "If we can solve that cleanly, does it make sense to move forward today?"
5. **Re-close** - "Want me to send the payment link now?"

**Context: TURBO Product**
- AI-powered video asset search for production teams
- $5k for 12 months (Founders Circle early adopter pricing)
- Zero-Touch setup, grandfathered pricing, direct access to founders
- Double-Win Guarantee: 50 hours saved in 90 days or full refund + $500
- Target: 3+ editors, 10TB+ archive, weekly publishing, 1+ hour/week/editor searching

Generate a 3A response that:
- Acknowledges their concern authentically
- Associates it with smart buyer behavior or normalizes it
- Asks a strategic question that isolates the objection or moves toward close
- Provides a bridge statement
- Ends with a direct re-close

Return ONLY valid JSON with these exact keys: acknowledge, associate, ask, bridge, reclose`
            },
            {
              role: "user",
              content: `Generate a 3A Loop response for this objection: "${input.objection}"`
            }
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "objection_response",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  acknowledge: { type: "string", description: "Mirror their concern" },
                  associate: { type: "string", description: "Normalize or tie to smart buyer behavior" },
                  ask: { type: "string", description: "Strategic question that reframes" },
                  bridge: { type: "string", description: "Bridge statement" },
                  reclose: { type: "string", description: "Direct re-close" }
                },
                required: ["acknowledge", "associate", "ask", "bridge", "reclose"],
                additionalProperties: false
              }
            }
          }
        });

        const content = response.choices[0]?.message?.content;
        if (!content || typeof content !== 'string') {
          throw new Error("No response from LLM");
        }

        const parsed = JSON.parse(content);
        return {
          acknowledge: parsed.acknowledge,
          associate: parsed.associate,
          ask: parsed.ask,
          bridge: parsed.bridge,
          reclose: parsed.reclose,
        };
      } catch (error) {
        console.error("Failed to generate objection response:", error);
        // Return a generic 3A response as fallback
        return {
          acknowledge: "I hear you.",
          associate: "That's exactly what our best customers ask before they see the value.",
          ask: "What would need to be true for this to make sense for you?",
          bridge: "If we can solve that cleanly, does it make sense to move forward today?",
          reclose: "Want me to send the payment link now?",
        };
      }
    }),
});
