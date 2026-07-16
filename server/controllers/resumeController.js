import cloudinary from "../lib/cloudinary.js";
import streamifier from "streamifier";
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
    (error, result) => {
      if(error)
      {
        console.log(error);

        return res.status(500).json({
          message : "Failed to upload resume",
        })
      }

      return res.status(200).json({
        message : "Resume uploaded successfully",
        url : result.secure_url,
      });

    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

};