import "../styles/JobMatchResult.css";

const JobMatchResult = ({ jobMatch }) => {
  const getScoreColor = (score) => {
    if (score >= 85) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 50) return 'fair';
    return 'poor';
  };

  const getScoreLabel = (score) => {
    if (score >= 85) return { emoji: '🚀', label: 'Excellent Match' };
    if (score >= 70) return { emoji: '👍', label: 'Good Match' };
    if (score >= 50) return { emoji: '📈', label: 'Fair Match' };
    return { emoji: '📄', label: 'Needs Improvement' };
  };

  const scoreInfo = getScoreLabel(jobMatch.matchScore);
  const scoreColor = getScoreColor(jobMatch.matchScore);

  return (
    <section className="job-result">
      <div className={`job-result__score score-${scoreColor}`}>
        <div className="job-result__score-content">
          <span className="job-result__score-label">Job Match Score</span>
          <div className="job-result__score-circle">
            <span className="job-result__score-value">{jobMatch.matchScore}%</span>
          </div>
          <h2 className="job-result__score-status">
            {scoreInfo.emoji} {scoreInfo.label}
          </h2>
          <div className="job-result__score-bar">
            <div 
              className={`job-result__score-bar-fill bar-${scoreColor}`}
              style={{ width: `${jobMatch.matchScore}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="job-result__grid">
        <div className="job-result__card job-result__card-matched">
          <div className="job-result__card-header">
            <span className="job-result__card-icon">✅</span>
            <h3 className="job-result__card-title">Matched Skills</h3>
            <span className="job-result__card-count">{jobMatch.matchedSkills.length}</span>
          </div>
          <ul className="job-result__card-list">
            {jobMatch.matchedSkills.map((skill, index) => (
              <li key={index} className="job-result__card-item">
                <span className="job-result__item-bullet bullet-matched"></span>
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="job-result__card job-result__card-missing">
          <div className="job-result__card-header">
            <span className="job-result__card-icon">❌</span>
            <h3 className="job-result__card-title">Missing Skills</h3>
            <span className="job-result__card-count">{jobMatch.missingSkills.length}</span>
          </div>
          <ul className="job-result__card-list">
            {jobMatch.missingSkills.map((skill, index) => (
              <li key={index} className="job-result__card-item">
                <span className="job-result__item-bullet bullet-missing"></span>
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="job-result__card job-result__card-summary">
          <div className="job-result__card-header">
            <span className="job-result__card-icon">📄</span>
            <h3 className="job-result__card-title">Summary</h3>
          </div>
          <p className="job-result__card-text">{jobMatch.summary}</p>
        </div>

        <div className="job-result__card job-result__card-recommendations">
          <div className="job-result__card-header">
            <span className="job-result__card-icon">💡</span>
            <h3 className="job-result__card-title">Recommendations</h3>
            <span className="job-result__card-count">{jobMatch.recommendations.length}</span>
          </div>
          <ul className="job-result__card-list">
            {jobMatch.recommendations.map((item, index) => (
              <li key={index} className="job-result__card-item">
                <span className="job-result__item-bullet bullet-recommendation"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default JobMatchResult;