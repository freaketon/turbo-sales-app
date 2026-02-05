/*
Design: Kinetic Energy Interface
- Hero section with animated gradient background
- Step-by-step flow with glassmorphic cards
- Spring physics animations throughout
*/

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { salesFlow, getStepById, isQualified } from '@/lib/salesFlow';
import ProgressIndicator from '@/components/ProgressIndicator';
import StepCard, { StepHeader, StepContent, ScriptBox, TipsBox } from '@/components/StepCard';
import QuestionCard from '@/components/QuestionCard';
import { 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  Target, 
  Lightbulb, 
  Zap, 
  Handshake, 
  XCircle, 
  Trophy,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

const stepIcons: Record<string, React.ReactNode> = {
  opening: <MessageSquare className="w-6 h-6" />,
  problem: <AlertTriangle className="w-6 h-6" />,
  qualification: <Target className="w-6 h-6" />,
  urgency: <Zap className="w-6 h-6" />,
  reframe: <Lightbulb className="w-6 h-6" />,
  solution: <CheckCircle2 className="w-6 h-6" />,
  offer: <Handshake className="w-6 h-6" />,
  close: <Trophy className="w-6 h-6" />,
  objection: <MessageSquare className="w-6 h-6" />,
  disqualify: <XCircle className="w-6 h-6" />,
  success: <Trophy className="w-6 h-6" />
};

export default function Home() {
  const [currentStepId, setCurrentStepId] = useState<string>('opening');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [callStarted, setCallStarted] = useState(false);
  
  const currentStep = getStepById(currentStepId);
  const currentStepIndex = salesFlow.findIndex(s => s.id === currentStepId);
  const totalSteps = salesFlow.length;
  
  useEffect(() => {
    // Scroll to top when step changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStepId]);
  
  const handleAnswer = (questionId: string, answer: string) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    
    // Find the question and check for next step override
    const question = currentStep?.questions?.find(q => q.id === questionId);
    const selectedOption = question?.options?.find(o => o.value === answer);
    
    if (selectedOption?.nextStep) {
      // Delay navigation slightly for animation
      setTimeout(() => {
        setCurrentStepId(selectedOption.nextStep!);
      }, 300);
    }
  };
  
  const handleNext = () => {
    if (currentStep?.nextStep) {
      setCurrentStepId(currentStep.nextStep);
    }
  };
  
  const handleRestart = () => {
    setCurrentStepId('opening');
    setAnswers({});
    setCallStarted(false);
  };
  
  const qualified = isQualified(answers);
  
  if (!callStarted) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated gradient background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/wbyCIPSlnMREuEVSzY6GcU/sandbox/ArIUZUBejbhFB0idX7dKx8-img-1_1770319555000_na1fn_aGVyby1ncmFkaWVudC1iZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvd2J5Q0lQU2xuTVJFdUVWU3pZNkdjVS9zYW5kYm94L0FySVVaVUJlamJoRkIwaWRYN2RLeDgtaW1nLTFfMTc3MDMxOTU1NTAwMF9uYTFmbl9hR1Z5YnkxbmNtRmthV1Z1ZEMxaVp3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=O3w3eJGfmzJL2lZ5N~9jOviNzDD7f9o3PuSlP6~iAhhwSDOnWzG6YUuJK-Ouq1tQqy10a1iiuHdgsP~5QdTDJ2mHdOg57qo46uLQxBwGrzZtQXEPdx0ZmuXpkjG2KHHhuK95POCRty-flsSvAVAWotH2nOsgBO5LmVjF2Cb-zHXVOZJUH0lXdW18F0f~2tUh50bJhIpzWOC-2U4d5u-TyQZ7m~NKvm7sqbz4nVcKZoKq38qjBtzU-h56mrS6Ye27YlcN2kr5nvBub9gmsmGHwotVG5cgh~VDdtYEGPRRNvFlDuszJ7P0Yq9ENBS09gCCydbjQDgsvytmNea99tQiMg__')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80 z-0" />
        
        {/* Content */}
        <div className="relative z-10 container min-h-screen flex flex-col items-center justify-center py-12">
          <motion.div
            className="max-w-3xl w-full text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20
            }}
          >
            <motion.div
              className="inline-block mb-6"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Zap className="w-20 h-20 text-primary" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-['Outfit']">
              <span className="gradient-text">TURBO</span>
              <br />
              <span className="text-foreground">Sales Call Guide</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Your step-by-step companion for founder-to-founder sales calls.
              Navigate discovery, qualification, and objection handling with confidence.
            </p>
            
            <div className="glass-card rounded-2xl p-8 mb-8 text-left">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                What This Guide Covers
              </h3>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Opening:</strong> Binary question to surface pain immediately</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Problem Install:</strong> Quantify the "Invisible Tax" with real numbers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Qualification:</strong> Hard gates to identify true fit</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Urgency Check:</strong> Separate real buyers from curious browsers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>The Offer:</strong> Founders Circle with Double-Win Guarantee</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Objection Handling:</strong> Diagnose and respond to trust, timing, or money concerns</span>
                </li>
              </ul>
            </div>
            
            <Button
              size="lg"
              className="text-lg px-8 py-6 font-semibold group relative overflow-hidden"
              onClick={() => setCallStarted(true)}
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Sales Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              />
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }
  
  if (!currentStep) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">Error: Step not found</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container max-w-4xl">
        {/* Header with restart button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold gradient-text font-['Outfit']">
              TURBO Sales Guide
            </h1>
            <p className="text-sm text-muted-foreground mt-1 font-mono">
              Founder-to-Founder | 15-20 minutes
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRestart}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Restart
          </Button>
        </div>
        
        {/* Progress indicator */}
        <ProgressIndicator
          currentStep={currentStepIndex + 1}
          totalSteps={totalSteps}
          stepTitle={currentStep.title}
        />
        
        {/* Main step card */}
        <AnimatePresence mode="wait">
          <StepCard key={currentStep.id}>
            <StepHeader
              title={currentStep.title}
              subtitle={currentStep.subtitle}
              icon={stepIcons[currentStep.type]}
            />
            
            <StepContent content={currentStep.content} />
            
            {currentStep.scriptLines && currentStep.scriptLines.length > 0 && (
              <ScriptBox lines={currentStep.scriptLines} />
            )}
            
            {currentStep.questions && currentStep.questions.length > 0 && (
              <div className="mb-6">
                {currentStep.questions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    onAnswer={handleAnswer}
                    currentAnswer={answers[question.id]}
                  />
                ))}
              </div>
            )}
            
            {currentStep.tips && currentStep.tips.length > 0 && (
              <TipsBox tips={currentStep.tips} />
            )}
            
            {/* Navigation buttons */}
            {currentStep.nextStep && (!currentStep.questions || (currentStep.questions && currentStep.questions.every(q => answers[q.id]))) && (
              <motion.div
                className="mt-8 flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  size="lg"
                  onClick={handleNext}
                  className="gap-2 group"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            )}
            
            {/* Qualification status indicator */}
            {currentStep.id === 'urgency' && answers['urgency-q1'] && (
              <motion.div
                className={`mt-6 p-4 rounded-xl border ${
                  qualified
                    ? 'bg-accent/10 border-accent/30 text-accent'
                    : 'bg-destructive/10 border-destructive/30 text-destructive'
                }`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20
                }}
              >
                <div className="flex items-center gap-3">
                  {qualified ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <XCircle className="w-6 h-6" />
                  )}
                  <div>
                    <p className="font-semibold">
                      {qualified ? 'Strong Fit Detected' : 'Qualification Status'}
                    </p>
                    <p className="text-sm opacity-90">
                      {qualified
                        ? 'This prospect meets all qualification criteria. Proceed with confidence.'
                        : 'Review answers to assess fit before moving forward.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </StepCard>
        </AnimatePresence>
      </div>
    </div>
  );
}
