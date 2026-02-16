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
