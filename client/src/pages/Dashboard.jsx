import Navbar from "../components/Navbar";
import UploadCard from "../components/UploadCard";
import ResumeList from "../components/ResumeList";
import "../styles/Dashboard.css";
import { useState } from "react";
import AnalysisCard from "../components/AnalysisCard";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [analysis, setAnalysis] = useState(null);

  return (
    <div className="dashboard">

      <Navbar />

      <div className="dashboard__container">

        <div className="dashboard__welcome">
          <h1>
            Welcome, {user?.name} 👋
          </h1>

          <p>
            Upload your resume and receive an AI-powered
            ATS score along with personalized feedback.
          </p>
        </div>

        <UploadCard setAnalysis={setAnalysis} />
        {analysis && (
          <AnalysisCard analysis={analysis} />
        )}
        <ResumeList />

      </div>

    </div>
  );
};

export default Dashboard; 