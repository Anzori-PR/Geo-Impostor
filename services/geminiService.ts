
import { GoogleGenAI, Type } from "@google/genai";
import { WordItem } from '../types';

const apiKey = process.env.API_KEY || '';
let aiClient: GoogleGenAI | null = null;

// Lazy initialization
const getAiClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const generateGameWords = async (topic: string): Promise<WordItem[]> => {
  try {
    if (!apiKey) {
      console.warn("No API Key provided for Gemini");
      // Fallback mock data with hints
      return [
        { word: "AI-სიტყვა1", hint: "მაგალითი 1" },
        { word: "AI-სიტყვა2", hint: "მაგალითი 2" },
        { word: "AI-სიტყვა3", hint: "მაგალითი 3" },
        { word: "AI-სიტყვა4", hint: "მაგალითი 4" },
        { word: "AI-სიტყვა5", hint: "მაგალითი 5" }
      ];
    }

    const ai = getAiClient();
    
    const prompt = `Generate a list of 10 single nouns in Georgian language related to the topic: "${topic}". 
    Do not translate the topic, use it as a theme. 
    For each word, also provide a "hint" in Georgian. The hint should be a generalized category or hypernym for that word (e.g. if the word is "Apple", the hint should be "Fruit"; if "Einstein", hint "Scientist").
    The words should be suitable for a 'Guess the Word' or 'Spyfall' style party game.
    Return ONLY the JSON array of objects.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING },
              hint: { type: Type.STRING }
            }
          }
        }
      }
    });

    if (response.text) {
        const words = JSON.parse(response.text);
        return Array.isArray(words) ? words : [];
    }
    return [];

  } catch (error) {
    console.error("Error generating words with Gemini:", error);
    return [];
  }
};
