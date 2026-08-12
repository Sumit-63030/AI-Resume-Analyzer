import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import '../styles/JobMatchCard.css';

const JobMatchCard = ({ setJobMatch }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please paste a job description.");
      return;
    }

    if (jobDescription.trim().length < 50) {
      toast.error("Job description seems too short. Please paste a complete description.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/job-match",
        {
          jobDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setJobMatch(response.data);
      toast.success("Job match completed!");
      setJobDescription("");
      setCharCount(0);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Analysis failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setJobDescription(text);
    setCharCount(text.length);
  };

  return (
    <div className="job-match">
      <div className="job-match__header">
        <div className="job-match__title-wrapper">
          <span className="job-match__icon">🎯</span>
          <h2 className="job-match__title">Job Match</h2>
        </div>
        <span className="job-match__badge">AI Powered</span>
      </div>

      <p className="job-match__description">
        Paste a job description to compare it with your latest uploaded resume.
      </p>

      <div className="job-match__textarea-wrapper">
        <textarea
          rows="8"
          value={jobDescription}
          onChange={handleTextChange}
          placeholder="Paste job description here..."
          className="job-match__textarea"
          disabled={loading}
        />
        <div className="job-match__char-count">
          {charCount > 0 ? `${charCount} characters` : 'Ready to paste'}
          {charCount > 0 && charCount < 50 && (
            <span className="job-match__char-warning">⚠️ Too short</span>
          )}
        </div>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading || !jobDescription.trim()}
        className="job-match__button"
      >
        {loading ? (
          <>
            <span className="job-match__spinner"></span>
            Analyzing...
          </>
        ) : (
          'Analyze Match'
        )}
      </button>

      {loading && (
        <div className="job-match__loading-hint">
          <span>⏳</span>
          <span>This may take a few seconds...</span>
        </div>
      )}
    </div>
  );
};

export default JobMatchCard;