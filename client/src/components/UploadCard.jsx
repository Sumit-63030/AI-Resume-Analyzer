import { useState } from "react";
import { UploadCloud } from "lucide-react";
import api from "../services/api";
import toast from "react-hot-toast";

import "../styles/UploadCard.css";

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
    <section className="upload">

      <div className="upload__icon">
        <UploadCloud size={34} />
      </div>

      <h2>Upload Resume</h2>

      <p>
        Upload your latest resume in PDF format to receive
        an AI-powered ATS analysis.
      </p>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file && (
        <span className="upload__filename">
          {file.name}
        </span>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

    </section>
  );
};

export default UploadCard;