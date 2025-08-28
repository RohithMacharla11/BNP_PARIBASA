'use server';

/**
 * @fileOverview Provides AI-powered advice to improve a user's credit score.
 *
 * - getCreditScoreAdvice - A function that returns personalized tips based on a credit score.
 * - CreditScoreAdviceInput - The input type for the getCreditScoreAdvice function.
 * - CreditScoreAdviceOutput - The return type for the getCreditScoreAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreditScoreAdviceInputSchema = z.object({
  creditScore: z.number().min(300).max(850).describe('The user\'s current credit score.'),
});
export type CreditScoreAdviceInput = z.infer<typeof CreditScoreAdviceInputSchema>;

const CreditScoreAdviceOutputSchema = z.object({
  advice: z.array(z.string()).describe('A list of personalized, actionable tips to improve the credit score.'),
});
export type CreditScoreAdviceOutput = z.infer<typeof CreditScoreAdviceOutputSchema>;

export async function getCreditScoreAdvice(input: CreditScoreAdviceInput): Promise<CreditScoreAdviceOutput> {
  return creditScoreFlow(input);
}

const creditScorePrompt = ai.definePrompt({
  name: 'creditScorePrompt',
  input: {schema: CreditScoreAdviceInputSchema},
  output: {schema: CreditScoreAdviceOutputSchema},
  prompt: `You are an expert financial advisor specializing in credit health.
  
  A user has a credit score of {{{creditScore}}}.
  
  Based on this score, provide 3-4 concise, actionable, and personalized tips to help them improve it.
  Focus on common factors like payment history, credit utilization, credit history length, and credit mix.
  
  For example, if the score is low, suggest making on-time payments. If it's good but not excellent, suggest reducing credit card balances.`,
});

const creditScoreFlow = ai.defineFlow(
  {
    name: 'creditScoreFlow',
    inputSchema: CreditScoreAdviceInputSchema,
    outputSchema: CreditScoreAdviceOutputSchema,
  },
  async input => {
    const {output} = await creditScorePrompt(input);
    return output!;
  }
);
