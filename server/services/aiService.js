import ai from "../lib/gemini.js";

export const analyzeResume = async (resumeText) => {
  const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the following resume and return ONLY valid JSON.

Return this exact format:

{
  "atsScore": number,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": []
}

Resume:
${resumeText}
`;

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });

  return response.text;
};