import prisma from "../lib/prisma.js";
import { analyzeJobMatch } from "../services/aiService.js";

export const matchJob = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({
        message: "Job description is required",
      });
    }

    const latestResume = await prisma.resume.findFirst({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!latestResume) {
      return res.status(404).json({
        message: "Please upload a resume first",
      });
    }

    const result = await analyzeJobMatch(
      latestResume.extractedText,
      jobDescription
    );

    return res.status(200).json(JSON.parse(result));

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};