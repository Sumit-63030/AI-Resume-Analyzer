import cloudinary from "../lib/cloudinary.js";
import streamifier from "streamifier";
import prisma from '../lib/prisma.js';
import { extractTextFromPDF } from "../utils/pdfParser.js";
import { analyzeResume } from "../services/aiService.js";

export const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Please upload a PDF",
    })
  }

  const uploadStream = cloudinary.uploader.upload_stream(
    {
      resource_type: "raw",
      folder: "resume-analyzer",
    },
    async (error, result) => {

      if (error) {
        return res.status(500).json({
          message: "Failed to upload resume",
        });
      }

      const extractedText = await extractTextFromPDF(req.file.buffer);

      let analysis;

      try {
        const aiResponse = await analyzeResume(extractedText);

        const cleanedResponse = aiResponse
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        analysis = JSON.parse(cleanedResponse);
      } catch (error) {
        console.error("Gemini Error:", error);

        if (error.status === 429) {
          return res.status(429).json({
            message:
              "AI quota exceeded. Please wait a minute and try again.",
          });
        }

        if (error.status === 503) {
          return res.status(503).json({
            message:
              "AI service is temporarily busy. Please try again in a few moments.",
          });
        }

        return res.status(500).json({
          message: "Failed to analyze resume.",
        });
      }
      console.log(analysis);

      const resume = await prisma.resume.create({
        data: {
          fileName: req.file.originalname,
          fileUrl: result.secure_url,
          extractedText,
          atsScore: analysis.atsScore,
          analysis,
          userId: req.user.id,
        },
      });

      return res.status(200).json({
        message: "Resume uploaded successfully",
        resume,
      });

    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

};

export const getUserResumes = async (req, res) => {
  try {
    const resumes = await prisma.resume.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        fileName: true,
        fileUrl: true,
        atsScore: true,
        createdAt: true,
      },
    });

    return res.status(200).json(resumes);
  } catch (error) {
    console.error("GET USER RESUMES ERROR:", error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    return res.status(200).json(resume);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    await prisma.resume.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Resume deleted successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};