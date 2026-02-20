import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Mic,
  MicOff,
  Monitor,
  Check,
  XCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { useCallListening } from '@/hooks/useCallListening';
import { trpc } from '@/lib/trpc';
import type { Question } from '@/lib/salesFlow';

export interface AnswerSuggestion {
  questionId: string;
  answer: string;
  confidence: 'high' | 'medium';
  evidence: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface CallListeningPanelProps {
  questions: Question[];
  currentStepId: string;
  answers: Record<string, string>;
  onAcceptSuggestion: (questionId: string, answer: string) => void;
}

export default function CallListeningPanel({
  questions,
  currentStepId,
  answers,
  onAcceptSuggestion,
}: CallListeningPanelProps) {
  const {
    isListening,
    isSupported,
    isSystemAudioSupported,
    audioSource,
    setAudioSource,
    transcript,
    interimText,
    startListening,
    stopListening,
    clearTranscript,
    getAndClearAudioChunk,
    hasAudioChunk,
  } = useCallListening();

  const [suggestions, setSuggestions] = useState<AnswerSuggestion[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const lastExtractedRef = useRef<string>('');
  const extractTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const extractMutation = trpc.salesCoach.extractAnswersFromTranscript.useMutation();
  const transcribeAndExtractMutation = trpc.salesCoach.transcribeAndExtract.useMutation();

  const isAnalyzing = extractMutation.isPending || transcribeAndExtractMutation.isPending;

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptEndRef.current && showTranscript) {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcript, interimText, showTranscript]);

  // Clear suggestions when step changes
  useEffect(() => {
    setSuggestions([]);
    lastExtractedRef.current = '';
  }, [currentStepId]);

  // Helper to merge new suggestions into state
  const mergeSuggestions = useCallback((newSuggestions: Array<{ questionId: string; answer: string; confidence: string; evidence: string }>) => {
    if (newSuggestions.length === 0) return;
    setSuggestions(prev => {
      const updated = [...prev];
      for (const s of newSuggestions) {
        const existingIndex = updated.findIndex(es => es.questionId === s.questionId);
        if (existingIndex >= 0) {
          if (updated[existingIndex].status === 'pending') {
            updated[existingIndex] = { ...s, confidence: s.confidence as 'high' | 'medium', status: 'pending' };
          }
        } else {
          updated.push({ ...s, confidence: s.confidence as 'high' | 'medium', status: 'pending' });
        }
      }
      return updated;
    });
  }, []);

  // ─── Mic mode: extract from text transcript (debounced) ───
  useEffect(() => {
    if (!isListening || audioSource !== 'mic' || transcript.length === 0) return;

    const currentText = transcript.map(s => s.text).join('. ');
    if (currentText.length - lastExtractedRef.current.length < 20) return;

    if (extractTimerRef.current) {
      clearTimeout(extractTimerRef.current);
    }

    extractTimerRef.current = setTimeout(() => {
      const unansweredQuestions = questions.filter(q => !answers[q.id]);
      if (unansweredQuestions.length === 0) return;

      lastExtractedRef.current = currentText;

      extractMutation.mutate(
        {
          transcript: currentText,
          questions: unansweredQuestions.map(q => ({
            id: q.id,
            text: q.text,
            type: q.type,
            options: q.options?.map(o => ({ value: o.value, label: o.label })),
          })),
          existingAnswers: answers,
        },
        {
          onSuccess: (data) => mergeSuggestions(data.suggestions),
        }
      );
    }, 3000);

    return () => {
      if (extractTimerRef.current) {
        clearTimeout(extractTimerRef.current);
      }
    };
  }, [transcript.length, isListening, audioSource]);

  // ─── System audio mode: send audio chunks for transcription ───
  useEffect(() => {
    if (!isListening || audioSource !== 'system') {
      if (audioTimerRef.current) {
        clearInterval(audioTimerRef.current);
        audioTimerRef.current = null;
      }
      return;
    }

    // Poll for audio chunks every 12 seconds
    audioTimerRef.current = setInterval(async () => {
      if (transcribeAndExtractMutation.isPending) return;

      const blob = await getAndClearAudioChunk();
      if (!blob || blob.size < 1000) return; // Skip tiny chunks

      const unansweredQuestions = questions.filter(q => !answers[q.id]);
      if (unansweredQuestions.length === 0) return;

      // Convert blob to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        if (!base64) return;

        transcribeAndExtractMutation.mutate(
          {
            audioBase64: base64,
            mimeType: 'audio/webm',
            questions: unansweredQuestions.map(q => ({
              id: q.id,
              text: q.text,
              type: q.type,
              options: q.options?.map(o => ({ value: o.value, label: o.label })),
            })),
            existingAnswers: answers,
          },
          {
            onSuccess: (data) => {
              // Add transcribed text to transcript display
              if (data.transcript) {
                // We don't have direct access to setTranscript, so we show it as interim
              }
              mergeSuggestions(data.suggestions);
            },
          }
        );
      };
      reader.readAsDataURL(blob);
    }, 12000);

    return () => {
      if (audioTimerRef.current) {
        clearInterval(audioTimerRef.current);
        audioTimerRef.current = null;
      }
    };
  }, [isListening, audioSource, questions, answers]);

  const handleAccept = (suggestion: AnswerSuggestion) => {
    onAcceptSuggestion(suggestion.questionId, suggestion.answer);
    setSuggestions(prev =>
      prev.map(s =>
        s.questionId === suggestion.questionId
          ? { ...s, status: 'accepted' }
          : s
      )
    );
  };

  const handleReject = (questionId: string) => {
    setSuggestions(prev =>
      prev.map(s =>
        s.questionId === questionId ? { ...s, status: 'rejected' } : s
      )
    );
  };

  const pendingSuggestions = suggestions.filter(s => s.status === 'pending');
  const getQuestionText = (questionId: string) => {
    return questions.find(q => q.id === questionId)?.text || questionId;
  };

  if (!isSupported && !isSystemAudioSupported) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-4 left-4 z-50 w-80 max-w-[calc(100vw-2rem)]"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="glass-card rounded-2xl shadow-2xl overflow-hidden border border-border/50">
        {/* Header - always visible */}
        <div
          className="p-3 flex items-center justify-between cursor-pointer select-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
              isListening
                ? 'bg-red-500/20'
                : 'bg-muted'
            }`}>
              {isListening ? (
                <>
                  {audioSource === 'system' ? (
                    <Monitor className="w-4 h-4 text-red-500" />
                  ) : (
                    <Mic className="w-4 h-4 text-red-500" />
                  )}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-red-500/50"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </>
              ) : (
                <MicOff className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-tight">
                Call Listening
              </p>
              <p className="text-xs text-muted-foreground">
                {isListening
                  ? audioSource === 'system'
                    ? 'Capturing Zoom audio...'
                    : 'Listening (mic)...'
                  : 'Paused'}
                {pendingSuggestions.length > 0 && (
                  <span className="text-primary font-medium ml-1">
                    ({pendingSuggestions.length} suggestion{pendingSuggestions.length !== 1 ? 's' : ''})
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Audio source toggle */}
              {!isListening && isSystemAudioSupported && (
                <div className="px-3 pb-2">
                  <div className="flex rounded-lg border border-border overflow-hidden text-xs">
                    <button
                      onClick={(e) => { e.stopPropagation(); setAudioSource('mic'); }}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 transition-colors ${
                        audioSource === 'mic'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Mic className="w-3 h-3" />
                      My Mic
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setAudioSource('system'); }}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 transition-colors ${
                        audioSource === 'system'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Monitor className="w-3 h-3" />
                      Zoom Audio
                    </button>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="px-3 pb-3 flex gap-2">
                {!isListening ? (
                  <Button
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); startListening(); }}
                    className="flex-1 gap-1.5 bg-red-500 hover:bg-red-600 text-white"
                  >
                    {audioSource === 'system' ? (
                      <Monitor className="w-3.5 h-3.5" />
                    ) : (
                      <Mic className="w-3.5 h-3.5" />
                    )}
                    {audioSource === 'system' ? 'Capture Zoom Audio' : 'Start Listening'}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => { e.stopPropagation(); stopListening(); }}
                    className="flex-1 gap-1.5"
                  >
                    <MicOff className="w-3.5 h-3.5" />
                    Stop
                  </Button>
                )}
                {transcript.length > 0 && audioSource === 'mic' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTranscript(!showTranscript);
                    }}
                    className="text-xs"
                  >
                    {showTranscript ? 'Hide' : 'Show'} Transcript
                  </Button>
                )}
              </div>

              {/* Live transcript (collapsible) - mic mode only */}
              <AnimatePresence>
                {showTranscript && transcript.length > 0 && audioSource === 'mic' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-3 pb-3"
                  >
                    <div className="bg-background/50 rounded-lg p-2 max-h-32 overflow-y-auto text-xs text-muted-foreground space-y-1 border border-border/30">
                      {transcript.map(seg => (
                        <p key={seg.id}>{seg.text}</p>
                      ))}
                      {interimText && (
                        <p className="text-foreground/50 italic">{interimText}</p>
                      )}
                      <div ref={transcriptEndRef} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Analyzing indicator */}
              {isAnalyzing && (
                <div className="px-3 pb-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    {audioSource === 'system' ? 'Transcribing & analyzing...' : 'Analyzing conversation...'}
                  </div>
                </div>
              )}

              {/* System audio active indicator */}
              {isListening && audioSource === 'system' && !isAnalyzing && (
                <div className="px-3 pb-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-red-500"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    Recording Zoom audio — answers will appear automatically
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {pendingSuggestions.length > 0 && (
                <div className="px-3 pb-3 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <Sparkles className="w-3.5 h-3.5" />
                    Auto-detected answers
                  </div>
                  {pendingSuggestions.map(suggestion => (
                    <motion.div
                      key={suggestion.questionId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-primary/5 border border-primary/20 rounded-lg p-2.5"
                    >
                      <p className="text-xs text-muted-foreground mb-1 line-clamp-1">
                        {getQuestionText(suggestion.questionId)}
                      </p>
                      <p className="text-sm font-medium text-foreground mb-1.5 line-clamp-2">
                        "{suggestion.answer}"
                      </p>
                      {suggestion.evidence && (
                        <p className="text-xs text-muted-foreground/70 italic mb-2 line-clamp-1">
                          Heard: "{suggestion.evidence}"
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                          suggestion.confidence === 'high'
                            ? 'bg-green-500/10 text-green-600'
                            : 'bg-amber-500/10 text-amber-600'
                        }`}>
                          {suggestion.confidence}
                        </span>
                        <div className="flex gap-1 ml-auto">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleReject(suggestion.questionId)}
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAccept(suggestion)}
                            className="h-7 gap-1 px-2 text-xs"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Fill
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Status: all questions answered */}
              {isListening && questions.length > 0 && questions.every(q => q.optional || answers[q.id]) && pendingSuggestions.length === 0 && (
                <div className="px-3 pb-3">
                  <div className="flex items-center gap-2 text-xs text-green-600 bg-green-500/10 rounded-lg px-2.5 py-1.5">
                    <Check className="w-3.5 h-3.5" />
                    All questions answered for this step
                  </div>
                </div>
              )}

              {/* Help text when not listening */}
              {!isListening && (
                <div className="px-3 pb-3">
                  <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-2.5 py-2">
                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>
                      {audioSource === 'system' ? (
                        <>
                          Click "Capture Zoom Audio" and share your Zoom window.
                          <strong className="block mt-1">Make sure to check "Share audio"</strong> in the browser's share dialog.
                        </>
                      ) : (
                        <>
                          Click "Start Listening" to transcribe via your mic.
                          Switch to <strong>Zoom Audio</strong> to capture what the prospect says on the call.
                        </>
                      )}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
