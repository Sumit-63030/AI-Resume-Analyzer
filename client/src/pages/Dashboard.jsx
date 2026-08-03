import { useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import UploadCard from "../components/UploadCard";
import AnalysisCard from "../components/AnalysisCard";
import ResumeList from "../components/ResumeList";

import "../styles/Dashboard.css";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [analysis, setAnalysis] = useState(null);

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

          <h1>
            Welcome back, <span>{user?.name}</span> 👋
          </h1>

          <p>
            Upload your resume to receive an AI-powered ATS
            analysis and review previous uploads anytime.
          </p>

        </section>

        <UploadCard setAnalysis={setAnalysis} />

        {analysis && (
          <AnalysisCard analysis={analysis} />
        )}

        <ResumeList onSelect={loadResume} />

      </main>

    </>
  );
};

export default Dashboard;