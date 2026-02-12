/*
Design: Kinetic Energy Interface
- Live cost calculation display
- Visual emphasis on annual waste
*/

import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CostCalculatorProps {
  editors?: number;
  hoursPerWeek?: number;
  ratePerHour?: number;
}

export default function CostCalculator({ editors = 0, hoursPerWeek = 0, ratePerHour = 0 }: CostCalculatorProps) {
  const [annualCost, setAnnualCost] = useState(0);
  const [monthlyCost, setMonthlyCost] = useState(0);
  
  useEffect(() => {
    // Always calculate, even with zero values
    const annual = (editors || 0) * (hoursPerWeek || 0) * (ratePerHour || 0) * 48; // 48 working weeks
    const monthly = annual / 12;
    setAnnualCost(annual);
    setMonthlyCost(monthly);
  }, [editors, hoursPerWeek, ratePerHour]);
  
  const hasAllValues = editors && hoursPerWeek && ratePerHour;
  const hasAnyValue = editors || hoursPerWeek || ratePerHour;
  
  return (
    <motion.div
      className="my-6 p-6 rounded-xl border-2 border-destructive/50 bg-destructive/10"
      data-has-values={hasAllValues}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: 0.2
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-destructive" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-destructive uppercase tracking-wide">
            Invisible Tax Calculator
          </h4>
          <p className="text-xs text-muted-foreground">
            {hasAnyValue ? 'Live calculation as you answer' : 'Answer the questions to see the cost'}
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Formula breakdown */}
        <div className="bg-background/50 rounded-lg p-4 font-mono text-sm">
          <p className="text-muted-foreground mb-2">Formula:</p>
          <p className={hasAllValues ? "text-foreground" : "text-muted-foreground/60"}>
            <span className={editors ? "text-accent font-semibold" : ""}>{editors || '?'}</span> editors × <span className={hoursPerWeek ? "text-accent font-semibold" : ""}>{hoursPerWeek || '?'}</span> hrs/week × <span className={ratePerHour ? "text-accent font-semibold" : ""}>${ ratePerHour || '?'}</span>/hr × 48 weeks
          </p>
        </div>
        
        {/* Annual cost - big emphasis */}
        <div className={`rounded-xl p-6 border transition-all duration-300 ${
          hasAllValues 
            ? 'bg-gradient-to-r from-destructive/20 to-secondary/20 border-destructive/30' 
            : 'bg-background/30 border-border/30'
        }`}>
          <div className="flex items-baseline gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-destructive" />
            <div>
              <motion.p
                className={`text-4xl font-bold transition-colors ${
                  hasAllValues ? 'text-destructive' : 'text-muted-foreground/40'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 15,
                  delay: 0.3
                }}
              >
                {hasAllValues ? `$${annualCost.toLocaleString()}` : '$---'}
              </motion.p>
              <p className="text-sm text-muted-foreground">
                {hasAllValues ? 'per year wasted' : 'waiting for inputs...'}
              </p>
            </div>
          </div>
          {hasAllValues && (
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <TrendingUp className="w-4 h-4" />
              <span>≈ ${monthlyCost.toLocaleString()}/month</span>
            </div>
          )}
        </div>
        
        {/* Context */}
        {hasAllValues && (
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <p className="text-sm text-foreground/90 leading-relaxed">
              <strong className="text-accent">This is money already spent</strong> on work you paid to produce. 
              Every month this continues, you're burning ${monthlyCost.toLocaleString()} on searching instead of creating.
            </p>
          </div>
        )}
      </div>
      
      {/* Critical reminder */}
      {hasAllValues && (
        <motion.div
          className="mt-4 pt-4 border-t border-border/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xs text-destructive font-semibold uppercase tracking-wide mb-2">
          ⚠️ Critical: Get Agreement
        </p>
        <p className="text-sm text-foreground/80 italic">
          Do not proceed until they explicitly agree this math is directionally accurate. 
          No agreement = no pitch.
        </p>
        </motion.div>
      )}
    </motion.div>
  );
}
