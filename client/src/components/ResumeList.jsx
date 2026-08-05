import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import "../styles/ResumeList.css";

const ResumeList = ({ onSelect }) => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
  const fetchResumes = async () => {
    try {
      const response = await api.get("/resume", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setResumes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchResumes();
}, []);

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

      setResumes((prev) => prev.filter((resume) => resume.id !== id));

      toast.success("Resume deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete resume");
    }
  };

  return (
    <section className="resume-list">

      <h2>Previous Analyses</h2>

      {resumes.length === 0 ? (
        <p className="resume-list__empty">
          No previous analyses found.
        </p>
      ) : (
        <div className="resume-list__grid">

          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="resume-list__card"
            >

              <div className="resume-list__header">

                <div
                  className="resume-list__content"
                  onClick={() => onSelect(resume.id)}
                >
                  <h3>Resume Analysis</h3>
                  <p>{resume.atsScore}%</p>
                </div>

                <button
                  className="resume-list__delete"
                  onClick={() => handleDelete(resume.id)}
                >
                  🗑
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </section>
  );
};

export default ResumeList;