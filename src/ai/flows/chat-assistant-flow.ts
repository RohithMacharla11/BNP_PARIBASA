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
  scamWarning: z.string().nullable().optional().describe('A warning message if the AI detects potential scam or suspicious activity.'),
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
  outputSchema: z.string().nullable().describe('A warning message if a scam is detected, otherwise null.'),
},
async (input) => {
    const response = await ai.generate({
      prompt: `Analyze the following query for potential scams: "${input.query}". If you detect a scam, provide a concise warning message. If not, return null.`,
      output: {
        format: 'json',
        schema: z.object({
          warning: z.string().nullable(),
        }),
      },
      model: 'googleai/gemini-2.5-flash'
    });
    
    return response.output?.warning ?? null;
  }
);

const chatAssistantPrompt = ai.definePrompt({
  name: 'chatAssistantPrompt',
  input: {schema: ChatAssistantInputSchema},
  output: {schema: ChatAssistantOutputSchema},
  tools: [detectScamTool],
  prompt: `You are a helpful AI Chat Assistant for a digital banking application. Answer user queries related to banking and provide helpful financial advice.

  Use the detectScam tool to check for scams in the user query. If the tool returns a warning, you MUST include that exact warning in the 'scamWarning' field of your response.

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
