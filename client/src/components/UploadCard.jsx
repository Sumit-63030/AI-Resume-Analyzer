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
    <section className="upload-card">

      <div className="upload-card__icon-wrapper">
        <UploadCloud
          className="upload-card__icon"
          size={40}
        />
      </div>

      <h2 className="upload-card__title">
        Upload Resume
      </h2>

      <p className="upload-card__description">
        Upload your latest resume in PDF format to receive
        an AI-powered ATS analysis.
      </p>

      <div className="upload-card__input-wrapper">
        <input
          type="file"
          accept=".pdf"
          id="file-upload"
          className="upload-card__input"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <label
          htmlFor="file-upload"
          className="upload-card__input-label"
        >
          Select Resume (.pdf)
        </label>
      </div>

      {file && (
        <span className="upload-card__filename">
          {file.name}
        </span>
      )}

      <p className="upload-card__helper">
        Supported format: PDF • Max size: 5 MB
      </p>

      <button
        onClick={handleUpload}
        disabled={loading}
        className="upload-card__button"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

    </section>
  );
};

export default UploadCard;