# TURBO Sales Guide - Implementation TODO

## Completed Features
- [x] Basic sales flow with step-by-step guidance
- [x] Qualification questions
- [x] Cost lock calculator
- [x] Objection handling
- [x] Live notes with AI sales coach
- [x] Analytics dashboard
- [x] PDF export
- [x] Call history tracking
- [x] localStorage persistence
- [x] Prospect information capture
- [x] Payment link integration
- [x] Answers sidebar
- [x] TURBO branding and cyan color scheme

## Coach Recommendations - In Progress
- [ ] Implement Pain Articulation Checkpoint (Discipline Discovery Sequence)
  - [ ] Create pain articulation step before solution/demo
  - [ ] Add pain quantification step
  - [ ] Integrate into main sales flow
  - [ ] Update Home.tsx to handle new steps

- [ ] Build Second Discovery Path (Moment-Finding Pain)
  - [ ] Create moment-finding discovery step
  - [ ] Create moment-cost-lock step
  - [ ] Add routing logic for "solved chaos but not speed" scenarios
  - [ ] Integrate into main sales flow

- [x] Improve Objection Handling (Acknowledge → Clarify → Reframe)
  - [x] Create improved objection responses library
  - [x] Build ImprovedObjectionHandler component
  - [x] Update ObjectionQuickAccess with new framework
  - [x] Replace old objection handler in Home.tsx

## Next Steps
- [ ] Test pain articulation checkpoint flow
- [ ] Test second discovery path routing
- [ ] Add visual indicators for which discovery path is active
- [ ] Update PDF export to include pain articulation notes
- [ ] Add AI coach guidance for new discovery paths

## Current Work - Pain Articulation Integration
- [x] Add pain articulation step to salesFlow.ts
- [x] Update step ordering to place pain articulation after qualification
- [x] Add routing logic in Home.tsx for pain articulation step
- [x] Test pain articulation flow end-to-end
- [ ] Update PDF export to include pain articulation responses

## Current Work - Unified Chat Interface
- [x] Create unified chat component merging Live Notes and AI coaching
- [x] Replace separate Live Notes and AI chat buttons with single chat button
- [x] Ensure notes are saved and AI provides coaching in same conversation flow
- [x] Test unified chat interface end-to-end

## Current Work - Cost Calculator Visibility
- [x] Redesign cost calculator to be persistently visible during cost-lock questions
- [x] Implement sticky side panel or bottom panel layout
- [x] Ensure calculator updates in real-time as questions are answered
- [x] Test on different screen sizes

## Current Work - Back Button Navigation
- [x] Add Back button next to Continue button throughout sales flow
- [x] Implement previousStep logic in salesFlow
- [x] Handle back navigation in Home.tsx
- [x] Test back navigation across all steps

## Current Work - New Discovery Call Script Implementation
- [x] Restructure salesFlow.ts to match new 12-section script
  - [x] Section 1: Frame the Call (2 min)
  - [x] Section 2: Problem Exposure (8-10 min) - 7 discovery questions
  - [x] Section 3: Alternative Solutions - what they've tried
  - [x] Section 4: Dream Outcome - magic wand question
  - [x] Section 5: Price Anchor (before demo)
  - [x] Section 6: Transition to Demo
  - [x] Section 7: Demo-Ask Loop (3-5 features with validation)
  - [x] Section 8: Impact Measurement (calculate hours/$ saved)
  - [x] Section 9: Recap (repeat everything back)
  - [x] Section 10: Availability Check (soft close)
  - [x] Section 11: The Offer (Founders Circle $5k)
  - [x] Section 12: Close
- [x] Enhance SalesCoach chat component
  - [x] Add ability to capture customer answers as they speak
  - [x] Provide "repeat back" framing suggestions based on captured answers
  - [x] Auto-generate mirror statements from customer responses
  - [x] Add section-specific prompts for what to capture
- [x] Update UI to support new flow
  - [x] Remove old qualification/cost-lock steps
  - [x] Add mirror/repeat-back prompts at key moments
  - [x] Update calculator to work with Section 8 (Impact Measurement)
  - [x] Add Founders Circle offer presentation in Section 11
- [x] Test complete 12-section flow end-to-end

## Current Work - UX Improvements
- [x] Remove prospect info form from start screen
- [x] Add simple "Start Call" button to begin immediately
- [x] Switch app theme to dark black background (prevent screen reflection)
- [x] Move prospect name/email capture to end of call flow
- [x] Show prospect info form before saving call history

## Current Work - Bug Fixes
- [x] Fix "Step not found" error when loading app
- [x] Clear old localStorage data with invalid step IDs
- [x] Add validation to handle missing/invalid steps gracefully

## Current Work - Question/Answer/Mirror Layout Redesign
- [x] Redesign step layout to show questions at top, answer fields in middle, mirror script at bottom
- [x] Make mirror script auto-generate as answers are typed (no button click needed)
- [x] Ensure all three sections visible without scrolling on standard screen
- [x] Add clear visual separation between question, answer, and mirror sections
- [x] Test layout on different screen sizes

## Current Work - Script Layout & Customer Tracker Improvements
- [x] Hide/minimize script lines when questions exist (questions ARE the script)
- [ ] Make script lines collapsible/expandable for reference if needed
- [x] Create persistent "Customer Answers" tracker sidebar
- [x] Show all mirrored statements in tracker so you can always reference what they said
- [x] Build dynamic demo script generator based on discovery pain points
- [x] Auto-prioritize demo features based on their biggest pain from answers

## Current Work - Continue Button Visibility Fix
- [x] Fix Continue button being hidden behind Customer Answers tracker
- [x] Add padding or margin to main content area to account for fixed sidebar
- [x] Ensure buttons are always visible on all screen sizes

## Current Work - Mobile Responsiveness
- [x] Hide Customer Answers tracker on mobile/tablet screens (shows only on lg+ screens)
- [ ] Add toggle button to show/hide tracker on mobile
- [x] Remove fixed right padding on mobile screens (only applies on lg+ screens)
- [x] Make all components stack vertically on mobile
- [ ] Test on different mobile screen sizes (phone, tablet)
- [x] Ensure buttons and text are readable on small screens

## Current Work - Demo-Ask Loop Continue Button Fix
- [x] Find why Continue button is missing in Section 7: Demo-Ask Loop
- [x] Add Continue button to demo-ask-loop step
- [x] Ensure button is visible and functional

## Current Work - Script Improvements & All Questions Optional
- [x] Make ALL questions optional across all sections (user can skip any question)
- [x] Update Frame Call intro to position as "feedback call" not sales call
- [x] Add "Thank you" prompts after each mirror statement
- [x] Rewrite The Offer section with compelling Founders Circle pitch
  - [x] Emphasize exclusivity (10 founders only)
  - [x] Highlight 3-month launch timeline at higher price
  - [x] Mention white glove service, beta access, roadmap voice
  - [x] State pricing: $5k (<$420/month from moment of search)
  - [x] Include grandfather pricing guarantee
  - [x] Add 50-hour guarantee in 90 days or money back + $500 bonus

## Current Work - Intelligent Demo Prioritization
- [x] Enhance DemoPrioritizer to analyze pain points from Section 2 discovery answers
- [x] Create pain-to-feature mapping logic (which features solve which pains)
- [x] Rank pain points by severity based on customer's language and emphasis
- [x] Generate demo order showing features for most painful problems first
- [x] Display pain → feature connection in demo script ("You mentioned X, here's how we solve it")

## Current Work - Feedback-First Discovery Changes
- [x] A) Add mandatory call frame opener (must click "Delivered" to proceed)
- [x] B) Create curiosity tonality coach panel (rotating prompts during discovery)
- [x] C) Add helpful reinforcement nudge button with suggested one-liners
- [x] D) Add demo permission gate before demo section
- [x] E) Update Early Adopter offer with exact 3-part framing (Bridge → Permission → Offer)

## Current Work - Layout & Resume Issues
- [x] Fix overlapping components in Section 8 (Impact Measurement)
- [x] Add "Clear Progress & Start Fresh" button to header (Restart button already exists)
- [x] Fix localStorage resume showing mid-call state on load (validation added)
- [x] Ensure all components render in correct positions without overlap

## Current Work - Section 9 Recap & Section 11 Offer Framing
- [x] Update Section 9 (Recap) to auto-populate with all previous mirror statements
- [x] Show most powerful pain points and problems from all discovery sections
- [x] Remove mirror box from Section 9 (this section IS the mirror)
- [x] Restructure Section 11 (The Offer) with exact 3-part framing
  - [x] Part 1: Bridge (appreciation + feedback value)
  - [x] Part 2: Permission (ask to hear about early adopter program)
  - [x] Part 3: Offer (7 bullet points to read verbatim)

## CRITICAL BUGS - Fix Immediately
- [x] Section 1: Remove duplicate script (script shows in both Call Frame Opener AND Script box)
- [x] Mirror confirmation should come AFTER mirror script (currently shows before)
- [x] Section 3: Mirror not updating when answers change
- [x] Section 8: Calculator overlapping with text content
- [x] Section 9: Recap not showing (RecapSummary component not rendering)
- [x] Section 11: Offer missing verbatim bullet points (7 bullets not displaying)

## NEW BUG - React Duplicate Key Error
- [x] Fix duplicate key 'intent-search' causing React warning

## Mirror Confirmation Buttons Not Functional
- [x] Make "Yes - confirmed" and "They clarified/added more" buttons actually work
- [x] Store confirmation response in answers state
- [x] Show visual feedback when button is clicked
