'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, RefreshCw } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { getCreditScoreAdvice } from '@/ai/flows/credit-score-flow';

const FAKE_CREDIT_SCORE = 720;

export function CreditScore() {
  const [advice, setAdvice] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleGetAdvice = () => {
    startTransition(async () => {
      try {
        const result = await getCreditScoreAdvice({ creditScore: FAKE_CREDIT_SCORE });
        setAdvice(result.advice);
      } catch (error) {
        console.error('Error getting credit score advice:', error);
        setAdvice(["Sorry, we couldn't fetch advice right now. Please try again later."]);
      }
    });
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Credit Score</CardTitle>
          <CardDescription>A snapshot of your financial health.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="relative h-48 w-48">
                <svg className="absolute inset-0" viewBox="0 0 120 120">
                    <circle
                    className="text-muted"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="50"
                    cx="60"
                    cy="60"
                    />
                    <motion.circle
                    className="text-primary"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 50}
                    strokeDashoffset={2 * Math.PI * 50 * (1 - (FAKE_CREDIT_SCORE - 300) / (850 - 300))}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="50"
                    cx="60"
                    cy="60"
                    transform="rotate(-90 60 60)"
                    initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - (FAKE_CREDIT_SCORE - 300) / (850 - 300)) }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-primary">{FAKE_CREDIT_SCORE}</span>
                    <span className="text-sm text-muted-foreground">Very Good</span>
                </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
                Your credit score is a key factor in financial decisions. A higher score can lead to better loan rates and more opportunities.
            </p>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-4">
            <Button onClick={handleGetAdvice} disabled={isPending} className="w-full">
                {isPending ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <TrendingUp className="mr-2 h-4 w-4" />}
                {isPending ? 'Getting Advice...' : 'Get AI Tips to Improve'}
            </Button>
            {advice.length > 0 && (
                 <Card className="bg-muted/50">
                    <CardHeader>
                        <CardTitle className="text-lg">Personalized Advice</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 list-disc pl-5">
                           <AnimatePresence>
                            {advice.map((tip, index) => (
                                <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                {tip}
                                </motion.li>
                            ))}
                           </AnimatePresence>
                        </ul>
                    </CardContent>
                </Card>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
