/*
Design: Kinetic Energy Interface
- Interactive button states with spring animations
- Gradient borders on hover
- Color-coded feedback (green for progress, amber for caution, red for disqualify)
*/

import { motion } from 'framer-motion';
import { Question } from '@/lib/salesFlow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface QuestionCardProps {
  question: Question;
  onAnswer: (questionId: string, answer: string) => void;
  currentAnswer?: string;
}

export default function QuestionCard({ question, onAnswer, currentAnswer }: QuestionCardProps) {
  const [selectedValue, setSelectedValue] = useState<string>(currentAnswer || '');
  
  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onAnswer(question.id, value);
  };
  
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: 0.3
      }}
    >
      <h4 className="text-lg font-semibold text-foreground mb-4">
        {question.text}
      </h4>
      
      {question.guidance && (
        <p className="text-sm text-muted-foreground mb-4 italic">
          {question.guidance}
        </p>
      )}
      
      {/* Text or Number Input */}
      {(question.type === 'text' || question.type === 'number') && (
        <Input
          type={question.type}
          placeholder={question.placeholder}
          value={selectedValue}
          onChange={(e) => handleSelect(e.target.value)}
          className="text-lg py-6"
        />
      )}
      
      {/* Multiple choice options */}
      {question.options && (
      <div className={`grid gap-3 ${
        question.type === 'binary' ? 'grid-cols-2' : 'grid-cols-1'
      }`}>
        {question.options?.map((option, index) => {
          const isSelected = selectedValue === option.value;
          const isDisqualifying = option.isDisqualifying;
          
          return (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.4 + index * 0.1,
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}
            >
              <Button
                variant={isSelected ? 'default' : 'outline'}
                className={`w-full h-auto py-4 px-6 text-left justify-start relative overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? isDisqualifying
                      ? 'bg-destructive text-destructive-foreground border-destructive'
                      : 'bg-primary text-primary-foreground border-primary'
                    : 'hover:border-primary/50 hover:bg-primary/5'
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {/* Animated gradient border on hover */}
                {!isSelected && (
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
                    style={{
                      background: 'linear-gradient(135deg, #0ea5e9, #f59e0b)',
                      padding: '2px'
                    }}
                    whileHover={{ opacity: 0.3 }}
                  >
                    <div className="w-full h-full bg-background rounded-lg" />
                  </motion.div>
                )}
                
                <div className="relative z-10 flex items-center gap-3 w-full">
                  {/* Custom checkbox/radio indicator */}
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? isDisqualifying
                        ? 'border-destructive-foreground bg-destructive-foreground'
                        : 'border-primary-foreground bg-primary-foreground'
                      : 'border-muted-foreground'
                  }`}>
                    {isSelected && (
                      <motion.div
                        className={`w-2.5 h-2.5 rounded-full ${
                          isDisqualifying ? 'bg-destructive' : 'bg-primary'
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 15
                        }}
                      />
                    )}
                  </div>
                  
                  <span className="flex-1 font-medium">
                    {option.label}
                  </span>
                  
                  {isDisqualifying && (
                    <span className="text-xs font-mono opacity-70">
                      DISQUALIFY
                    </span>
                  )}
                </div>
              </Button>
            </motion.div>
          );
        })}
      </div>
      )}
    </motion.div>
  );
}
