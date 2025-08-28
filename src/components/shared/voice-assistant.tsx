'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Bot } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { voiceAssistant, VoiceAssistantOutput } from '@/ai/flows/voice-assistant-flow';

export function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState<VoiceAssistantOutput | null>(null);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check for SpeechRecognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('');
        setTranscript(currentTranscript);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (transcript.trim()) {
            setIsProcessing(true);
            voiceAssistant({ query: transcript })
                .then(res => {
                    setResponse(res);
                    if(res.audioResponse) {
                        const audio = new Audio(res.audioResponse);
                        audioRef.current = audio;
                        audio.play();
                    }
                })
                .catch(err => {
                    console.error("Error with voice assistant:", err);
                    setError("Sorry, I couldn't process that. Please try again.");
                })
                .finally(() => setIsProcessing(false));
        }
      };
      
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setError(`Speech recognition error: ${event.error}. Please ensure microphone access is granted.`);
        setIsListening(false);
      };

    } else {
      setError('Speech recognition not supported in this browser.');
    }

    return () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
    }
  }, [transcript]);

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      setResponse(null);
      setError('');
      recognitionRef.current?.start();
    }
    setIsListening(!isListening);
  };
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
      if(audioRef.current) {
        audioRef.current.pause();
      }
      setIsListening(false);
    }
    setIsOpen(open);
  }

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => handleOpenChange(true)}>
        <Mic className="h-5 w-5" />
        <span className="sr-only">Voice Assistant</span>
      </Button>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Bot /> Voice Assistant</DialogTitle>
            <DialogDescription>
              Ask me anything about your finances or perform actions.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
            <motion.div
                animate={{ scale: isListening ? 1.2 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <Button
                size="icon"
                className="w-20 h-20 rounded-full"
                onClick={toggleListen}
                variant={isListening ? 'destructive' : 'default'}
              >
                {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
              </Button>
            </motion.div>
            <div className="text-center h-16">
                <AnimatePresence mode="wait">
                {isProcessing ? (
                     <motion.p key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Thinking...
                     </motion.p>
                ) : error ? (
                    <motion.p key="error" className="text-destructive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {error}
                    </motion.p>
                ) : response ? (
                    <motion.p key="response" className="font-semibold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {response.textResponse}
                    </motion.p>
                ) : transcript ? (
                    <motion.p key="transcript" className="text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        "{transcript}"
                    </motion.p>
                ) : (
                    <motion.p key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Click the mic and start speaking.
                    </motion.p>
                )}
                </AnimatePresence>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
