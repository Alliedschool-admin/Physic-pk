import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, ChatMessage } from "../types";

const API_KEY = process.env.API_KEY || '';

// Initialize AI client
// Note: We create a function to get the client to handle potential key updates if the app expanded,
// but strictly following the rule: we assume process.env.API_KEY is valid.
const getAiClient = () => new GoogleGenAI({ apiKey: API_KEY });

export const generateTutorResponse = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    const ai = getAiClient();
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are a friendly and encouraging Physics Tutor for Pakistani Intermediate (FSc) students. 
        Your goal is to help them understand concepts from the Physics Book I and II (Punjab/Federal Board).
        
        Guidelines:
        1. Use simple English.
        2. You can use relevant local examples (e.g., cricket, traffic in Lahore/Karachi) to explain physics concepts.
        3. If a student asks in Roman Urdu, reply in a mix of English and simple explanations.
        4. Focus on conceptual clarity.
        5. Be concise.
        
        Topics likely to be discussed: Vectors, Equilibrium, Force and Motion, Work and Energy, Circular Motion.`,
      },
    });

    // Hydrate history - note: API history format is slightly different, but for this simple app
    // we will just send the new message with the context of the system instruction.
    // For a full chat app, we'd map the history. Here we treat it as a single turn or maintain state in the component.
    // To keep it simple and robust, we will just send the message.
    
    const result = await chat.sendMessage({
      message: newMessage
    });

    return result.text || "I'm sorry, I couldn't generate an explanation right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I'm having trouble connecting to the Physics Lab server. Please check your connection.";
  }
};

export const generateQuiz = async (topic: string): Promise<QuizQuestion[]> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate 5 multiple choice questions (MCQs) about "${topic}" suitable for Pakistani FSc Part 1 Physics students.
      Include difficult conceptual questions.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswer: { type: Type.INTEGER, description: "Index of the correct option (0-3)" },
              explanation: { type: Type.STRING, description: "Short explanation of why the answer is correct" }
            },
            required: ["question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as QuizQuestion[];
    }
    return [];
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    return [];
  }
};
