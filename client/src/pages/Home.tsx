/*
Design: Kinetic Energy Interface
- Hero section with animated gradient background
- Step-by-step flow with glassmorphic cards
- Spring physics animations throughout
*/

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { salesFlow, getStepById, isQualified, type StepType } from '@/lib/salesFlow';
import { saveCallToHistory, type CallRecord } from '@/lib/callHistory';
import { nanoid } from 'nanoid';
import { exportCallToPDF } from '@/lib/pdfExport';
import ProgressIndicator from '@/components/ProgressIndicator';
import StepCard, { StepHeader, StepContent, ScriptBox, TipsBox } from '@/components/StepCard';
import QuestionCard from '@/components/QuestionCard';
import PaymentLink from '@/components/PaymentLink';
import ImprovedObjectionHandler from '@/components/ImprovedObjectionHandler';
import ObjectionQuickAccess from '@/components/ObjectionQuickAccess';
import CostCalculator from '@/components/CostCalculator';
import AnswersSidebar from '@/components/AnswersSidebar';
import { SalesCoach } from '@/components/SalesCoach';
import { 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Lightbulb, 
  Gift, 
  Target, 
  Shield, 
  XCircle, 
  PartyPopper,
  RotateCcw,
  DollarSign,
  Clock,
  ArrowRight,
  BarChart3,
  FileDown
} from 'lucide-react';

const STORAGE_KEY = 'turbo-sales-call-data';

export default function Home() {
  // Load from localStorage on mount
  const loadFromStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
    return null;
  };

  const savedData = loadFromStorage();
  
  const [currentStepId, setCurrentStepId] = useState<string>(savedData?.currentStepId || 'frame-call');
  const [answers, setAnswers] = useState<Record<string, string>>(savedData?.answers || {});
  const [qualified, setQualified] = useState<boolean | null>(null);
  
  const currentStep = getStepById(currentStepId);
  
  const stepIcons: Record<StepType, React.ReactNode> = {
    'frame-call': <MessageSquare className="w-6 h-6" />,
    'problem-exposure': <AlertTriangle className="w-6 h-6" />,
    'alternative-solutions': <Shield className="w-6 h-6" />,
    'dream-outcome': <Lightbulb className="w-6 h-6" />,
    'price-anchor': <DollarSign className="w-6 h-6" />,
    'transition-demo': <ArrowRight className="w-6 h-6" />,
    'demo-ask-loop': <CheckCircle2 className="w-6 h-6" />,
    'impact-measurement': <BarChart3 className="w-6 h-6" />,
    'recap': <MessageSquare className="w-6 h-6" />,
    'availability-check': <Clock className="w-6 h-6" />,
    'the-offer': <Gift className="w-6 h-6" />,
    'close': <Target className="w-6 h-6" />,
    disqualify: <XCircle className="w-6 h-6" />,
    success: <PartyPopper className="w-6 h-6" />
  };
  
  const [callStarted, setCallStarted] = useState(savedData?.callStarted || false);
  const [prospectInfo, setProspectInfo] = useState(savedData?.prospectInfo || {
    name: '',
    company: '',
    email: ''
  });
  const currentStepIndex = salesFlow.findIndex(s => s.id === currentStepId);
  const totalSteps = salesFlow.length;
  
  // Save to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      currentStepId,
      answers,
      callStarted,
      prospectInfo,
      lastSaved: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, [currentStepId, answers, callStarted, prospectInfo]);
  
  useEffect(() => {
    // Scroll to top when step changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStepId]);
  
  const handleAnswer = (questionId: string, answer: string) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    
    // Find the question and check for next step override or disqualifying answer
    const question = currentStep?.questions?.find(q => q.id === questionId);
    const selectedOption = question?.options?.find(o => o.value === answer);
    
    if (selectedOption?.nextStep) {
      // Explicit next step override
      setTimeout(() => {
        setCurrentStepId(selectedOption.nextStep!);
      }, 300);
    } else if (selectedOption?.isDisqualifying) {
      // Auto-route to disqualify step for disqualifying answers
      setTimeout(() => {
        setCurrentStepId('disqualify');
      }, 500); // Slightly longer delay to show the selection
    }
  };
  
  const handleNext = () => {
    if (currentStep?.nextStep) {
      setCurrentStepId(currentStep.nextStep);
    }
  };
  
  const handleBack = () => {
    // Find the previous step in the flow
    const currentIndex = salesFlow.findIndex(s => s.id === currentStepId);
    if (currentIndex > 0) {
      setCurrentStepId(salesFlow[currentIndex - 1].id);
    }
  };
  
  const canGoBack = () => {
    const currentIndex = salesFlow.findIndex(s => s.id === currentStepId);
    // Can't go back from first step, disqualify, or success
    return currentIndex > 0 && currentStepId !== 'disqualify' && currentStepId !== 'success';
  };
  
  const handleRestart = () => {
    // Save to history before restarting if call was started
    if (callStarted && (prospectInfo.name || prospectInfo.company)) {
      const outcome = currentStepId === 'success' ? 'qualified' as const : 
                      currentStepId === 'disqualify' ? 'disqualified' as const : 
                      'in-progress' as const;
      
      // Calculate cost analysis if available
      let costAnalysis;
      const editors = answers['cost-editors'] ? parseInt(answers['cost-editors']) : null;
      const hoursPerWeek = answers['cost-hours'] === '3-5' ? 4 : 
                           answers['cost-hours'] === '6-10' ? 8 : 
                           answers['cost-hours'] === '10+' ? 12 : null;
      const ratePerHour = answers['cost-rate'] ? parseInt(answers['cost-rate']) : null;
      
      if (editors && hoursPerWeek && ratePerHour) {
        const annualCost = editors * hoursPerWeek * ratePerHour * 48;
        const monthlyCost = annualCost / 12;
        costAnalysis = {
          editors,
          hoursPerWeek,
          ratePerHour,
          annualCost,
          monthlyCost
        };
      }
      
      const callRecord: CallRecord = {
        id: nanoid(),
        timestamp: new Date().toISOString(),
        prospectInfo,
        outcome,
        finalStep: currentStepId,
        answers,
        costAnalysis
      };
      
      saveCallToHistory(callRecord);
    }
    
    setCurrentStepId('opening');
    setAnswers({});
    setCallStarted(false);
    setProspectInfo({ name: '', company: '', email: '' });
    // Clear localStorage
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  };
  
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
              className="inline-block mb-8"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <img 
                src="/turbo-logo.png" 
                alt="TURBO" 
                className="h-16 md:h-20 w-auto mx-auto"
              />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
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
            
            {/* Prospect Information Form */}
            <div className="glass-card rounded-2xl p-8 text-left">
              <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Prospect Information
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Capture basic details before starting the call
              </p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    placeholder="John Smith"
                    value={prospectInfo.name}
                    onChange={(e) => setProspectInfo({ ...prospectInfo, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Productions"
                    value={prospectInfo.company}
                    onChange={(e) => setProspectInfo({ ...prospectInfo, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@acme.com"
                    value={prospectInfo.email}
                    onChange={(e) => setProspectInfo({ ...prospectInfo, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              
              <Button
                size="lg"
                className="w-full text-lg py-6 font-semibold group relative overflow-hidden"
                onClick={() => setCallStarted(true)}
                disabled={!prospectInfo.name || !prospectInfo.company}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
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
              
              {(!prospectInfo.name || !prospectInfo.company) && (
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Name and Company are required to start
                </p>
              )}
            </div>
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
      {/* Floating objection quick access button */}
      <ObjectionQuickAccess />
      
      {/* Live notes with AI guidance */}
      <SalesCoach currentStep={currentStepId} answers={answers} />
      
      {/* Answers sidebar */}
      <AnswersSidebar answers={answers} prospectInfo={prospectInfo} />
      <div className="container max-w-4xl">
        {/* Header with restart button */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img 
              src="/turbo-logo.png" 
              alt="TURBO" 
              className="h-8 md:h-10 w-auto"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">
                Sales Guide
              </h1>
              <p className="text-xs text-muted-foreground">
                Founder-to-Founder | 15-20 minutes
              </p>
            </div>
            {savedData && savedData.lastSaved && (
              <p className="text-xs text-accent mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Resumed from {new Date(savedData.lastSaved).toLocaleTimeString()}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Analytics</span>
              </Button>
            </Link>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                // Determine outcome based on current step
                const outcome = currentStepId === 'success' ? 'qualified' as const : 
                                currentStepId === 'disqualify' ? 'disqualified' as const : 
                                'in-progress' as const;
                
                // Export PDF
                exportCallToPDF({
                  prospectInfo,
                  answers,
                  outcome
                });
                
                // Then restart
                setTimeout(() => handleRestart(), 500);
              }}
              className="gap-2"
            >
              <FileDown className="w-4 h-4" />
              <span className="hidden sm:inline">Close Call & Export</span>
              <span className="sm:hidden">Close</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRestart}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Restart</span>
            </Button>
          </div>
        </div>
        
        {/* Progress indicator */}
        <ProgressIndicator
          currentStep={currentStepIndex + 1}
          totalSteps={totalSteps}
          stepTitle={currentStep.title}
        />
        
        {/* Main step card - with special layout for impact-measurement */}
        <AnimatePresence mode="wait">
          {currentStep.id === 'impact-measurement' ? (
            // Special two-column layout for impact-measurement step
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Questions */}
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
                    className="mt-8 flex gap-3 justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {canGoBack() && (
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={handleBack}
                        className="gap-2"
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      size="lg"
                      onClick={handleNext}
                      className="gap-2 group ml-auto"
                    >
                      Continue
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                )}
              </StepCard>
              
              {/* Right: Sticky Calculator */}
              <div className="lg:sticky lg:top-6 lg:self-start">
                <CostCalculator
                  editors={answers['num-editors'] ? parseInt(answers['num-editors']) : undefined}
                  hoursPerWeek={answers['hours-saved'] ? parseInt(answers['hours-saved']) : undefined}
                  ratePerHour={answers['hourly-rate'] ? parseInt(answers['hourly-rate']) : undefined}
                />
              </div>
            </div>
          ) : (
            // Standard single-column layout for all other steps
            <StepCard key={currentStep.id}>
              <StepHeader
                title={currentStep.title}
                subtitle={currentStep.subtitle}
                icon={stepIcons[currentStep.type]}
              />
              
              <StepContent content={currentStep.content} />
              
              {/* Payment link for success step */}
              {currentStep.id === 'success' && (
                <PaymentLink url="https://pay.turbobroll.com/b/dRmaEZehHahQ4aFh268IU00" />
              )}
              
              {/* Objection handler for objection step */}
              {currentStep.id === 'objection' && (
                <ImprovedObjectionHandler />
              )}
              
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
              
              {/* Export PDF button for success/disqualify steps */}
              {(currentStep.id === 'success' || currentStep.id === 'disqualify') && (
                <motion.div
                  className="mt-6 flex justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => exportCallToPDF({
                      prospectInfo,
                      answers,
                      outcome: currentStep.id === 'success' ? 'qualified' : 'disqualified'
                    })}
                    className="gap-2 group"
                  >
                    <FileDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                    Export Call Summary (PDF)
                  </Button>
                </motion.div>
              )}
              
              {/* Navigation buttons */}
              {currentStep.nextStep && (!currentStep.questions || (currentStep.questions && currentStep.questions.every(q => answers[q.id]))) && (
                <motion.div
                  className="mt-8 flex gap-3 justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {canGoBack() && (
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={handleBack}
                      className="gap-2"
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    size="lg"
                    onClick={handleNext}
                    className="gap-2 group ml-auto"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              )}

            </StepCard>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
