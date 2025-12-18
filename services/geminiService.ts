import { GoogleGenAI } from "@google/genai";
import { ArtStyle, AspectRatio } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to clean base64 string
const cleanBase64 = (base64: string) => {
  return base64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");
};

// Helper to determine mime type from base64 header
const getMimeType = (base64: string) => {
  const match = base64.match(/^data:(image\/[a-zA-Z+]+);base64,/);
  return match ? match[1] : 'image/png';
};

const getStylePrompt = (style: ArtStyle) => {
  if (!style || style === 'none') return '';
  return ` in ${style} style, high quality, highly detailed`;
};

const formatPrompt = (prompt: string, isRomanUrdu: boolean, style: ArtStyle) => {
  const basePrompt = isRomanUrdu 
    ? `The following prompt is in Roman Urdu. Please interpret its visual meaning accurately to generate a high-quality image: ${prompt}`
    : prompt;
  return `${basePrompt}${getStylePrompt(style)}`;
};

/**
 * Text to Image Generation
 */
export const generateTextToImage = async (
  prompt: string,
  aspectRatio: AspectRatio,
  style: ArtStyle,
  isRomanUrdu: boolean = false
): Promise<string> => {
  try {
    const fullPrompt = formatPrompt(prompt, isRomanUrdu, style);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        }
      }
    });

    let imageUrl = '';
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("No image generated.");
    }

    return imageUrl;
  } catch (error) {
    console.error("TextToImage Error:", error);
    throw error;
  }
};

/**
 * Image to Image Generation
 */
export const generateImageToImage = async (
  base64Image: string,
  prompt: string,
  style: ArtStyle,
  isRomanUrdu: boolean = false
): Promise<string> => {
  try {
    const fullPrompt = formatPrompt(prompt, isRomanUrdu, style);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: fullPrompt,
          },
          {
            inlineData: {
              mimeType: getMimeType(base64Image),
              data: cleanBase64(base64Image),
            },
          },
        ],
      },
    });

    let imageUrl = '';
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("No image generated.");
    }

    return imageUrl;
  } catch (error) {
    console.error("ImageToImage Error:", error);
    throw error;
  }
};

/**
 * Image Enhancement
 */
export const enhanceImage = async (base64Image: string): Promise<string> => {
  try {
    const prompt = "Enhance this image. Improve sharpness, reduce noise, correct colors, increase resolution, and make it look like a high-definition professional photo. Do not alter the core composition or subject matter significantly, just improve the quality.";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', 
      contents: {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: getMimeType(base64Image),
              data: cleanBase64(base64Image),
            },
          },
        ],
      },
    });

    let imageUrl = '';
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("Failed to enhance image.");
    }

    return imageUrl;
  } catch (error) {
    console.error("Enhance Error:", error);
    throw error;
  }
};