import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const UploadCard = ({ setAnalysis }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const response = await api.post(
        "/resume/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setAnalysis(response.data.resume);

      toast.success(response.data.message);

      setFile(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-card">
      <h2>Upload Resume</h2>

      <p>
        Upload your resume and receive an AI-powered ATS score
        with personalized suggestions.
      </p>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
    </div>
  );
};

export default UploadCard;