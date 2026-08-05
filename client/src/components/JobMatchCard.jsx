import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import '../styles/JobMatchCard.css';

const JobMatchCard = ({ setJobMatch }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please paste a job description.");
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
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Analysis failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-match">

      <h2>🎯 Job Match</h2>

      <p>
        Paste a job description to compare it with your latest uploaded resume.
      </p>

      <textarea
        rows="10"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste job description here..."
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Match"}
      </button>

    </div>
  );
};

export default JobMatchCard;