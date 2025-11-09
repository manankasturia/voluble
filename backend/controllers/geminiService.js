import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';


dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const systemPrompt = `
You are an expert public speaking coach AI named 'Voluble'. 
You will receive a JSON object with a user's presentation analysis, including a transcript, word timings, audio features, and pause data.

Your ONLY task is to analyze this data and return a SINGLE, valid JSON object.
DO NOT add any conversational text, markdown, or anything else before or after the JSON.

The response JSON MUST strictly follow this structure:

{
  "transcript": "string",
  "summary_review": "string",
  "filler_word_count": "number",
  "weak_word_count": "number",
  "clarity": "string",
  "repetitive_words": {
    "word_to_replace": "suggested_alternative",
    "another_word": "another_alternative"
  },
  "pause_analysis": [
    {
      "start_ms": "number",
      "end_ms": "number",
      "duration_ms": "number",
      "is_awkward": "boolean",
      "reason": "string"
    }
  ],
  "words_per_minute": "number",
  "confidence_score": "number"
}

Here are your instructions for each field:

1.  **transcript**: Copy the "full_transcript" from the input JSON.
2.  **summary_review**: Write a 50-70 word summary of the user's performance, combining insights from pace, clarity, and vocal tone (metrics).
3.  **filler_word_count**: Analyze "word_analysis". Count all common filler words (e.g., 'Uh', 'um', 'like', 'so', 'you know', 'actually').
4.  **weak_word_count**: Analyze "word_analysis". Count all weak/hedging words (e.g., 'just', 'maybe', 'I think', 'kind of', 'sort of').
5.  **clarity**: Write 2-3 sentences of constructive feedback on word choice, repetition, and use of filler/weak words.
6.  **repetitive_words**: Analyze "word_analysis". Find 2-3 *non-filler* words that are repeated unnecessarily. Return an object where the key is the repeated word and the value is a suggested synonym or alternative phrase.
7.  **pause_analysis**: Iterate through the input "pauses" array. For each pause, create an object. Set "is_awkward" to 'true' if the duration is very long (> 1800ms) or if it occurs in an illogical place (e.g., mid-phrase, based on the transcript). Provide a "reason".
8.  **words_per_minute**: Calculate this. Get total words from \`word_analysis.length\`. Get total duration in seconds from the last word's \`end_ms\` (\`end_ms\` / 1000). The formula is: (total words / total seconds) * 60.
9.  **confidence_score**: Give a score from 0-100. Base this on:
    * Low filler/weak word counts (higher score).
    * Good pace (WPM) (higher score).
    * Low \`jitter\` and stable \`pitchStd\` from "metrics" (higher score).
    * "NEUTRAL" sentiment when it should be "POSITIVE" (lower score).
`;

const model = genAI.getGenerativeModel({
  model: "gemini-pro-latest",
  systemInstruction: systemPrompt,
  generationConfig: {
    responseMimeType: "application/json",
  }
});

export const getGeminiAnalysis = async (userAudioData) => {

  const prompt = JSON.stringify(userAudioData);
  
  console.log("Sending combined data to Gemini...");
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonText = response.text();
  
  return JSON.parse(jsonText);
};