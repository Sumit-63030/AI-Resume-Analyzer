import cloudinary from "../lib/cloudinary.js";
import streamifier from "streamifier";
import prisma from '../lib/prisma.js';
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

      const resume = await prisma.resume.create({
        data: {
          fileUrl: result.secure_url,
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