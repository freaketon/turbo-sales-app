import { useState, useRef, useCallback, useEffect } from 'react';

export interface TranscriptSegment {
  id: string;
  text: string;
  timestamp: number;
  isFinal: boolean;
}

export type AudioSource = 'mic' | 'system';

interface UseCallListeningReturn {
  isListening: boolean;
  isSupported: boolean;
  isSystemAudioSupported: boolean;
  audioSource: AudioSource;
  setAudioSource: (source: AudioSource) => void;
  transcript: TranscriptSegment[];
  interimText: string;
  startListening: () => void;
  stopListening: () => void;
  clearTranscript: () => void;
  /** For system audio mode: returns pending audio blob for server transcription */
  getAndClearAudioChunk: () => Promise<Blob | null>;
  hasAudioChunk: boolean;
}

// Extend Window interface for SpeechRecognition
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function useCallListening(): UseCallListeningReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [interimText, setInterimText] = useState('');
  const [audioSource, setAudioSource] = useState<AudioSource>('mic');
  const [hasAudioChunk, setHasAudioChunk] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const isListeningRef = useRef(false);
  const segmentCounterRef = useRef(0);

  // System audio capture refs
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const chunkTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isSupported = typeof window !== 'undefined' && getSpeechRecognition() !== null;

  // getDisplayMedia with audio is supported in most modern browsers
  const isSystemAudioSupported = typeof window !== 'undefined' &&
    !!navigator.mediaDevices?.getDisplayMedia;

  // ─── Mic mode: Web Speech API ─────────────────────────────

  const startMicListening = useCallback(() => {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) return;

    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.abort();
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      isListeningRef.current = true;
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0].transcript;

        if (result.isFinal) {
          const segment: TranscriptSegment = {
            id: `seg-${++segmentCounterRef.current}`,
            text: text.trim(),
            timestamp: Date.now(),
            isFinal: true,
          };
          setTranscript(prev => [...prev, segment]);
          setInterimText('');
        } else {
          interim += text;
        }
      }

      if (interim) {
        setInterimText(interim);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech' || event.error === 'aborted') {
        return;
      }
      setIsListening(false);
      isListeningRef.current = false;
    };

    recognition.onend = () => {
      if (isListeningRef.current) {
        try {
          recognition.start();
        } catch {
          setIsListening(false);
          isListeningRef.current = false;
        }
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch {
      console.error('Failed to start speech recognition');
    }
  }, []);

  // ─── System audio mode: getDisplayMedia + MediaRecorder ───

  const startSystemAudioListening = useCallback(async () => {
    try {
      // Request screen/window share WITH audio
      // The user will select their Zoom window or the entire screen
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true, // Required by the API, but we only use audio
        audio: true, // This captures system/app audio
      });

      // Check if we got audio tracks
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length === 0) {
        console.error('No audio track captured. Make sure to check "Share audio" in the dialog.');
        stream.getTracks().forEach(t => t.stop());
        return;
      }

      // Stop video tracks immediately - we only need audio
      stream.getVideoTracks().forEach(t => t.stop());

      // Create audio-only stream
      const audioStream = new MediaStream(audioTracks);
      mediaStreamRef.current = audioStream;

      // Set up MediaRecorder to capture audio chunks
      const recorder = new MediaRecorder(audioStream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : 'audio/webm',
      });

      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          setHasAudioChunk(true);
        }
      };

      // When the user stops sharing (clicks "Stop sharing" in browser)
      audioTracks[0].onended = () => {
        stopListening();
      };

      recorder.start();
      mediaRecorderRef.current = recorder;

      // Collect a chunk every 10 seconds for periodic transcription
      chunkTimerRef.current = setInterval(() => {
        if (recorder.state === 'recording') {
          recorder.requestData();
        }
      }, 10000);

      setIsListening(true);
      isListeningRef.current = true;
      setInterimText('Capturing Zoom audio...');
    } catch (err) {
      console.error('Failed to capture system audio:', err);
    }
  }, []);

  // ─── Public API ───────────────────────────────────────────

  const startListening = useCallback(() => {
    if (audioSource === 'system') {
      startSystemAudioListening();
    } else {
      startMicListening();
    }
  }, [audioSource, startMicListening, startSystemAudioListening]);

  const stopListening = useCallback(() => {
    isListeningRef.current = false;

    // Stop mic mode
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    // Stop system audio mode
    if (chunkTimerRef.current) {
      clearInterval(chunkTimerRef.current);
      chunkTimerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.requestData(); // Get final chunk
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }

    setIsListening(false);
    setInterimText('');
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscript([]);
    setInterimText('');
    segmentCounterRef.current = 0;
    audioChunksRef.current = [];
    setHasAudioChunk(false);
  }, []);

  /** Collect accumulated audio chunks as a single blob for server-side transcription */
  const getAndClearAudioChunk = useCallback(async (): Promise<Blob | null> => {
    if (audioChunksRef.current.length === 0) return null;

    const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    audioChunksRef.current = [];
    setHasAudioChunk(false);
    return blob;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isListeningRef.current = false;
      if (recognitionRef.current) {
        recognitionRef.current.onend = null;
        recognitionRef.current.abort();
      }
      if (chunkTimerRef.current) {
        clearInterval(chunkTimerRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  return {
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
  };
}
