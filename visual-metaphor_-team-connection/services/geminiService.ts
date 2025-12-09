import { GoogleGenAI } from "@google/genai";
import { SelectionState } from "../types";
import { PROMPTS } from "../constants";

export const generateInsight = async (selections: SelectionState): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please provide a valid Gemini API Key.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-2.5-flash";

  const card1 = selections[0]?.label || "미선택";
  const card2 = selections[1]?.label || "미선택";
  const card3 = selections[2]?.label || "미선택";

  const prompt = `
    당신은 친절하고 통찰력 있는 워크숍 진행자(퍼실리테이터)입니다.
    참가자가 '만남의 시간' 프로그램에서 다음과 같은 3가지 이미지 카드를 선택했습니다.

    1. 나를 나타내는 이미지: "${card1}"
    2. 내 삶의 낙(기쁨): "${card2}"
    3. 요즘 나의 고민: "${card3}"

    이 선택들을 바탕으로 참가자에게 건넬 수 있는 따뜻한 코멘트와, 
    다른 참가자들과 이야기를 더 깊게 나눌 수 있도록 돕는 '생각해볼 질문' 3가지를 제안해주세요.
    
    어조는 부드럽고 격려하는 말투(해요체)를 사용해주세요. 
    응답은 마크다운 형식으로 깔끔하게 정리해주세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Flash model for speed
      }
    });

    return response.text || "죄송합니다. 통찰을 생성하는 데 문제가 발생했습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("AI 분석 중 오류가 발생했습니다.");
  }
};