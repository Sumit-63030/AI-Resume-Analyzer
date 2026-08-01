import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/ResumeList.css";

const ResumeList = ({ onSelect }) => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetchResumes();
  }, []);

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

  return (
    <section className="resume-list">

      <h2>Previous Analyses</h2>

      {resumes.length === 0 ? (
        <p>No resumes uploaded yet.</p>
      ) : (
        resumes.map((resume) => (
          <div
            key={resume.id}
            className="resume-item"
            onClick={() => onSelect(resume.id)}
          >
            <h3>Resume Analysis</h3>

            <span>{resume.atsScore}%</span>
          </div>
        ))
      )}

    </section>
  );
};

export default ResumeList;