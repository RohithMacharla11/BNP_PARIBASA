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
  scamWarning: z.string().optional().describe('A warning message if the AI detects potential scam or suspicious activity.'),
});
export type ChatAssistantOutput = z.infer<typeof ChatAssistantOutputSchema>;

export async function chatAssistant(input: ChatAssistantInput): Promise<ChatAssistantOutput> {
  return chatAssistantFlow(input);
}

const detectScamTool = ai.defineTool({
  name: 'detectScam',
  description: 'Detects potential scams or suspicious activity in the user query.',
  inputSchema: z.object({
    query: z.string().describe('The user query to analyze for scams.'),
  }),
  outputSchema: z.string().optional().describe('A warning message if a scam is detected, otherwise undefined.'),
},
async (input) => {
    if (input.query.toLowerCase().includes('potential scam')) {
      return 'Warning: This query may be related to a potential scam. Please be cautious and verify the information.';
    }
    return undefined;
  }
);

const chatAssistantPrompt = ai.definePrompt({
  name: 'chatAssistantPrompt',
  input: {schema: ChatAssistantInputSchema},
  output: {schema: ChatAssistantOutputSchema},
  tools: [detectScamTool],
  prompt: `You are a helpful AI Chat Assistant for a digital banking application. Answer user queries related to banking and provide helpful financial advice.

  If the detectScam tool returns a scam warning, include it in your response.  If a scam is detected, you MUST include the scam warning.

  User Query: {{{query}}}`,
});

const chatAssistantFlow = ai.defineFlow(
  {
    name: 'chatAssistantFlow',
    inputSchema: ChatAssistantInputSchema,
    outputSchema: ChatAssistantOutputSchema,
  },
  async input => {
    const {output} = await chatAssistantPrompt(input);
    return output!;
  }
);
