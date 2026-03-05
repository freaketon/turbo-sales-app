# Social Media Growth Report Generator

By Turbo — Real Time Virality Radar | Version 1.1

## Trigger

TRIGGER when: user asks to generate a social media growth report, Instagram growth report, creator growth analysis, or mentions "Turbo report" / "growth report" for a creator/handle.
DO NOT TRIGGER when: user asks about general social media advice without specifying a creator, or asks about unrelated analytics.

## Overview

Generate a comprehensive, interactive Instagram growth report for any creator, designed to take them to 1 million followers. The report is fully self-contained — if no Brand Bible is provided, deduce the creator's brand identity, language, and tone from their social media accounts automatically.

## Variable Block

Before starting, collect these variables from the user. Required variables are marked with `*`:

| Variable | Description | Example |
|---|---|---|
| `*HANDLE` | Instagram handle (without @) | chris.allchin |
| `*NAME` | Creator's full name | Chris Allchin |
| `*INSTAGRAM_URL` | Full Instagram URL | https://www.instagram.com/chris.allchin/ |
| `YOUTUBE_URL` | YouTube channel URL, or N/A | https://www.youtube.com/@arangoraw |
| `WEBSITE_URL` | Personal/business website, or N/A | https://chrisallchin.com/ |
| `LINKEDIN_URL` | LinkedIn profile URL, or N/A | N/A |
| `EMAIL` | Creator's email, or N/A | chris@example.com |
| `*NICHE` | Content niche | Lead generation coaching |
| `BRAND_BIBLE_PROVIDED` | Has a brand guide? (true/false, default: false) | false |
| `BRAND_BIBLE_FILE` | Attached brand guide file (if true) | |
| `ADDITIONAL_DOCS` | Any assessment or ICP docs | |
| `BRAND_ASSETS` | Logo files, color palette, or N/A | N/A |
| `GITHUB_USERNAME` | GitHub account for deployment | freaketon |
| `DESIGN_PREFERENCE` | dark / light / brand-matched (default: dark) | dark |
| `*CURRENT_FOLLOWERS_IG` | Current Instagram follower count | 11,200 |
| `CURRENT_FOLLOWERS_YT` | YouTube subscriber count, or N/A | 260 |
| `GOAL` | Growth target (default: 1 million followers) | 1 million followers |

If any required variable is missing, ask the user before proceeding.

## Execution Steps

### STEP 1 — Deep Research Phase

Before writing anything, conduct deep research across ALL available sources. Save findings to research notes before proceeding.

1. **Instagram Profile**: Navigate to `https://www.instagram.com/[HANDLE]/`. If login required, use third-party viewer (inflact.com or imginn.com). Extract: follower count, following count, post count, bio text, bio link, profile category, highlights, pinned posts. Analyze latest 20 posts: topics, formats (Reels/carousels/static), average engagement, most viral post, posting frequency, caption style, hashtag strategy, CTA patterns.

2. **YouTube Channel** (if URL provided): Navigate to Videos tab, sort by Most Popular. Extract: subscriber count, video count, top 10 videos by views with titles, upload frequency, video length patterns, thumbnail style, content categories, comment sentiment.

3. **Personal Website/Blog** (if URL provided): Navigate to URL and /about page. Extract: brand positioning, origin story, services/products, pricing, email list CTA, testimonials, press mentions, credentials.

4. **LinkedIn Profile** (if URL provided): Extract: professional background, career history, education, skills, recent posts, headline.

5. **Other Social Platforms**: Check X/Twitter, TikTok, Facebook, podcast platforms for same handle. Note follower counts, activity level, viral content.

6. **Third-Party Coverage**: Search for "[NAME] interview", "[NAME] podcast", "[NAME] Forbes", "[NAME] featured in". Extract press coverage, podcast appearances, notable mentions.

7. **Competitor & Niche Landscape**: Identify top 5 competitors/peers. Note follower counts, content style, what works. Identify the gap this creator can own.

8. **Viral Trends Research**: Search current trending topics in creator's niche on TikTok Trending, Instagram Explore, Google Trends, Reddit, YouTube Trending. Identify 8-10 pre-viral signals. Research 2026 Instagram algorithm priorities (Saves > Shares > Watch Time > Comments > Likes).

9. **Newsjacking Opportunities**: Research top 5 viral news events and cultural moments. For each: emotional frequency activated, niche connection, ready-to-use bridge hook.

### STEP 2 — Brand & Tone Deduction

**If BRAND_BIBLE_PROVIDED is true**: Read the Brand Bible, extract all brand identity elements, proceed to Step 3.

**If BRAND_BIBLE_PROVIDED is false**: Run the full deduction protocol:

**Module 1 — Mission & Purpose**: Analyze bios, about pages, YouTube descriptions, pinned posts. Output a single mission statement in the creator's voice: "I help [audience] achieve [outcome] by [method], so they can [deeper transformation]."

**Module 2 — Content Pillars**: Categorize last 20-30 posts into themes. Rank by frequency and engagement. Output 3-5 content pillars with names, descriptions, and engagement notes.

**Module 3 — Visual Identity**: Analyze color palette of last 9 posts, fonts in Reels/carousels, website style. Identify primary/secondary/background colors (hex codes), font style, aesthetic archetype (Minimalist / Bold & Energetic / Earthy & Organic / Dark & Mysterious / Warm & Inviting / Clinical & Professional / Playful & Colorful).

**Module 4 — Target Audience**: Analyze comment sections on top 5 most-engaged posts. Output ICP description: age range, occupation, core pain point, core desire, what they seek from this creator.

**Module 5 — Language Analysis**: Collect 10 caption samples from last 20 posts. Analyze: lexical density, sentence length, vocabulary type, 20 most frequent non-stop-words, signature phrases, punctuation style.

**Module 6 — Tone Analysis**: Analyze: energy level (1-10), primary emotional register (Inspirational/Educational/Provocative/Empathetic/Humorous/Authoritative/Vulnerable/Aspirational), secondary register, community address terms, self-reference style.

**Module 7 — Creator Voice Guide**: Synthesize into three sections:
- Section A — Language Style Rules (sentence length, vocabulary level, signature phrases, punctuation)
- Section B — Tone of Voice (energy level, emotional registers, what they NEVER say)
- Section C — Audience Address (terms used, relationship type, implicit promise)

**IMPORTANT**: Once the Creator Voice Guide is complete, write every section of the report in this voice.

### STEP 3 — Verify Content Alignment

Before writing, explicitly state:
- What niche the creator ACTUALLY posts about (based on latest 20 posts)
- Whether this matches their bio/website/positioning
- Any misalignment between stated and actual niche
- The single biggest untapped content asset

Build the report around ACTUAL current content unless instructed otherwise.

### STEP 4 — Build the Interactive HTML Report

Build a single-file HTML report (`index.html`).

**Design System:**
- Color palette: Use deduced/provided brand palette. Default fallback: dark navy (#0a0e1a) background, teal (#4ecdc4), purple (#7c5cbf), magenta (#c84b9e), gold (#d4a843), rose (#e8736a), green (#4a9e6b)
- Typography: Use deduced/provided fonts. Default: Google Fonts — 'Playfair Display' for headings, 'Inter' for body
- Cards: Glassmorphism style — semi-transparent backgrounds, subtle borders, backdrop blur
- Backgrounds: Flowing gradient wave decorations, floating orb elements, subtle grid patterns
- Logo: Include Turbo logo in navigation and footer if brand assets are provided
- Favicon: Use Turbo icon as favicon

**Navigation:**
- Fixed top nav with logo (left), creator handle (@handle), smooth-scroll anchor links to every section
- Highlighted CTA button linking to Hook Creator section
- Mobile-responsive hamburger menu

**Layout:**
- Full-width main content (~72% width left)
- Fixed sidebar (~28% width right): Viral Trends panel, Algorithm Signals panel, Quick Navigation panel

### STEP 5 — Report Sections (Build All 9)

All sections written in Creator Voice Guide tone. All content pillars, ICP descriptions, and strategy must stem from research/deduction phases.

**Section 01 — Executive Summary**
- Bold headline naming core opportunity in one sentence (creator's voice)
- 4 stat cards (follower count, YouTube subs, engagement rate, biggest viral post)
- "Core Diagnosis" paragraph: what works, what's broken, single biggest lever
- 4 strategic pillars

**Section 02 — Audience & ICP**
- 2 detailed ICP profile cards (Primary + Secondary): name/archetype, age, occupation, income, pain points, desires, content preferences, platforms, follow triggers
- Audience segmentation table: 5-6 segments with size estimates, Instagram presence, converting content, priority rating
- "Positioning Gap" analysis: what creator says vs. what audience needs

**Section 03 — Platform Deep Analysis**
- If YouTube: top 10 videos by views, category performance table, YouTube-to-Instagram Bridge Strategy
- If no YouTube: deep Instagram content audit — best/worst post types, content gaps
- Repurposing priority table

**Section 04 — Gaps & Opportunities**
- 4-6 critical gaps (specific and honest): problem, impact, specific fix
- 2-3 major untapped opportunities: size, why now, first action step

**Section 05 — Content Strategy**
- 5 content pillars specific to creator (from deduction phase): name, description, keywords, example posts, best Instagram format
- Weekly content calendar template
- Hook Formula specific to this creator's audience

**Section 06 — Roadmap to 1 Million Followers**
- Phase 1: Current to 100K (Foundation & Velocity)
- Phase 2: 100K to 500K (Series & Collaboration)
- Phase 3: 500K to 1M+ (Authority & Monetization)
- Each phase: duration, 5-7 action items, key metrics, primary growth mechanism
- 2026 Instagram Algorithm Cheat Sheet

**Section 07 — Trend Intelligence System (Pre-Viral Radar)**
- Opportunity Cost Calculator (quantified with real numbers)
- 4-Stage Viral Lifecycle: Emergence, Acceleration, Peak, Decline (reach multipliers, golden entry window)
- 10 Pre-Viral Trends: color-coded by urgency (red/orange/yellow), heat score, signal source, creator's angle
- Cross-Niche Trend Migration Map: 6-8 source niches with migration timelines
- 30-Minute Weekly Trend Radar protocol (Monday scan, Wednesday check, Friday decision) + tools stack

**Section 08 — Newsjacking Engine**
- Definition and opportunity
- Opportunity Cost of Silence (4 data points, reach multiplier)
- 3-Step Bridge Formula: Acknowledge, Validate, Bridge (with example language)
- Live Newsjacking Map: 5 current events mapped to creator's niche (event, urgency, emotional frequency, bridge angle, ready-to-use hook)
- What to Avoid: authenticity tests, 24-72hr golden window, guardrails
- Monitoring sources stack

**Section 09 — Hook Creator (Interactive Tool)**
- Dropdown: Topic (10 options specific to creator's niche)
- Dropdown: Hook Type (6 patterns: Curiosity Gap, Problem Amplification, Authority Challenge, Transformation, POV/Perspective Flip, Number Hook)
- "Generate Hook" button producing unique hook per topic x type combination (60 total)
- 30-36 pre-written hooks in 6 tabs by psychological pattern
- One-click copy button per hook
- "Why It Works" label per hook type

**Sidebar:**
- 8 live trends ranked by heat score (1-10) with urgency badges and action steps
- Algorithm Signals panel (visual ranking)
- Quick Navigation links

### STEP 6 — Hook Engineering Rules

Every hook must follow:
1. **3-Second Rule**: First 3 words stop the scroll (number, provocative statement, or direct address)
2. **Specificity**: "I lost $47,000 in 3 days" beats "I made a big mistake"
3. **Curiosity Gap**: Create info gap. Never complete the thought in the hook
4. **Emotional Resonance**: Activate fear, curiosity, aspiration, outrage, or belonging
5. **Niche Specificity**: Speak directly to the creator's ICP. No generic hooks
6. **No Clickbait**: The hook must be deliverable
7. **Pattern Interrupt**: Unexpected juxtapositions, counterintuitive statements, format breaks
8. **Voice Alignment**: Must sound like the creator. Use Creator Voice Guide

### STEP 7 — Quality Checklist

Before delivering, verify:
- [ ] All content is specific to this creator — no generic advice
- [ ] All statistics and follower counts are accurate (from research)
- [ ] ICP based on actual audience signals, not assumptions
- [ ] Content pillars derived from deduction phase, not invented
- [ ] Every hook is unique, niche-specific, written in creator's voice
- [ ] Newsjacking map uses current events (within last 30 days)
- [ ] Trends are actually pre-viral (not already peaked)
- [ ] Roadmap has specific, actionable steps
- [ ] HTML is valid, loads without errors, all interactive elements work
- [ ] Design matches deduced/provided brand aesthetic
- [ ] Creator Voice Guide applied consistently throughout

### STEP 8 — Deployment

After building the HTML report:
1. Create the `index.html` file with all assets embedded inline
2. If GITHUB_USERNAME is provided: create repo `[HANDLE]-growth-report`, push to master, enable GitHub Pages
3. Verify the site loads correctly
4. Return the permanent URL to the user

## Modular Add-Ons

The user can request any of these add-ons to stack on top of the base report:

### Add-On A — Brand Bible Integration
When a Brand Bible IS provided: read it in full, extract mission/vision/values, content pillars, tone rules, defined ICP, content frameworks, visual identity, calendar/roadmap, named systems. Use exact language and naming conventions throughout. Flag gaps between Brand Bible and actual content.

### Add-On B — YouTube to Instagram Bridge Strategy
Deep YouTube audit of top 20 videos. Build a repurposing engine: priority table of top 10 videos to repurpose, recommended format/hook/caption/CTA for each, weekly workflow (1 YouTube video to 5 Instagram posts), "Clip Extraction Formula" for identifying 3 most shareable moments.

### Add-On C — Competitor Intelligence Report
Top 5 competitors: handle, followers, frequency, formats, top 3 posts (why they worked), content gaps, audience overlap. Produce: Competitive Positioning Matrix (2x2 grid), "White Space" analysis, 3 content ideas per competitor done better.

### Add-On D — Monetization Roadmap
4 tiers by follower count (0-10K, 10K-100K, 100K-500K, 500K-1M+). Each tier: primary revenue stream, price point, conversion rate assumption, monthly revenue estimate (low/mid/high), Instagram content type that converts, CTA structure.

### Add-On E — 30-Day Content Calendar
Complete 30-day calendar. Each day: post type, content pillar, topic, hook, format notes, trending audio suggestion, hashtag cluster (3-5), CTA. Requirements: 1+ newsjacking post/week, 2+ Reels/week, 1+ carousel/week, 4:3:2:1 ratio (educational:inspirational:personal:promotional), 2 "viral bet" posts/week.

### Add-On F — Bilingual/Multi-Language Strategy
Language allocation by platform/format, "Bilingual Arbitrage" opportunity, cultural adaptation framework, platform-specific recs, top 3 content types per language, hashtag strategy per language.

### Add-On G — PDF Export
Generate PDF version using same design system. A4 format, cover page with handle/logo/date, all sections condensed, print-optimized CSS (@media print).
