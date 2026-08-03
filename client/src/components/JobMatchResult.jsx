import "../styles/JobMatchResult.css";

const JobMatchResult = ({ jobMatch }) => {
  return (
    <section className="job-result">

      <div className="job-result__score">

        <span>JOB MATCH SCORE</span>

        <h1>{jobMatch.matchScore}%</h1>

        <p>
          {jobMatch.matchScore >= 85
            ? "Excellent Match 🚀"
            : jobMatch.matchScore >= 70
            ? "Good Match 👍"
            : "Needs Improvement 📄"}
        </p>

      </div>

      <div className="job-result__grid">

        <div className="job-result__card">

          <h2>✅ Matched Skills</h2>

          <ul>
            {jobMatch.matchedSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

        </div>

        <div className="job-result__card">

          <h2>❌ Missing Skills</h2>

          <ul>
            {jobMatch.missingSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

        </div>

        <div className="job-result__card job-result__summary">

          <h2>📄 Summary</h2>

          <p>{jobMatch.summary}</p>

        </div>

        <div className="job-result__card">

          <h2>💡 Recommendations</h2>

          <ul>
            {jobMatch.recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

        </div>

      </div>

    </section>
  );
};

export default JobMatchResult;