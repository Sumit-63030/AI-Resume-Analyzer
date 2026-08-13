import { useState, useRef } from "react";
import api from "../services/api";

import Navbar from "../components/NavBar";
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
  const [refreshResumes, setRefreshResumes] = useState(false);
  
  const analysisRef = useRef(null);

  const loadResume = async (id) => {
    try {
      const response = await api.get(`/resume/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAnalysis(response.data);
      
      // Scroll to analysis card after it renders
      setTimeout(() => {
        if (analysisRef.current) {
          analysisRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadSuccess = () => {
    setRefreshResumes(prev => !prev);
  };

  return (
    <>
      <Navbar />

      <main className="dashboard">
        <section className="dashboard__hero">
          <div className="dashboard__hero-content">
            <h1 className="dashboard__hero-title">
              Welcome back, <span className="dashboard__hero-name">{user?.name}</span>
            </h1>
            <p className="dashboard__hero-description">
              Upload your resume, receive an AI-powered ATS score,
              compare it against real job descriptions, and improve
              your chances of landing interviews.
            </p>
          </div>
          <div className="dashboard__hero-avatar">
            <span className="dashboard__hero-avatar-text">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        </section>

        <div className="dashboard__cards">
          <div className="dashboard__upload-card">
            <UploadCard
              setAnalysis={setAnalysis}
              onUploadSuccess={handleUploadSuccess}
            />
          </div>

          {analysis && (
            <div ref={analysisRef} className="dashboard__analysis-card">
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
            <ResumeList
              onSelect={loadResume}
              refresh={refreshResumes}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;