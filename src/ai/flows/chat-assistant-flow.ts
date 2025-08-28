'use server';

/**
 * @fileOverview Implements the AI Chat Assistant flow with scam detection.
 *
 * - chatAssistant - A function that processes user queries and provides financial advice, including scam warnings.
 * - ChatAssistantInput - The input type for the chatAssistant function.
 * - ChatAssistantOutput - The return type for the chatAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatAssistantInputSchema = z.object({
  query: z.string().describe('The user query related to banking or financial advice.'),
});
export type ChatAssistantInput = z.infer<typeof ChatAssistantInputSchema>;

const ChatAssistantOutputSchema = z.object({
  response: z.string().describe('The AI-generated response to the user query.'),
  scamWarning: z
    .string()
    .nullable()
    .optional()
    .describe(
      'A concise warning message if the query seems related to a potential scam, otherwise null.'
    ),
});
export type ChatAssistantOutput = z.infer<typeof ChatAssistantOutputSchema>;

export async function chatAssistant(
  input: ChatAssistantInput
): Promise<ChatAssistantOutput> {
  return chatAssistantFlow(input);
}

const chatAssistantPrompt = ai.definePrompt({
  name: 'chatAssistantPrompt',
  input: {schema: ChatAssistantInputSchema},
  output: {schema: ChatAssistantOutputSchema},
  prompt: `You are a helpful AI Chat Assistant for a digital banking application. Your primary role is to answer user queries related to banking and provide helpful financial advice.

First, analyze the user's query for any signs of a potential scam (e.g., requests for personal information, urgent demands for money, suspicious links, lottery wins).

- If you detect a potential scam, set the 'scamWarning' field with a concise warning.
- Then, provide a helpful and safe response in the 'response' field, advising the user to be cautious without confirming any of the scam's details.
- If no scam is detected, set 'scamWarning' to null and answer the user's query as usual.

User Query: {{{query}}}`,
});

const chatAssistantFlow = ai.defineFlow(
  {
    name: 'chatAssistantFlow',
    inputSchema: ChatAssistantInputSchema,
    outputSchema: ChatAssistantOutputSchema,
  },
  async (input) => {
    const {output} = await chatAssistantPrompt(input);
    return output!;
  }
);
