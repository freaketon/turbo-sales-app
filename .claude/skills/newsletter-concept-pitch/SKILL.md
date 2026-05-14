---
name: newsletter-concept-pitch
description: Interview a Martell Ventures portfolio founder and generate concept-stage newsletter pitches for the media team to review. Output is a ~250-word structured outline (not a full draft) that Joel Harrison can greenlight or reject in 60 seconds. Use when a portfolio founder needs to share a story for Dan's newsletter, when packaging a portfolio story for Joel, or when Marcel asks to draft newsletter concept(s) for a portfolio company. Triggers on phrases like "newsletter concept", "newsletter pitch for Joel", "story concept for the media team", "pitch a newsletter story", "portfolio newsletter outline", "draft a concept for Dan's newsletter", or "MV newsletter pitch".
---

# Newsletter Concept Pitch

Generate concept-stage newsletter pitches for the Martell Ventures media team. Output is an outline Joel Harrison can scan in 60 seconds and greenlight or reject. Once approved, full drafts are written separately using Joel's full Newsletter Writing Playbook (different workflow).

## When to trigger

- A portfolio founder is sharing a story they want pitched to Dan's newsletter
- Marcel is packaging 2-3 newsletter concepts to send to Joel
- Anyone in the portfolio is told to "send a few story ideas" to the media team

Do NOT trigger for: full newsletter drafts, internal MV communications, social posts, or content for Dan's other channels (LinkedIn, X, IG). This skill only produces concept-stage pitches for the email newsletter.

## Master principle

**The principle is the subject of the newsletter, not the company.**

The newsletter teaches one of Dan's frameworks, illustrated by a real founder/customer story. The portfolio company shows up as the natural way to operationalize that principle — not as the article's subject. This is the "embedded" pattern Joel agreed to during the April 24 call. It doesn't burn the limited promo slots his newsletter has. If a concept reads like a product feature article, Joel will reject it.

Every other rule below is instrumental to this principle.

## Four constraints that override everything

1. **Concept ≠ draft.** Target ~400 words per concept. Enough that Joel can feel what the newsletter would land like, but well short of a finished draft (the Playbook calls for 300-500 word stories alone in published newsletters). If it drifts past 500, cut.
2. **One story, one problem, one teach.** Joel's Playbook is strict on this. Even if the story illustrates four lessons, pick ONE umbrella teach. The other lessons fold under it as bullets, OR they become separate concepts.
3. **Show, don't tell.** Concrete scenes beat abstract states. "Six discovery calls stacked on Tuesday morning" beats "his sales process was inefficient." Pull this directly from the founder's specifics — never generate generic detail to fill space.
4. **Placeholder specifics get flagged.** If a concept includes a number, name, or detail that wasn't in the founder's input (e.g., "60% to 90%", "$2k", "by 2pm"), mark these as `[placeholder — confirm with founder]` inline OR in a note at the end of the concept. The draft stage cannot proceed until placeholders are replaced with real numbers.

## Workflow

### Step 1: Interview the founder

Send the founder this question set in a single message. Asking all questions at once lets them think through the full arc as one piece, which produces tighter answers than walking them through one question at a time.

> To package a strong newsletter concept, I need a few details. Answer with as much specificity as you can — concrete numbers, timeframes, named moments, and dialogue are what make the story work. If you don't have a sharp answer for one, skip it.
>
> 1. **The principle.** What single Dan framework, methodology, or principle does this story illustrate? One sentence. (e.g., "Dan's Sell By Chat methodology" or "Dan's offer design philosophy.")
>
> 2. **The protagonist and the stuck state.** Who is the protagonist (you, a customer, or you about a customer)? What was the painful, stuck, or frustrating situation BEFORE the change? Specifics matter — time period, numbers, what they had already tried that didn't work.
>
> 3. **The turn.** What was the moment, conversation, or decision that changed things? If Dan was directly involved (advice, framework, pushback), include the dialogue or context. Concrete moments only — not abstractions.
>
> 4. **The payoff.** What changed as a result? Specifics again — numbers, timelines, behavior shifts, quantifiable outcomes where possible.
>
> 5. **The product fit.** In one or two sentences, how does your product operationalize this principle for a wider audience? This is the natural mention, not a sales pitch.
>
> 6. **Dive deeper resource (optional).** Is there a Dan YouTube long-form, IG reel, podcast clip, or other piece of content that goes deeper on this principle? Drop the URL.
>
> 7. **Other concepts?** Do you have other story/principle combinations to pitch? I can generate 2-3 in one pass.

If the founder's answers are too thin to write a credible story (no specifics, no concrete moment, vague "we improved X by some amount"), push back and ask for the specific detail BEFORE generating. A weak input produces a weak concept that wastes Joel's time. Common follow-up prompts:

- "What was the exact number before vs. after?"
- "What did Dan actually say in that conversation?"
- "What had the customer already tried before this worked?"
- "How long did the change take to show up?"

### Step 2: Generate the concept(s) in this exact format

Each concept must follow this structure. Length target: ~250 words per concept.

```
**Concept: [Story Hook] → [Portfolio Company]**

- *Subject line attempts:* [3-4 options, lowercase, under 50 chars]
- *Angle:* [one-line distillation of the curiosity hook — the surprising claim]
- *Story:*
  - **Open in scene:** [2-3 sentences, in-scene moment with sensory detail, leaves an open loop]
  - **Setup the conflict:** [2-3 sentences — the stuck state, what's been tried, why it's failing, with specifics]
  - **The turn:** [2-3 sentences — the moment of change, dialogue/insight if applicable]
  - **The payoff:** [2-3 sentences — concrete result with specifics, what shifted as a consequence]
  - **Open loop into teach:** [1 sentence — the surprising reframe that pulls into the teach]
- *Teach — "[Quotable Heading]":* [one-sentence universal principle]
  - **[Bold principle, one phrase].** [One-line tactical extension that shows what it looks like in practice]
  - **[Bold principle].** [Tactical extension]
  - **[Bold principle].** [Tactical extension]
  - **[Bold principle].** [Tactical extension — optional 4th]
- *Portfolio fit:* [1-2 sentences — the company as natural illustration of the principle]
- *Dive Deeper CTA:* [what content this links to — Dan YT long-form, IG reel, podcast clip]
```

### Step 3: Run the quality check before delivering

For each concept, confirm every box:

- [ ] Story is chronological (in the order it happened, not the order it was told)
- [ ] Each story beat has a specific, observable detail (not abstract language)
- [ ] One main teach, not three (other lessons fold under it as bullets)
- [ ] Each teach bullet has a bold principle + tactical extension (not just a one-liner)
- [ ] Teach bullets are universal — could apply to any reader, not only this company's customers
- [ ] Portfolio mention is natural illustration, not a sales pitch
- [ ] Subject line attempts are lowercase, under 50 chars, max one number, no spam-filter words
- [ ] Any specifics not provided by the founder are flagged as `[placeholder — confirm with founder]`
- [ ] Total length is ~400 words — if drifting past 500, cut

If any box fails, fix before delivering. Do not deliver a concept you wouldn't bet Joel will greenlight.

## Style guidance for generation

These pull from the DM Tone Blueprint (see `tone-blueprint.md` in this folder). Apply selectively — the founder's voice should still come through in the story portion.

**Apply universally:**
- **Show, don't tell.** Describe scenes, not states. "He stares at six discovery calls" beats "his calendar was full."
- **Specifics make it believable.** Exact numbers. Named timeframes. ("by 2pm" not "later that day.")
- **Quotable subheadings.** The teach heading creates curiosity, not just labels the topic. "The Cheapest Sale Happens in Chat" beats "Sales Tips."
- **Anti-AI-slop.** Avoid the reframe patterns ("It's not X, it's Y" / "Not just X. Not just Y. Actually Z."). Avoid "quietly," "on paper," "changed everything," "here's the thing."
- **End sections on the strongest sentence.**

**Apply only when the teach is one of Dan's named frameworks:**
- Use Dan-isms (Clients not Customers, Studio not Office, Team not Employees, Leadership not Management)
- 5th-grade reading level
- Blunt-but-friendly tone

**Do NOT apply:**
- Don't make every founder sound like Dan. The story portion should sound like the founder's voice. Only the framing and teach should lean Dan-style.

## Subject line generation

Generate 3-4 options per concept. They must:
- Be under 50 characters
- Use no more than one number
- Use lowercase (Dan's house style)
- Avoid spam-filter words (free, urgent, $$$, ALL CAPS in the subject)
- Lean on curiosity over clarity — "the zoom invite is killing your sales" beats "stop using zoom for sales calls"
- Pass the "uniquely Dan" test — would this fit alongside Dan's existing newsletter subjects?

## Reference concepts

Pattern-match to these two — both built and approved by Marcel. They are the ground truth for format, length, and tone.

### Reference 1: Sell By Chat → Revio

- *Subject line attempts:*
  - the zoom invite is killing your sales
  - i closed $12k from my couch
  - stop booking calls. start chatting.
  - they don't want a zoom
- *Angle:* the Zoom invite isn't the path to the sale — it's the speed bump in front of it.
- *Story:*
  - **Open in scene:** Tuesday morning. A founder I know stares at six discovery calls stacked back-to-back on his calendar, coffee in hand, already exhausted. He knows the math: maybe one of them closes by 5pm.
  - **Setup the conflict:** He's been doing it this way for years because that's how you're "supposed" to sell — book the call, run the deck, send the proposal, wait. Meanwhile, three inbound DMs from yesterday sit unread in his LinkedIn inbox. They're warmer than any of the names on his calendar, but he's too busy running the call treadmill to answer them.
  - **The turn:** One day he's between meetings and decides to just reply to a DM with the actual answer instead of "let's hop on a call to discuss." The lead asks a sharper follow-up. He answers that one too. Ten minutes in, the lead says "this sounds like exactly what we need — how do we get started?"
  - **The payoff:** Loom walkthrough, one-line price, payment link — all in the same thread. Deal closed before lunch, calendar untouched. He spent the rest of the afternoon answering the other two DMs the same way.
  - **Open loop into teach:** Turns out the Zoom invite was the friction, not the solution.
- *Teach — "Sell By Chat":* chat is the highest-converting medium for inbound, not a downgrade from a "real" call.
  - **Lead with the answer, not a calendar link.** If they ask a question, answer it. Calendar invites are an admission you don't trust your own product to speak for itself.
  - **Qualify in 3 questions: goal, blocker, budget.** All in DM. If you can't qualify someone in three questions, the call won't save you.
  - **Send the offer in writing.** A 2-minute Loom + a one-line price is more honest than a 45-minute pitch deck. The buyer can rewatch it, share it with their team, decide on their own time.
  - **Close in the same thread.** Payment link in the DM. No new tabs, no scheduling, no "I'll send the contract over." The friction between yes and paid kills more deals than price.
- *Portfolio fit:* Revio is the AI sales assistant built natively around this methodology — it runs the chat sale end-to-end so a single founder can scale to every comment, DM, and inbound without touching their calendar.
- *Dive Deeper CTA:* Link to Dan's YT long-form on sell-by-chat, or an IG reel of him closing a deal live in DMs.

### Reference 2: White Glove Onboarding → Vive

- *Subject line attempts:*
  - the $2k fee that fixed everything
  - i charged them more and they thanked me
  - free onboarding is failing your customers
  - the activation paywall
- *Angle:* charging more wasn't the greedy move — it was the generous one.
- *Story:*
  - **Open in scene:** A founder calls me up, frustrated. His product works — when people actually use it. The problem is most of them don't.
  - **Setup the conflict:** A big chunk of customers signing up, never logging in, churning inside 60 days. He'd already tried the standard playbook: video tutorials, drip email sequences, a self-serve onboarding course, automated check-ins. Nothing moved the needle. He was convinced he had a product problem and started planning a UX overhaul.
  - **The turn:** I told him the product wasn't the issue — the price was. Stop giving onboarding away. Charge a premium upfront fee for a white-glove setup, done by his team, not the customer. He pushed back hard: "won't that kill conversions? People will just go to a cheaper competitor." I told him the opposite would happen, and to test it for 30 days.
  - **The payoff:** Activation jumped from 60% to over 90%. The upfront fee — high margin, paid before the customer ever logged in — doubled his cash flow overnight. And the margin on that fee paid for the team that made activation inevitable. Conversions didn't drop. Churn did.
  - **Open loop into teach:** Charging more turned out to be the most generous thing he could do.
- *Teach — "Charge More So It Actually Works":* when selling solves a real customer problem, charging more is the ethical play — and it fixes your unit economics in the process.
  - **Free onboarding signals "this isn't important."** Paid onboarding creates commitment. People show up to the kickoff call when they've paid for it.
  - **A high-margin upfront fee funds the team that makes activation inevitable.** Stop hoping the customer figures it out. Pay people to make sure they do.
  - **Cash up front beats cash later, every time.** It funds growth, removes the gap between sale and payback, and makes refunds a sharper feedback signal than churn.
  - **The cleanest businesses are the ones where charging more makes the customer win more.** If raising your price hurts your customer, you have an offer problem. If raising your price helps them win, you have a moral obligation to do it.
- *Portfolio fit:* Vive's offer redesign is the working example — it's now the playbook we run with every portfolio company that has an activation drag.
- *Dive Deeper CTA:* Link to Dan's video on offer design / pricing, or his content on the morality of premium pricing.

## What this skill does not do

- Does NOT write full newsletter drafts. Concepts only. Joel approves first, then drafting happens in a separate workflow against his full Playbook.
- Does NOT make the portfolio company the subject of the newsletter. Principle is subject; company is illustration.
- Does NOT use Dan's voice for the founder's portion of the story. Founder voice stays intact in the story; Dan-style framing only applies to the teach.
- Does NOT generate filler specifics. If the founder didn't provide a number, don't make one up — push back and ask for it.
