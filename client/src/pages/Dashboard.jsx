import { useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import UploadCard from "../components/UploadCard";
import AnalysisCard from "../components/AnalysisCard";
import ResumeList from "../components/ResumeList";
import "../styles/Dashboard.css";
import JobMatchCard from "../components/JobMatchCard";
import JobMatchResult from "../components/JobMatchResult";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [analysis, setAnalysis] = useState(null);
  const [jobMatch, setJobMatch] = useState(null);

  const loadResume = async (id) => {
    try {
      const response = await api.get(`/resume/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAnalysis(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <main className="dashboard">
        <section className="dashboard__hero">
          <h1 className="dashboard__hero-title">
            Welcome back, <span className="dashboard__hero-name">{user?.name}</span> 👋
          </h1>
          <p className="dashboard__hero-description">
            Upload your resume, receive an AI-powered ATS score,
            compare it against real job descriptions, and improve
            your chances of landing interviews.
          </p>
        </section>  

        <div className="dashboard__upload-card">
          <UploadCard setAnalysis={setAnalysis} />
        </div>

        {analysis && (
          <div className="dashboard__analysis-card">
            <AnalysisCard analysis={analysis} />
          </div>
        )}

        <div className="dashboard__job-match-card">
          <JobMatchCard setJobMatch={setJobMatch} />
        </div>

        {jobMatch && (
          <div className="dashboard__job-match-result">
            <JobMatchResult jobMatch={jobMatch} />
          </div>
        )}

        <div className="dashboard__resume-list">
          <ResumeList onSelect={loadResume} />
        </div>
      </main>
    </>
  );
};

export default Dashboard;