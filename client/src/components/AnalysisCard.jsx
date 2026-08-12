import "../styles/AnalysisCard.css";

const AnalysisCard = ({ analysis }) => {
  // Helper to get score color
  const getScoreColor = (score) => {
    if (score >= 85) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 50) return 'fair';
    return 'poor';
  };

  // Helper to get score emoji and label
  const getScoreLabel = (score) => {
    if (score >= 85) return { emoji: '🚀', label: 'Excellent' };
    if (score >= 70) return { emoji: '👍', label: 'Good' };
    if (score >= 50) return { emoji: '📈', label: 'Fair' };
    return { emoji: '📄', label: 'Needs Improvement' };
  };

  const scoreInfo = getScoreLabel(analysis.atsScore);
  const scoreColor = getScoreColor(analysis.atsScore);

  return (
    <section className="analysis-card">
      <div className="analysis-card__score-section">
        <div className="analysis-card__score-wrapper">
          <div className={`analysis-card__score-circle score-${scoreColor}`}>
            <span className="analysis-card__score-value">{analysis.atsScore}%</span>
          </div>
          <div className="analysis-card__score-info">
            <span className="analysis-card__score-label">ATS Score</span>
            <h2 className="analysis-card__score-status">
              {scoreInfo.emoji} {scoreInfo.label}
            </h2>
            <div className="analysis-card__score-bar">
              <div 
                className={`analysis-card__score-bar-fill bar-${scoreColor}`}
                style={{ width: `${analysis.atsScore}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="analysis-card__grid">
        {/* Strengths */}
        <div className="analysis-card__card analysis-card__card-strength">
          <div className="analysis-card__card-header">
            <span className="analysis-card__card-icon">✅</span>
            <h3 className="analysis-card__card-title">Strengths</h3>
            <span className="analysis-card__card-count">{analysis.analysis.strengths.length}</span>
          </div>
          <ul className="analysis-card__card-list">
            {analysis.analysis.strengths.map((item, index) => (
              <li key={index} className="analysis-card__card-item">
                <span className="analysis-card__item-bullet bullet-strength"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="analysis-card__card analysis-card__card-weakness">
          <div className="analysis-card__card-header">
            <span className="analysis-card__card-icon">⚠️</span>
            <h3 className="analysis-card__card-title">Weaknesses</h3>
            <span className="analysis-card__card-count">{analysis.analysis.weaknesses.length}</span>
          </div>
          <ul className="analysis-card__card-list">
            {analysis.analysis.weaknesses.map((item, index) => (
              <li key={index} className="analysis-card__card-item">
                <span className="analysis-card__item-bullet bullet-weakness"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="analysis-card__card analysis-card__card-missing">
          <div className="analysis-card__card-header">
            <span className="analysis-card__card-icon">🎯</span>
            <h3 className="analysis-card__card-title">Missing Skills</h3>
            <span className="analysis-card__card-count">{analysis.analysis.missingSkills.length}</span>
          </div>
          <ul className="analysis-card__card-list">
            {analysis.analysis.missingSkills.map((item, index) => (
              <li key={index} className="analysis-card__card-item">
                <span className="analysis-card__item-bullet bullet-missing"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Suggestions */}
        <div className="analysis-card__card analysis-card__card-suggestion">
          <div className="analysis-card__card-header">
            <span className="analysis-card__card-icon">💡</span>
            <h3 className="analysis-card__card-title">Suggestions</h3>
            <span className="analysis-card__card-count">{analysis.analysis.suggestions.length}</span>
          </div>
          <ul className="analysis-card__card-list">
            {analysis.analysis.suggestions.map((item, index) => (
              <li key={index} className="analysis-card__card-item">
                <span className="analysis-card__item-bullet bullet-suggestion"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AnalysisCard;