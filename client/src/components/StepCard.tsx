/*
Design: Kinetic Energy Interface
- Glassmorphic cards with backdrop blur
- Diagonal accent lines
- Spring animations on mount
*/

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StepCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function StepCard({ children, delay = 0, className = '' }: StepCardProps) {
  return (
    <motion.div
      className={`glass-card rounded-2xl p-6 md:p-8 ${className}`}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay
      }}
    >
      {children}
    </motion.div>
  );
}

interface StepHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export function StepHeader({ title, subtitle, icon }: StepHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1 font-mono">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

interface StepContentProps {
  content: string[];
}

export function StepContent({ content }: StepContentProps) {
  return (
    <div className="space-y-3 mb-6">
      {content.map((paragraph, index) => (
        <motion.p
          key={index}
          className="text-foreground/90 leading-relaxed"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.1 + index * 0.05,
            type: 'spring',
            stiffness: 300,
            damping: 20
          }}
        >
          {paragraph}
        </motion.p>
      ))}
    </div>
  );
}

interface ScriptBoxProps {
  lines: string[];
}

export function ScriptBox({ lines }: ScriptBoxProps) {
  return (
    <motion.div
      className="bg-muted/20 border border-border/50 rounded-xl p-6 mb-6 font-mono text-sm"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.2,
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-destructive/80" />
        <div className="w-3 h-3 rounded-full bg-secondary/80" />
        <div className="w-3 h-3 rounded-full bg-accent/80" />
        <span className="ml-2 text-xs text-muted-foreground">SCRIPT</span>
      </div>
      <div className="space-y-2">
        {lines.map((line, index) => (
          <motion.p
            key={index}
            className={`${
              line.startsWith('[') 
                ? 'text-muted-foreground italic text-xs' 
                : line.startsWith('•') || line.startsWith('The terms:') || line.startsWith('Double-Win')
                ? 'text-accent/90 font-semibold'
                : 'text-foreground/90'
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3 + index * 0.03
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}

interface TipsBoxProps {
  tips: string[];
}

export function TipsBox({ tips }: TipsBoxProps) {
  return (
    <motion.div
      className="bg-accent/10 border border-accent/30 rounded-xl p-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.4,
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
    >
      <h4 className="text-sm font-semibold text-accent mb-3 flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Tips & Guidance
      </h4>
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <motion.li
            key={index}
            className="text-sm text-foreground/80 leading-relaxed"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.5 + index * 0.05
            }}
          >
            {tip}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
