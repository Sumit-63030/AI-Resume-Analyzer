import "../styles/AnalysisCard.css";

const AnalysisCard = ({ analysis }) => {
  return (
    <section className="analysis">

      <div className="analysis__score">

        <span>ATS SCORE</span>

        <h1>{analysis.atsScore}%</h1>

        <p>
          {analysis.atsScore >= 85
            ? "Excellent Resume 🚀"
            : analysis.atsScore >= 70
            ? "Good Resume 👍"
            : "Needs Improvement 📄"}
        </p>

      </div>

      <div className="analysis__grid">

        <div className="analysis__card">

          <h2>🟢 Strengths</h2>

          <ul>
            {analysis.analysis.strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

        </div>

        <div className="analysis__card">

          <h2>🔴 Weaknesses</h2>

          <ul>
            {analysis.analysis.weaknesses.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

        </div>

        <div className="analysis__card">

          <h2>🟡 Missing Skills</h2>

          <ul>
            {analysis.analysis.missingSkills.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

        </div>

        <div className="analysis__card">

          <h2>🔵 Suggestions</h2>

          <ul>
            {analysis.analysis.suggestions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

        </div>

      </div>

    </section>
  );
};

export default AnalysisCard;