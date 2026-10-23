import ai from "../lib/gemini.js";

const generateAIResponse = async (prompt) => {
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: prompt,
      });

      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", {
        attempt,
        status: error.status,
        message: error.message,
        name: error.name,
      });

      // Rate limit
      if (error.status === 429) {
        if (attempt < maxRetries) {
          console.log(`Gemini rate limited. Retrying... (${attempt}/${maxRetries})`);

          await new Promise((resolve) =>
            setTimeout(resolve, 3000 * attempt)
          );

          continue;
        }

        const err = new Error(
          "AI rate limit exceeded. Please wait a moment and try again."
        );

        err.status = 429;
        throw err;
      }

      // Gemini temporarily unavailable
      if (error.status === 503) {
        if (attempt < maxRetries) {
          console.log(
            `Gemini service temporarily busy. Retrying... (${attempt}/${maxRetries})`
          );

          await new Promise((resolve) =>
            setTimeout(resolve, 3000 * attempt)
          );

          continue;
        }

        const err = new Error(
          "AI service is temporarily busy. Please try again in a moment."
        );

        err.status = 503;
        throw err;
      }

      // Any other Gemini error
      const err = new Error("Failed to communicate with the AI service.");

      err.status = error.status || 500;

      throw err;
    }
  }
};

export const analyzeResume = async (resumeText) => {
  const currentDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());
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

Rules:
- atsScore must be an integer between 0 and 100.
- strengths should contain specific strengths found in the resume.
- weaknesses should contain specific weaknesses found in the resume.
- missingSkills should contain relevant skills that appear to be missing.
- suggestions should contain actionable improvements.
- Return ONLY valid JSON without markdown or code fences.
DATE VALIDATION:
- The authoritative current date is ${currentDate}.
- Interpret every resume date relative to this date.
- Never label a past date as a future date.
- For dates containing only a month and year, compare the month and year with the current month and year.
- A month/year date in the current month is not automatically a future date.
- A date range ending in "Present" or "Current" means the activity is ongoing.
- Do not flag a project, education, or employment date as incorrect merely because it is recent.
- Only report a future-date issue when the resume provides sufficient evidence that the date is genuinely in the future.
- If a date is ambiguous, do not make a future-date claim.
- Never invent dates or inconsistencies.


Resume:
${resumeText}
`;

  return await generateAIResponse(prompt);
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
- matchedSkills should contain only skills present in both the resume and job description.
- missingSkills should contain important skills mentioned in the job description but missing from the resume.
- summary should be 2-3 concise sentences.
- recommendations should contain 4-6 actionable improvements.
- Return ONLY valid JSON.
- Do not use markdown.
- Do not wrap the JSON in code fences.
`;

  return await generateAIResponse(prompt);
};