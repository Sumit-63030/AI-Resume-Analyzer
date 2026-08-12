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

  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);

    if (error.status === 429) {
      throw new Error(
        "AI rate limit exceeded. Please wait 30 seconds and try again."
      );
    }

    if (error.status === 503) {
      throw new Error(
        "AI service is temporarily busy. Please try again in a minute."
      );
    }

    throw new Error("Failed to analyze resume.");
  }
};

export const analyzeJobMatch = async (resumeText, jobDescription) => {
  const prompt = `
You are an expert ATS and technical recruiter.

Compare the following resume against the job description.

Return ONLY valid JSON.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return this exact JSON format:

{
  "matchScore": 0,
  "matchedSkills": [],
  "missingSkills": [],
  "summary": "",
  "recommendations": []
}

Rules:
- matchScore must be an integer between 0 and 100.
- matchedSkills should contain only the skills present in both the resume and job description.
- missingSkills should contain important skills mentioned in the job description but missing from the resume.
- summary should be 2-3 concise sentences.
- recommendations should contain 4-6 actionable improvements.

Return ONLY valid JSON.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);

    if (error.status === 429) {
      throw new Error(
        "AI rate limit exceeded. Please wait 30 seconds and try again."
      );
    }

    if (error.status === 503) {
      throw new Error(
        "AI service is temporarily busy. Please try again in a minute."
      );
    }

    throw new Error("Failed to analyze job match.");
  }
};