import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import "../styles/ResumeList.css";
import { Trash2, FileText, Calendar, TrendingUp, Eye } from "lucide-react";

const ResumeList = ({ onSelect, refresh }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        setLoading(true);

        const response = await api.get("/resume", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setResumes(response.data);
      } catch{
        toast.error("Failed to load resumes");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [refresh]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this analysis?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/resume/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setResumes((prev) =>
        prev.filter((resume) => resume.id !== id)
      );

      toast.success("Resume deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete resume");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "high";
    if (score >= 60) return "medium";
    return "low";
  };

  const handleViewAnalysis = (id) => {
    onSelect(id);
  };

  if (loading) {
    return (
      <section className="resume-list">
        <div className="resume-list__loading">
          <div className="resume-list__loading-spinner"></div>
          <p>Loading your analyses...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="resume-list">
      <div className="resume-list__header">
        <h2 className="resume-list__title">Previous Analyses</h2>
        <span className="resume-list__count">
          {resumes.length} saved
        </span>
      </div>

      {resumes.length === 0 ? (
        <div className="resume-list__empty">
          <FileText className="resume-list__empty-icon" size={48} />
          <h3>No analyses yet</h3>
          <p>Upload your first resume to get started</p>
        </div>
      ) : (
        <div className="resume-list__grid">
          {resumes.map((resume) => {
            const fileName =
              resume.fileName || "Untitled Resume";

            return (
              <div
                key={resume.id}
                className="resume-list__card"
              >
                <div className="resume-list__card-info">
                  <div className="resume-list__card-left">
                    <div className="resume-list__card-icon">
                      <FileText size={20} />
                    </div>

                    <div className="resume-list__card-details">
                      <h3
                        className="resume-list__card-title"
                        title={fileName}
                      >
                        {fileName.length > 25
                          ? fileName.substring(0, 25) + "..."
                          : fileName}
                      </h3>

                      <div className="resume-list__card-meta">
                        <Calendar size={14} />
                        <span>
                          {formatDate(resume.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="resume-list__card-right">
                    <div
                      className={`resume-list__card-score score-${getScoreColor(
                        resume.atsScore
                      )}`}
                    >
                      <TrendingUp size={14} />
                      <span>{resume.atsScore}%</span>
                    </div>
                  </div>
                </div>

                <div className="resume-list__card-actions">
                  <button
                    className="resume-list__view"
                    onClick={() => handleViewAnalysis(resume.id)}
                    title="View analysis"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <button
                    className="resume-list__delete"
                    onClick={() => handleDelete(resume.id)}
                    title="Delete analysis"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ResumeList;