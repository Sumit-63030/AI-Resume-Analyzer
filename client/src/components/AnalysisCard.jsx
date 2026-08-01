const AnalysisCard = ({ analysis }) => {
  return (
    <div className="analysis-card">

      <h2>ATS Score</h2>

      <div className="analysis-card__score">
        {analysis.atsScore}%
      </div>

      <h3>Strengths</h3>

      <ul>
        {analysis.analysis.strengths.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Weaknesses</h3>

      <ul>
        {analysis.analysis.weaknesses.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Missing Skills</h3>

      <ul>
        {analysis.analysis.missingSkills.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Suggestions</h3>

      <ul>
        {analysis.analysis.suggestions.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

    </div>
  );
};

export default AnalysisCard;