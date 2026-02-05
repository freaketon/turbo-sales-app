/*
Design: Kinetic Energy Interface
- Diagonal progress bar with gradient fill
- Spring physics animations
*/

import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export default function ProgressIndicator({ currentStep, totalSteps, stepTitle }: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm text-muted-foreground font-mono">
            Step {currentStep} of {totalSteps}
          </p>
          <h2 className="text-lg font-semibold text-foreground mt-1">
            {stepTitle}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold gradient-text font-['Outfit']">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
      
      {/* Progress bar container */}
      <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden">
        {/* Gradient progress fill */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #0ea5e9 0%, #f59e0b 100%)',
            transformOrigin: 'left'
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20
          }}
        />
        
        {/* Animated glow effect */}
        <motion.div
          className="absolute top-0 h-full w-20 blur-xl opacity-60"
          style={{
            background: 'linear-gradient(90deg, transparent, #0ea5e9, transparent)',
            left: `${progress}%`,
            transform: 'translateX(-50%)'
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>
    </div>
  );
}
