/*
Design: OUTLIER Agitation Calculator
- Time wasted searching for trends
- Money burned on missed shots & failed videos
- Production cost of content that doesn't work
- Missed growth opportunity (the invisible cost)
*/

import { motion } from 'framer-motion';
import { DollarSign, TrendingDown, Clock, Video, Target, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CostCalculatorProps {
  hoursSearching?: number;
  missedShotsPerMonth?: number;
  costPerVideo?: number;
  monthlyFollowerGoal?: number;
}

export default function CostCalculator({
  hoursSearching = 0,
  missedShotsPerMonth = 0,
  costPerVideo = 0,
  monthlyFollowerGoal = 0,
}: CostCalculatorProps) {
  const [wastedResearchCost, setWastedResearchCost] = useState(0);
  const [wastedProductionCost, setWastedProductionCost] = useState(0);
  const [totalAnnualWaste, setTotalAnnualWaste] = useState(0);

  useEffect(() => {
    // Time wasted searching for trends: hours/week × $75 avg rate × 48 weeks
    const researchWaste = (hoursSearching || 0) * 75 * 48;
    // Production waste: missed shots/month × cost per video × 12
    const productionWaste = (missedShotsPerMonth || 0) * (costPerVideo || 0) * 12;
    const total = researchWaste + productionWaste;

    setWastedResearchCost(researchWaste);
    setWastedProductionCost(productionWaste);
    setTotalAnnualWaste(total);
  }, [hoursSearching, missedShotsPerMonth, costPerVideo]);

  const hasResearch = !!hoursSearching;
  const hasProduction = missedShotsPerMonth && costPerVideo;
  const hasAll = hasResearch && hasProduction;
  const hasAny = hasResearch || missedShotsPerMonth || costPerVideo;

  return (
    <motion.div
      className="p-6 rounded-xl border-2 border-destructive/50 bg-destructive/10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
          <TrendingDown className="w-6 h-6 text-destructive" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-destructive uppercase tracking-wide">
            Content Waste Calculator
          </h4>
          <p className="text-xs text-muted-foreground">
            {hasAny ? 'Calculating as you answer...' : 'Answer the questions to reveal the real cost'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Line 1: Research time waste */}
        <div className="bg-background/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Time Searching for Trends</p>
          </div>
          <p className={`font-mono text-sm ${hasResearch ? "text-foreground" : "text-muted-foreground/60"}`}>
            <span className={hasResearch ? "text-accent font-semibold" : ""}>{hoursSearching || '?'}</span> hrs/week × $75/hr × 48 weeks ={' '}
            <span className={hasResearch ? "text-destructive font-bold" : ""}>
              {hasResearch ? `$${wastedResearchCost.toLocaleString()}` : '$???'}
            </span>
          </p>
        </div>

        {/* Line 2: Failed content production */}
        <div className="bg-background/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Video className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Missed Shots & Failed Videos</p>
          </div>
          <p className={`font-mono text-sm ${hasProduction ? "text-foreground" : "text-muted-foreground/60"}`}>
            <span className={missedShotsPerMonth ? "text-accent font-semibold" : ""}>{missedShotsPerMonth || '?'}</span> videos/mo × $<span className={costPerVideo ? "text-accent font-semibold" : ""}>{costPerVideo || '?'}</span> each × 12 ={' '}
            <span className={hasProduction ? "text-destructive font-bold" : ""}>
              {hasProduction ? `$${wastedProductionCost.toLocaleString()}` : '$???'}
            </span>
          </p>
        </div>

        {/* Total annual waste */}
        <div className={`rounded-xl p-6 border transition-all duration-300 ${
          hasAll
            ? 'bg-gradient-to-r from-destructive/20 to-secondary/20 border-destructive/30'
            : 'bg-background/30 border-border/30'
        }`}>
          <div className="flex items-baseline gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-destructive" />
            <div>
              <motion.p
                className={`text-4xl font-bold transition-colors ${
                  hasAll ? 'text-destructive' : 'text-muted-foreground/40'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.3 }}
              >
                {hasAll ? `$${totalAnnualWaste.toLocaleString()}` : '$---'}
              </motion.p>
              <p className="text-sm text-muted-foreground">
                {hasAll ? 'per year burned on guesswork' : 'waiting for inputs...'}
              </p>
            </div>
          </div>
          {hasAll && (
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <TrendingDown className="w-4 h-4" />
              <span>= ${Math.round(totalAnnualWaste / 12).toLocaleString()}/month wasted</span>
            </div>
          )}
        </div>

        {/* Missed growth opportunity (agitation) */}
        {hasAll && monthlyFollowerGoal > 0 && (
          <motion.div
            className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-amber-500" />
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Missed Growth Opportunity</p>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">
              You want <strong className="text-amber-600">{monthlyFollowerGoal.toLocaleString()} followers/month</strong> but every video posted on a dead trend is a missed shot at growth.
              If even <strong>1 in 3</strong> of those wasted videos hit the right trend at the right time, you'd be growing <strong className="text-amber-600">2-3x faster</strong>.
            </p>
          </motion.div>
        )}

        {/* Context / Agitation */}
        {hasAll && (
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <p className="text-sm text-foreground/90 leading-relaxed">
              <strong className="text-accent">This is the real cost of guessing.</strong>{' '}
              Every week without data-driven content strategy, you're burning ${Math.round(totalAnnualWaste / 52).toLocaleString()} on research that leads nowhere and videos that flop.
              That's not a content problem — it's a <strong>visibility problem</strong>.
            </p>
          </div>
        )}
      </div>

      {/* Get Agreement */}
      {hasAll && (
        <motion.div
          className="mt-4 pt-4 border-t border-border/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-destructive font-semibold uppercase tracking-wide mb-2">
            Critical: Get Agreement
          </p>
          <p className="text-sm text-foreground/80 italic">
            "So you're spending roughly ${totalAnnualWaste.toLocaleString()}/year on guesswork and failed content.
            Does that math sound directionally right to you?"
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Do not proceed until they agree. No agreement = no pitch.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
