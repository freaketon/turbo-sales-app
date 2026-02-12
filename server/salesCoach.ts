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
});
