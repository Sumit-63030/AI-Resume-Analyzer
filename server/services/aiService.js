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
- Return ONLY valid JSON.
`;

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });

  return response.text;
};